import Register from './Components/Register/Register.js';
import Login from './Components/Login/Login.js';
import Home from './Home.js';
import Browse from './Components/Browse/Browse.js';
import Profile from './Components/Profile/Profile.js';
import ProfileSetupPlayer from './Components/Profile/ProfileSetupPlayer.js';
import ProfileSetupManager from './Components/Profile/ProfileSetupManager.js';
import ProfileSetupChoose from './Components/Profile/ProfileSetupChoose.js';
import PasswordReset from './Components/Reset/PasswordReset.js';
import ResetEmail from './Components/Reset/ResetEmail.js';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/browse" element={<Browse/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/profile-setup-player" element={<ProfileSetupPlayer/>}/>
          <Route path="/profile-setup-manager" element = {<ProfileSetupManager/>}/>
          <Route path="/profile-setup-choose" element = {<ProfileSetupChoose/>}/>
          <Route path="/password-reset/:id" element={<PasswordReset/>}/>
          <Route path="/password-reset" element={<ResetEmail/>}/>
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;
