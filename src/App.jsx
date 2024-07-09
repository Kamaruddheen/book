import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import EditBookPage from "./pages/EditBookPage";
import AddBookPage from "./pages/AddBookPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/add/" element={<AddBookPage />} />
        <Route path="/edit/:title" element={<EditBookPage />} />
      </Routes>
    </>
  );
};

export default App;
