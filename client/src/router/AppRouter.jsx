import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../components/pages/auth/Login";
import Register from "../components/pages/auth/Register";
import MainLayout from "../components/layout/MainLayout";
import AddProject from "../components/pages/projects/AddProject";
import AddStudent from "../components/pages/projects/AddStudent";
import CoursesPage from "../components/pages/projects/MyProjects";
import EditProfile from "../components/pages/profile/EditProfile";
import ProjectItem from "../components/pages/projects/ProjectItem";
import ResetPassword from "../components/pages/auth/ResetPassword";
import ForgotPassword from "../components/pages/auth/ForgotPassdord";

const AppRouter = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/forgot-password" element={<ForgotPassword />} />
				<Route path="/reset-password/:token" element={<ResetPassword />} />
				<Route path="/dashboard" element={<MainLayout />}>
					<Route path="projects/item" element={<ProjectItem />} />
					<Route path="projects/:type" element={<CoursesPage />} />
					<Route path="projects/add-project" element={<AddProject />} />
					<Route path="projects/add-student" element={<AddStudent />} />
					<Route path="profile/edit-profile" element={<EditProfile />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default AppRouter;
