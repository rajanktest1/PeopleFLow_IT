import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function TalentManagement() {
  const { authFetch } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: '', department_id: '', description: '', location: 'Remote',
    salary_range_min: '', salary_range_max: ''
  });
  const [message, setMessage] = useState('');

  const fetchJobs = () => {
    authFetch('/api/jobs')
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        const depts = [...new Map(data.map((j) => [j.department_id, { id: j.department_id, name: j.department_name }])).values()];
        setDepartments(depts);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchJobs(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await authFetch('/api/jobs', {
        method: 'POST',
        body: JSON.stringify({
          ...form,
          department_id: parseInt(form.department_id),
          salary_range_min: form.salary_range_min ? parseFloat(form.salary_range_min) : null,
          salary_range_max: form.salary_range_max ? parseFloat(form.salary_range_max) : null,
        }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) throw new Error('Failed to create job posting');
      setForm({ title: '', department_id: '', description: '', location: 'Remote', salary_range_min: '', salary_range_max: '' });
      setShowForm(false);
      setMessage('Job posting created successfully!');
      fetchJobs();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Failed to create job posting.');
    }
  };

  if (loading) return <div className="loading">Loading job postings...</div>;

  return (
    <div className="page">
      <h1>Talent Management</h1>
      <div className="toolbar">
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Add New Job Posting'}
        </button>
        <span className="badge">{jobs.filter((j) => j.status === 'open').length} open positions</span>
        {message && <span className="toast-msg">{message}</span>}
      </div>

      {showForm && (
        <div className="card form-card">
          <h3>New Job Posting</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Job Title *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                  placeholder="e.g. Senior React Developer"
                />
              </div>
              <div className="form-group">
                <label>Department *</label>
                <select
                  value={form.department_id}
                  onChange={(e) => setForm({ ...form, department_id: e.target.value })}
                  required
                >
                  <option value="">Select department</option>
                  {departments.map((d) => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={3}
                placeholder="Job description..."
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Salary Min</label>
                <input
                  type="number"
                  value={form.salary_range_min}
                  onChange={(e) => setForm({ ...form, salary_range_min: e.target.value })}
                  placeholder="e.g. 80000"
                />
              </div>
              <div className="form-group">
                <label>Salary Max</label>
                <input
                  type="number"
                  value={form.salary_range_max}
                  onChange={(e) => setForm({ ...form, salary_range_max: e.target.value })}
                  placeholder="e.g. 120000"
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary">Create Job Posting</button>
          </form>
        </div>
      )}

      <div className="job-grid">
        {jobs.map((job) => (
          <div key={job.id} className="job-card">
            <div className="job-card-header">
              <h3>{job.title}</h3>
              <span className={`status-badge status-${job.status}`}>{job.status}</span>
            </div>
            <p className="text-muted">{job.department_name} &bull; {job.location}</p>
            {job.description && <p className="job-desc">{job.description}</p>}
            <div className="job-card-footer">
              {job.salary_range_min && job.salary_range_max && (
                <span className="salary-range">
                  ${parseFloat(job.salary_range_min).toLocaleString()} - ${parseFloat(job.salary_range_max).toLocaleString()}
                </span>
              )}
              <span className="applicant-count">👤 {job.applicant_count} applicants</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
