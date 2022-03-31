import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./components/Header";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import MyProfile from "./pages/MyProfile";
import Register from "./pages/Register";
import CreateProfile from "./pages/CreateProfile";
import EditProfile from "./pages/EditProfile";
import AddExperience from "./pages/AddExperience";
import AddEducation from "./pages/AddEducation";
import Profiles from "./pages/Profiles";
import UserProfile from "./pages/UserProfile";

function App() {
  const { user } = useSelector(state => state.auth);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={user ? <Navigate to='/my-profile' /> : <Landing />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/my-profile' element={user ? <MyProfile /> : <Navigate to='/login' />} />
        <Route path='/create-profile' element={user ? <CreateProfile /> : <Navigate to='/login' />} />
        <Route path='/edit-profile' element={user ? <EditProfile /> : <Navigate to='/login' />} />
        <Route path='/add-experience' element={user ? <AddExperience /> : <Navigate to='/login' />} />
        <Route path='/add-education' element={user ? <AddEducation /> : <Navigate to='/login' />} />
        <Route path='/profiles' element={<Profiles />} />
        <Route path='/profile/:userId' element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
