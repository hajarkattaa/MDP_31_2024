//import viteLogo from '/vite.svg' aya shi bhoto bi public i can access bi /name.ext

import './App.css';
import NavBar from './components/navBar';
import Dashboard from './pages/dashboard';
import Landing from './pages/landing';
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
      </Routes>
    </Router>
  );
}

export default App;
