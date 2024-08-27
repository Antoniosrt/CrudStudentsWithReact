import React from "react"
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "./context/AuthContext"
import SignInPage from "./pages/SignInPage"
import { HomePage } from "./pages/HomePage"
import { StudentDetails } from "./pages/StudentDetails.jsx"
import { Header } from "./components/template/Header.jsx"
import SignUpPage from "./pages/SignUpPage.jsx"

const PrivateRoute = () => {
	const { isAuthenticated,deslogar } = useContext(AuthContext)
	console.log('esta autenticado', isAuthenticated)
	if (!isAuthenticated()) {
		// Redirecionar para a página de login se não autenticado
		return <Navigate to="/" />;
	}
	return (
		<>
			<Header deslogar={deslogar} />
			<Outlet />
		</>
	);
}

const AppRouter = () => (
	<Router>
		<Routes>
			<Route path="/" element={<SignInPage />} />
			<Route path="/register" element={<SignUpPage />} />
			<Route element={<PrivateRoute />}>
				<Route path="/home" element={<HomePage />} />
				<Route path="/student/:id" element={<StudentDetails />} />
				<Route path="/student" element={<StudentDetails />} />
			</Route>
			{/* <PrivateRoute path="/app" component={() => <h1>App</h1>} /> */}
		</Routes>
	</Router>
)

export default AppRouter