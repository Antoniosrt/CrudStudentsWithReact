import { Children, createContext } from "react"
import { useState } from "react"
import { api } from "../data/service/api"
import getValidJwtFromStorage from "../data/service/jwtValidator"
import { Navigate, useNavigate } from "react-router-dom"

export const AuthContext = createContext()

const TOKEN_NAME = "token"
// Cria um provider para gerenciar o state e fazre o signIn, logout etc
export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null)
	const signIn = async (email, password) => {
		let responseAuthLoginContext = {
			"error": true,
			"status": 400,
			"message": "Erro ao realizar login"
		}
		try {
			const responseSignInApiCall = await api.post("/auth/login",
				{
					email: email,
					password: password
				}
			)
			if (responseSignInApiCall?.status != 200) {
				return responseAuthLoginContext
			}
			setUser(responseSignInApiCall.data)
			api.defaults.headers.common["Authorization"] = "Bearer " + responseSignInApiCall.data?.access_token
			localStorage.setItem(TOKEN_NAME, responseSignInApiCall.data.access_token)
			responseAuthLoginContext.error = false
			responseAuthLoginContext.status = responseSignInApiCall.status
			responseAuthLoginContext.message = "Sucesso ao realizar Login"
		} catch (err) {
			console.log(err)
		}
		return responseAuthLoginContext

	}
	const isAuthenticated = () => {
		if (
			localStorage.getItem(TOKEN_NAME) !== null) {
			const isValid = getValidJwtFromStorage(TOKEN_NAME)
			return isValid
		}
		return false
	}
	const deslogar = () => {
		console.log("saindo")
		localStorage.clear()
		setUser(null)
		return true
	}
	return (
		<AuthContext.Provider
			value={{
				signIn,
				deslogar,
				user,
				isAuthenticated
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}