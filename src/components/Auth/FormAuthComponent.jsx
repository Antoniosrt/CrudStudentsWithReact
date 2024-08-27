import { useContext, useState } from "react"
import { ButtonPrimary } from "../Buttons/ButtonPrimaryLogin"
import { AuthContext } from "../../context/AuthContext"
import { Link, Navigate } from "react-router-dom"
import Swal from "sweetalert2"

export const FormAuthComponent = () => {
	const [valuesFormAuth, setValuesFormAuth] = useState({
		email: "",
		password: ""
	})
	const [isLoading, setIsLoading] = useState(false)
	const { signIn, isAuthenticated } = useContext(AuthContext)
	const handleChange = (e) => {
		setValuesFormAuth({ ...valuesFormAuth, [e.target.name]: e.target.value })
		console.log(valuesFormAuth)
	}
	const handleSubmit = async (e) => {
		e.preventDefault()
		setIsLoading(true)
		const responseSignIn = await signIn(valuesFormAuth.email, valuesFormAuth.password)
		setIsLoading(false)
		console.log("respon", responseSignIn)
		if (responseSignIn.error == false) {
			<Navigate to={"/home"} />
		} else {
			Swal.fire({
				title: "Erro",
				text: responseSignIn.message,
				icon: "error",
				confirmButtonText: "Ok"
			})
		}

	}
	if (isAuthenticated()) {
		return <Navigate to={"/home"} />
	} else {
		return (
			<>
				<form className="mt-8 space-y-6" onSubmit={handleSubmit} autoComplete="false" autoSave="false">
					<div className="">
						<label className="input input-bordered flex items-center gap-2 mb-10">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 16 16"
								fill="currentColor"
								className="h-4 w-4 opacity-70">
								<path
									d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
								<path
									d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
							</svg>
							<input type="text" value={valuesFormAuth.email} name="email" onChange={handleChange} className="grow"
										 placeholder="Email" />
						</label>
						<label className="input input-bordered flex items-center gap-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 16 16"
								fill="currentColor"
								className="h-4 w-4 opacity-70">
								<path
									fillRule="evenodd"
									d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
									clipRule="evenodd" />
							</svg>
							<input type="password" className="grow" placeholder="*******" name="password" onChange={handleChange}
										 value={valuesFormAuth.password} />
						</label>
						<div className="mt-5 text-center">
							<ButtonPrimary isLoading={isLoading} text={"Login"} />
							<p className={"mt-10"}>
								<Link to={"/register"} className="text-blue-500">Não tem uma conta? Cadastre-se</Link>
							</p>
						</div>
					</div>
				</form>

			</>
		)
	}
}