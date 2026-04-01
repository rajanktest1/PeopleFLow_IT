import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import SummaryCard from '../components/SummaryCard';

export default function Dashboard() {
  const { authFetch } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authFetch('/api/dashboard')
      .then((res) => res.json())
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading">Loading dashboard...</div>;
  if (!data) return <div className="error-msg">Failed to load dashboard.</div>;

  return (
    <div className="page">
      <h1>Admin Dashboard</h1>
      <div className="summary-cards">
        <SummaryCard icon="👥" label="Total Headcount" value={data.totalEmployees} color="#4f46e5" />
        <SummaryCard icon="💰" label="Monthly Payroll" value={`$${data.monthlyPayroll.toLocaleString()}`} color="#059669" />
        <SummaryCard icon="📋" label="Open Roles" value={data.openRoles} color="#d97706" />
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <h3>Department Breakdown</h3>
          <table className="table">
            <thead>
              <tr><th>Department</th><th>Employees</th></tr>
            </thead>
            <tbody>
              {data.departmentBreakdown.map((d) => (
                <tr key={d.department}>
                  <td>{d.department}</td>
                  <td><span className="badge">{d.count}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card">
          <h3>Recent Payroll Runs</h3>
          {data.recentPayrollRuns.length === 0 ? (
            <p className="text-muted">No payroll runs yet.</p>
          ) : (
            <table className="table">
              <thead>
                <tr><th>Employee</th><th>Net Pay</th><th>Date</th></tr>
              </thead>
              <tbody>
                {data.recentPayrollRuns.map((r) => (
                  <tr key={r.id}>
                    <td>{r.first_name} {r.last_name}</td>
                    <td>${parseFloat(r.net_pay).toLocaleString()}</td>
                    <td>{new Date(r.processed_date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
