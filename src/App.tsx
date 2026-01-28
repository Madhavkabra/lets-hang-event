import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import CreateEvent from './pages/CreateEvent';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<CreateEvent />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
