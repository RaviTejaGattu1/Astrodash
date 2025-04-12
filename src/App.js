import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import DetailView from './DetailView';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/detail/:date" element={<DetailView />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
