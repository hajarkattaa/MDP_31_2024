//import viteLogo from '/vite.svg' aya shi bhoto bi public i can access bi /name.ext

import './App.css';
import NavBar from './components/navBar';
import UploadButton from './components/uploadCaseDialog';
import Dashboard from './pages/dashboard';
import Landing from './pages/landing';
import ResultPage from './pages/result';
import SignIn from './pages/signin';
import SignUp from './pages/signup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/signin" element={<SignIn></SignIn>}></Route>
        <Route path="/signup" element={<SignUp></SignUp>}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/uploadpage" element={<UploadButton />}></Route>
        <Route path="/resultpage" element={<ResultPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
