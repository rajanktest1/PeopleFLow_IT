import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import PayrollHistoryModal from '../components/PayrollHistoryModal';

export default function Payroll() {
  const { authFetch } = useAuth();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({});
  const [historyEmployeeId, setHistoryEmployeeId] = useState(null);
  const [runningPayroll, setRunningPayroll] = useState(false);
  const [message, setMessage] = useState('');

  const fetchPayroll = () => {
    authFetch('/api/payroll')
      .then((res) => res.json())
      .then(setRecords)
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchPayroll(); }, []);

  const handleEdit = (record) => {
    setEditingId(record.id);
    setEditValues({
      base_salary: record.base_salary,
      tax_rate: record.tax_rate,
      other_deductions: record.other_deductions,
    });
  };

  const handleSave = async (id) => {
    try {
      await authFetch(`/api/payroll/${id}`, {
        method: 'PUT',
        body: JSON.stringify(editValues),
        headers: { 'Content-Type': 'application/json' },
      });
      setEditingId(null);
      setMessage('Salary updated successfully.');
      fetchPayroll();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Failed to update salary.');
    }
  };

  const handleRunPayroll = async () => {
    if (!window.confirm('Process all pending payroll records?')) return;
    setRunningPayroll(true);
    try {
      const res = await authFetch('/api/payroll/run', { method: 'POST' });
      const data = await res.json();
      setMessage(data.message);
      fetchPayroll();
      setTimeout(() => setMessage(''), 4000);
    } catch (err) {
      setMessage('Failed to run payroll.');
    } finally {
      setRunningPayroll(false);
    }
  };

  if (loading) return <div className="loading">Loading payroll data...</div>;

  const pendingCount = records.filter((r) => r.status === 'pending').length;

  return (
    <div className="page">
      <h1>Payroll Management</h1>
      <div className="toolbar">
        <button
          className="btn btn-primary"
          onClick={handleRunPayroll}
          disabled={runningPayroll || pendingCount === 0}
        >
          {runningPayroll ? 'Processing...' : `Run Payroll (${pendingCount} pending)`}
        </button>
        {message && <span className="toast-msg">{message}</span>}
      </div>

      <div className="table-container">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Department</th>
              <th>Base Salary</th>
              <th>Tax Rate</th>
              <th>Tax Deduction</th>
              <th>Other Deductions</th>
              <th>Net Pay</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r) => (
              <tr key={r.id}>
                <td>
                  <span className="avatar-sm">{r.emoji_avatar}</span>
                  {r.first_name} {r.last_name}
                </td>
                <td>{r.department_name}</td>
                <td>
                  {editingId === r.id ? (
                    <input
                      type="number"
                      value={editValues.base_salary}
                      onChange={(e) => setEditValues({ ...editValues, base_salary: parseFloat(e.target.value) })}
                      className="inline-edit"
                    />
                  ) : (
                    `$${parseFloat(r.base_salary).toLocaleString()}`
                  )}
                </td>
                <td>
                  {editingId === r.id ? (
                    <input
                      type="number"
                      value={editValues.tax_rate}
                      onChange={(e) => setEditValues({ ...editValues, tax_rate: parseFloat(e.target.value) })}
                      className="inline-edit"
                      style={{ width: '70px' }}
                    />
                  ) : (
                    `${r.tax_rate}%`
                  )}
                </td>
                <td>${parseFloat(r.tax_deduction).toLocaleString()}</td>
                <td>
                  {editingId === r.id ? (
                    <input
                      type="number"
                      value={editValues.other_deductions}
                      onChange={(e) => setEditValues({ ...editValues, other_deductions: parseFloat(e.target.value) })}
                      className="inline-edit"
                      style={{ width: '90px' }}
                    />
                  ) : (
                    `$${parseFloat(r.other_deductions).toLocaleString()}`
                  )}
                </td>
                <td className="net-pay">${parseFloat(r.net_pay).toLocaleString()}</td>
                <td>
                  <span className={`status-badge status-${r.status}`}>{r.status}</span>
                </td>
                <td className="actions">
                  {editingId === r.id ? (
                    <>
                      <button className="btn btn-sm btn-primary" onClick={() => handleSave(r.id)}>Save</button>
                      <button className="btn btn-sm btn-secondary" onClick={() => setEditingId(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button className="btn btn-sm btn-secondary" onClick={() => handleEdit(r)}>Update Salary</button>
                      <button className="btn btn-sm btn-outline" onClick={() => setHistoryEmployeeId(r.employee_id)}>History</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {historyEmployeeId && (
        <PayrollHistoryModal
          employeeId={historyEmployeeId}
          onClose={() => setHistoryEmployeeId(null)}
        />
      )}
    </div>
  );
}
