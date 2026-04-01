import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function PayrollHistoryModal({ employeeId, onClose }) {
  const { authFetch } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authFetch(`/api/payroll/history/${employeeId}`)
      .then((res) => res.json())
      .then(setHistory)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [employeeId]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Payroll History</h3>
          <button className="btn-close" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          {loading ? (
            <p>Loading history...</p>
          ) : history.length === 0 ? (
            <p className="text-muted">No payroll history found for this employee.</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Period</th>
                  <th>Base Salary</th>
                  <th>Tax</th>
                  <th>Other Ded.</th>
                  <th>Net Pay</th>
                  <th>Processed</th>
                  <th>By</th>
                </tr>
              </thead>
              <tbody>
                {history.map((h) => (
                  <tr key={h.id}>
                    <td>{new Date(h.pay_period_start).toLocaleDateString()} - {new Date(h.pay_period_end).toLocaleDateString()}</td>
                    <td>${parseFloat(h.base_salary).toLocaleString()}</td>
                    <td>${parseFloat(h.tax_deduction).toLocaleString()}</td>
                    <td>${parseFloat(h.other_deductions).toLocaleString()}</td>
                    <td className="net-pay">${parseFloat(h.net_pay).toLocaleString()}</td>
                    <td>{new Date(h.processed_date).toLocaleDateString()}</td>
                    <td>{h.processed_by_username || '—'}</td>
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
