import { useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/NavBar';

export default function UploadTasks() {
  const [file, setFile] = useState(null);
  const token = localStorage.getItem('token');

  const handleUpload = async () => {
    if (!file) return alert('Select a file');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:5000/api/tasks/upload', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      alert(`${res.data.count} tasks uploaded`);
    } catch {
      alert('Upload failed');
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ marginLeft: '220px', width: '100%' }}>
        <Navbar title="Upload Tasks" />
        <div style={{ padding: '2rem' }}>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <button onClick={handleUpload}>Upload</button>
        </div>
      </div>
    </div>
  );
}