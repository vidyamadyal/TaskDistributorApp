import { useNavigate } from 'react-router-dom';
import { FaUserFriends, FaUpload, FaTasks, FaSignOutAlt } from 'react-icons/fa';

export default function Sidebar() {
  const navigate = useNavigate();

  const buttonStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1rem',
    backgroundColor: '#f0f0f0',
    border: 'none',
    width: '100%',
    textAlign: 'left',
    cursor: 'pointer',
    fontSize: '1rem'
  };

  return (
    <div style={{
      width: '220px',
      height: '100vh',
      backgroundColor: '#eaeaea',
      padding: '1rem',
      boxSizing: 'border-box',
      borderRight: '1px solid #ccc',
      position: 'fixed',
      top: 0,
      left: 0
    }}>
      <h3 style={{ marginBottom: '2rem' }}>📦 Dashboard</h3>
      <button style={buttonStyle} onClick={() => navigate('/agents')}>
        <FaUserFriends /> Agents
      </button>
      <button style={buttonStyle} onClick={() => navigate('/upload')}>
        <FaUpload /> Upload Tasks
      </button>
      <button style={buttonStyle} onClick={() => navigate('/view-tasks')}>
        <FaTasks /> View Tasks
      </button>
      <button style={buttonStyle} onClick={() => navigate('/')}>
        <FaSignOutAlt /> Logout
      </button>
    </div>
  );
}