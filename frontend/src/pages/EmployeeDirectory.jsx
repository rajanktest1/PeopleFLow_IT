import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function EmployeeDirectory() {
  const { authFetch } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    authFetch('/api/employees')
      .then((res) => res.json())
      .then(setEmployees)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = employees.filter(
    (e) =>
      `${e.first_name} ${e.last_name}`.toLowerCase().includes(search.toLowerCase()) ||
      e.job_title.toLowerCase().includes(search.toLowerCase()) ||
      e.department_name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="loading">Loading employee directory...</div>;

  return (
    <div className="page">
      <h1>Employee Directory</h1>
      <div className="toolbar">
        <input
          type="text"
          placeholder="Search by name, role, or department..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <span className="badge">{filtered.length} employees</span>
      </div>

      <div className="employee-grid">
        {filtered.map((emp) => (
          <div key={emp.id} className="employee-card">
            <div className="employee-card-header">
              <span className="avatar">{emp.emoji_avatar}</span>
              <div>
                <h3>{emp.first_name} {emp.last_name}</h3>
                <p className="text-muted">{emp.job_title}</p>
              </div>
            </div>
            <div className="employee-card-body">
              <p><strong>Department:</strong> {emp.department_name}</p>
              <p><strong>Status:</strong> <span className={`status-badge status-${emp.status}`}>{emp.status}</span></p>
            </div>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setSelectedId(selectedId === emp.id ? null : emp.id)}
            >
              {selectedId === emp.id ? 'Hide Details' : 'View Details'}
            </button>
            {selectedId === emp.id && (
              <div className="employee-details">
                <p><strong>Email:</strong> {emp.email}</p>
                <p><strong>Phone:</strong> {emp.phone}</p>
                <p><strong>Hire Date:</strong> {new Date(emp.hire_date).toLocaleDateString()}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
