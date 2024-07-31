import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import EditBookPage from "./pages/EditBookPage";
import AddBookPage from "./pages/AddBookPage";
import { AuthContextProvider } from "./context/AuthContext";

const App = () => {
    return (
        <AuthContextProvider>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Registration />} />
                <Route path="/add/" element={<AddBookPage />} />
                <Route path="/edit/:title" element={<EditBookPage />} />
            </Routes>
        </AuthContextProvider>
    );
};

export default App;
