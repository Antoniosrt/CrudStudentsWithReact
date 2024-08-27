import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { api } from "../data/service/api.js"
import { FormComponent } from "../components/StudentDetailComponents/FormComponent.jsx"
import Swal from "sweetalert2"

export const StudentDetails = () => {
	const { id } = useParams()
	const [student, setStudent] = useState({
		id: "",
		fullName: "",
		email: "",
		cpf: "",
		phone: "",
		street: "",
		city: "",
		state: "",
		cep: "",
		address_number: "",
		extra: "",
		photo: ""
	})
	const [originalStudent, setOriginalStudent] = useState(null)
	const [isLoading, setIsLoading] = useState(false)
	const [formAvaible, setFormAvailbe] = useState(id ? true : false)
	if (id) {
		useEffect(() => {
			setIsLoading(true)
			setStudent(null)
			api.get("/api/students/" + id).then((res) => {
				setStudent(res.data)
				setOriginalStudent(res.data)
				setIsLoading(false)
			}).catch((error) => {
				Swal.fire({
					icon: "error",
					title: "Erro",
					text: "Erro ao buscar aluno" + error.response.data.error
				})
			})
		}, [id])
		if (!student) {
			return (
				<div className={"text-center flex justify-center align-middle h-fit"}>
					<span className="loading loading-bars loading-lg"></span>
				</div>
			)
		}
	}
	const deletarStudent = () => {
		Swal.fire({
			title: "Deletar",
			text: "Deseja realmente deletar este aluno?",
			icon: "warning",
			showCancelButton: true,
			confirmButtonText: "Sim",
			cancelButtonText: "Não"
		}).then((result) => {
			if (result.isConfirmed) {
				api.delete("/api/students/" + student.id).then((res) => {
					Swal.fire({
						icon: "success",
						title: "Sucesso",
						text: "Aluno deletado com sucesso"
					}).then(() => {
						window.location.href = "/home"
					})
				}).catch((error) => {
					Swal.fire({
						icon: "error",
						title: "Erro",
						text: "Erro ao deletar aluno" + error.response.data.error
					})
				})
			}
		})
	}
	const imageBase64ToBlob = (base64String, contentType = "image/png") => {
		const byteCharacters = atob(base64String.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""))
		const byteArrays = []

		for (let offset = 0; offset < byteCharacters.length; offset += 512) {
			const slice = byteCharacters.slice(offset, offset + 512)
			const byteNumbers = new Array(slice.length)
			for (let i = 0; i < slice.length; i++) {
				byteNumbers[i] = slice.charCodeAt(i)
			}
			const byteArray = new Uint8Array(byteNumbers)
			byteArrays.push(byteArray)
		}

		return new Blob(byteArrays, { type: contentType })
	}
	return (
		<>
			<div className={"py-12 px-4 sm:px-6 lg:px-4 min-h-full h-screen"}>

				<div className="flex justify-between">
					<h1 className="my-5">Painel do Estudante</h1>
					{id && (
						<div className="mr-10">
							<button onClick={deletarStudent} className="btn-warning btn-lg btn text-white p-2 ">Deletar Estudante</button>
						</div>)}
				</div>
				<FormComponent formAvaible={formAvaible} student={student} setStudent={setStudent}
											 setFormAvaible={setFormAvailbe} originalStudent={originalStudent}
											 imageBase64ToBlob={imageBase64ToBlob} />
			</div>
		</>
	)

}