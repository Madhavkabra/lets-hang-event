import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import MainLayout from './layouts/MainLayout';
import CreateEvent from './pages/CreateEvent';

function App() {
  return (
    <RecoilRoot>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<CreateEvent />} />
          </Routes>
        </MainLayout>
      </Router>
    </RecoilRoot>
  );
}

export default App;
