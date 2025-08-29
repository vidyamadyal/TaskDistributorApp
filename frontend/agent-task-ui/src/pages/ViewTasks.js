import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/NavBar';

export default function ViewTasks() {
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState('');
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://localhost:5000/api/agents/all', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setAgents(res.data));
  }, []);

  const fetchTasks = async () => {
    if (!selectedAgent) return;
    try {
      const res = await axios.get(`http://localhost:5000/api/tasks/by-agent/${selectedAgent}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(res.data);
    } catch (err) {
      alert('Failed to load tasks');
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ marginLeft: '220px', width: '100%' }}>
        <Navbar title="View Tasks" />
        <div style={{ padding: '2rem' }}>
          <label htmlFor="agentSelect" style={{ marginRight: '1rem' }}>Select Agent:</label>
          <select
            id="agentSelect"
            onChange={(e) => setSelectedAgent(e.target.value)}
            value={selectedAgent}
            style={{ padding: '0.5rem', minWidth: '250px' }}
          >
            <option value="">-- Choose an Agent --</option>
            {agents.map(agent => (
              <option key={agent._id} value={agent._id}>
                {agent.name} ({agent.email})
              </option>
            ))}
          </select>
          <button
            onClick={fetchTasks}
            style={{
              marginLeft: '1rem',
              padding: '0.5rem 1rem',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Load Tasks
          </button>

          {tasks.length > 0 && (
            <table style={{ width: '100%', marginTop: '2rem', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f0f0f0' }}>
                  <th style={{ padding: '0.5rem', border: '1px solid #ccc' }}>First Name</th>
                  <th style={{ padding: '0.5rem', border: '1px solid #ccc' }}>Phone</th>
                  <th style={{ padding: '0.5rem', border: '1px solid #ccc' }}>Notes</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map(task => (
                  <tr key={task._id}>
                    <td style={{ padding: '0.5rem', border: '1px solid #ccc' }}>{task.firstName}</td>
                    <td style={{ padding: '0.5rem', border: '1px solid #ccc' }}>{task.phone}</td>
                    <td style={{ padding: '0.5rem', border: '1px solid #ccc' }}>{task.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {tasks.length === 0 && selectedAgent && (
            <p style={{ marginTop: '2rem', color: '#888' }}>No tasks assigned to this agent yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}