import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse, faPlusSquare, faRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import {AuthContext } from "../../context/AuthContext.jsx"
import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
export const Header = ({ deslogar }) => {
	const handleSignOut = (e) => {
		let bool = deslogar();
	}
	return (
		<header className="bg-neutral-900 text-white">
			<div className="container mx-auto p-4 flex justify-between items-center">
				<h1 className="text-2xl font-bold">Crud Students With CodeIgniter + ReactJS</h1>
				<nav>
					<ul className="flex space-x-4">
						<li>
							<Link to="/home" className="hover:text-green-800 duration-200" title="Voltar para Home">
								<FontAwesomeIcon icon={faHouse} />
							</Link>
						</li>
						<li>
							<Link to="/student" className="hover:text-primary duration-200" title="Cadastrar Novo Estudante">
								<FontAwesomeIcon icon={faPlusSquare} />
							</Link>
						</li>
						<div className="divider lg:divider-horizontal"></div>
						<li>
							<Link to={""} onClick={handleSignOut} className="hover:text-red-800 duration-200" title="Sair">
								<FontAwesomeIcon icon={faRightFromBracket} />
							</Link>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	)
}