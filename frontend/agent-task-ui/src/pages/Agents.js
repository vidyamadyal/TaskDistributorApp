import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/NavBar';

export default function Agents() {
  const [agents, setAgents] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://localhost:5000/api/agents/all', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setAgents(res.data));
  }, []);

  const addAgent = async () => {
    await axios.post('http://localhost:5000/api/agents/add', {
      name, email, mobile, password
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    alert('Agent added');
    setName('');
    setEmail('');
    setMobile('');
    setPassword('');
    axios.get('http://localhost:5000/api/agents/all', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setAgents(res.data));
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ marginLeft: '220px', width: '100%' }}>
        <Navbar title="Agent Management" />
        <div style={{ padding: '2rem' }}>
          <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input placeholder="Mobile (+91...)" value={mobile} onChange={(e) => setMobile(e.target.value)} />
          <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={addAgent}>Add Agent</button>

          <h3>Agent List</h3>
          <ul>
            {agents.map(agent => (
              <li key={agent._id}>
                {agent.name} — {agent.email} — {agent.mobile}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}