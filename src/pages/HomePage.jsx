import { useContext, useEffect, useState } from "react"
import { TableStudentsHomeComponent } from "../components/TableStudentsHome/TableStudentsHomeComponent.jsx"
import { api } from "../data/service/api"
import { AuthContext } from "../context/AuthContext.jsx"
import { ButtonPrimary } from "../components/Buttons/ButtonPrimaryLogin.jsx"
import { HeaderTableComponent } from "../components/TableStudentsHome/HeaderTableComponent.jsx"

export const HomePage = () => {
	const [students, setStudents] = useState([])
	const [numberPerPage, setNumberPerPage] = useState(10)
	const [totalPages, setTotalPages] = useState(0)
	const [page, setPage] = useState(1)
	useEffect(() => {
		console.log(api.defaults)
		getStudents()
	}, [numberPerPage,page])
	const getStudents = async () => {
		api.get("/api/students", {
			params: {
				page: page,
				perPage: numberPerPage
			}
		}
		).then((res) => {
			console.log(students)
			setNumberPerPage(res.data.perPage)
			setPage(res.data.page)
			setTotalPages(res.data.totalPages)
			setStudents(res.data.students)
		}).catch((err) => {
			if (err.response.status === 401) {
			}
		})
	}
		return (
			<>
				<div className=" flex items-center justify-center py-12 px-4 sm:px-6 lg:px-4">
					<div className="bg-neutral-900 p-10 w-screen">
						<HeaderTableComponent numberPerPage={numberPerPage} setNumberPerPage={setNumberPerPage}
																	totalPages={totalPages} setPage={setPage} />
						<TableStudentsHomeComponent students={students} />
					</div>
				</div>
			</>
		)
	}