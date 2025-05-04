import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CountryPage from "./pages/CountryPage";
import Favorites from "./pages/Favorites";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Footer from "./components/Footer";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route 
              path="/country/:code" 
              element={
                <ProtectedRoute>
                  <CountryPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/favorites" 
              element={
                <ProtectedRoute>
                  <Favorites />
                </ProtectedRoute>
              } 
            />  
      </Routes>
      <Footer />
    </>
  );
}

export default App;
