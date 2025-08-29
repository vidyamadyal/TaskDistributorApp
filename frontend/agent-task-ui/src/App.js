import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Agents from './pages/Agents';
import UploadTasks from './pages/UploadTasks';
import ViewTasks from './pages/ViewTasks';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/agents" element={<Agents />} />
        <Route path="/upload" element={<UploadTasks />} />
        <Route path="/view-tasks" element={<ViewTasks />} />

      </Routes>
    </Router>
  );
}

export default App;
