import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./components/Header";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import MyProfile from "./pages/MyProfile";
import Register from "./pages/Register";
import CreateProfile from "./pages/CreateProfile";

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
        <Route path='/create-profile' element={<CreateProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
