import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../components/pages/Login";
import Register from "../components/pages/Register";
import MainLayout from "../components/layout/MainLayout";
import ResetPassword from "../components/pages/ResetPassword";
import ForgotPassword from "../components/pages/ForgotPassdord";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/dashboard" element={<MainLayout />} > 
                    {/* Here will be the children */}
                    <Route></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;