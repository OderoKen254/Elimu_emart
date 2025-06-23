import { Routes, Route } from 'react-router-dom';
import AdminPanel from './pages/AdminPanel.jsx';

function App() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Routes>
        <Route path="/" element={<AdminPanel />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </div>
  );
}

export default App;