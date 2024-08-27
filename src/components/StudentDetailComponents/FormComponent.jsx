import { InputComponent } from "./InputComponent.jsx"
import maskInput from "../../data/service/masks.js"
import getViaCepData from "../../data/service/viaCepAutocomplete.js"
import { api } from "../../data/service/api.js"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { FooterComponent } from "./FooterComponent.jsx"
import { useState } from "react"
import { PhotoPreview } from "./PhotoPreview.jsx"

export const FormComponent = ({
																student,
																formAvaible,
																setStudent,
																setFormAvaible,
																originalStudent,
																imageBase64ToBlob
															}) => {
	const navigate = useNavigate()
	const [image, setImage] = useState(null)
	const [isLoading, setIsLoading] = useState(false)
	const handleChangeInput = async (e) => {
		let { name, value } = e.target
		//aplica mascara no value
		value = maskInput(name, value)
		//se for CEP tem que chamar a API viaCep
		if (name === "cep" && value.length >= 9) {
			const address_data = await getViaCepData(value)
			setStudent((prevState) => ({ ...prevState, ...address_data }))
		}
		setStudent((prevState) => ({
			...prevState, [name]: value
		}))
		console.log(student)
	}
	const cancelEdit = (e) => {
		e.preventDefault()
		if (student.id && !formAvaible) {
			Swal.fire({
				title: "Deseja realmente cancelar?",
				text: "Os dados não salvos serão perdidos",
				icon: "warning",
				showCancelButton: true,
				confirmButtonText: "Sim",
				cancelButtonText: "Não"
			}).then((result) => {
				if (result.isConfirmed) {
					if (student.id && !formAvaible) {
						setFormAvaible(true)
						setStudent(null)
						setStudent(originalStudent)
					}
				}
			})
		} else {
			navigate("/home")
		}
	}

	const handleImageChange = (event) => {
		setStudent((prevState) => ({
			...prevState, photo: URL.createObjectURL(event.target.files[0])
		}))

		setImage(event.target.files[0])
	}
	const makeEditable = (e) => {
		e.preventDefault()
		setFormAvaible(false)
	}
	function sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
	const handleSubmit = (e) => {
		e.preventDefault()
		setIsLoading(true)
		let formData = new FormData()
		if (image) {
			formData.append("photo", image)
		}
		formData.append("fullName", student.fullName)
		formData.append("email", student.email)
		formData.append("cpf", student.cpf.replace(/\D/g, ""))
		formData.append("phone", student.phone.replace(/\D/g, ""))
		formData.append("cep", student.cep.replace(/\D/g, ""))
		formData.append("street", student.street)
		formData.append("city", student.city)
		formData.append("state", student.state)
		formData.append("address_number", student.address_number)
		formData.append("extra", student.extra)
		if (student.id) {
			//faz um UPDATE caso tenha ID
			api.post("/api/students/" + student.id, formData).then((res) => {
				Swal.fire({
					icon: "success",
					title: "Sucesso",
					text: "Aluno cadastrado com sucesso"
				}).then(() => {
					navigate("/home")
				})
			}).catch((error) => {
				//faço um loop para pegar todos os erros
				let errorsMotivos = "<ul>"
				for (let key in error.response.data.messages.errors) {
					errorsMotivos += "<li>" + error.response.data.messages.errors[key] + "</li>"
				}
				errorsMotivos += "</ul>"
				Swal.fire({
					icon: "error",
					title: "Erro",
					html: "Erro ao cadastrar aluno:\n" + errorsMotivos
				})
			})
		} else {
			//faz um INSERT caso não tenha ID
			api.post("/api/students", formData).then((res) => {
				Swal.fire({
					icon: "success",
					title: "Sucesso",
					text: "Aluno cadastrado com sucesso"
				}).then(() => {
					navigate("/home")
				})
			}).catch((error) => {
				//faço um loop para pegar todos os erros
				let errorsMotivos = "<ul>"
				for (let key in error.response.data.messages.errors) {
					errorsMotivos += "<li>" + error.response.data.messages.errors[key] + "</li>"
				}
				errorsMotivos += "</ul>"
				Swal.fire({
					icon: "error",
					title: "Erro",
					html: "Erro ao cadastrar aluno:\n" + errorsMotivos
				})
			})
		}
		setIsLoading(false)
	}
	let urlImage = ""
	if (originalStudent) {
		const blob = imageBase64ToBlob(originalStudent.photo)
		urlImage = URL.createObjectURL(blob)
	}

	return (
		<form className="mb-10">
			<div className="grid grid-rows gap-4 sm:auto-rows-auto">
				<div className="lg:p-10 bg-neutral-900">
					<p>
						Dados Basicos:
					</p>
					<div className="grid lg:grid-cols-4 sm:grid-rows ">

						<InputComponent type={"text"} onChange={handleChangeInput} value={student.fullName}
														disabled={formAvaible} name={"fullName"} label={"Nome Completo"}
														placeholder={"Nome Completo"} />
						<InputComponent type={"email"} onChange={handleChangeInput} value={student.email} disabled={formAvaible}
														label={"E-mail"}
														placeholder={"E-mail"} name={"email"} />
						<InputComponent type={"text"} onChange={handleChangeInput} value={student.cpf} disabled={formAvaible}
														label={"CPF"}
														placeholder={"CPF"} name={"cpf"} />
						<InputComponent type={"text"} onChange={handleChangeInput} value={student.phone} disabled={formAvaible}
														label={"Telefone"}
														placeholder={"Telefone"} name={"phone"} />

						<div>
							{formAvaible &&
								(
									<PhotoPreview img={urlImage} />
								)}

							{!formAvaible && (
								<>
									<input type="file" name={"photo"} onChange={handleImageChange}
												 className="file-input mt-8 w-full max-w-xs" />
								</>
							)}
							{!formAvaible && student.photo && (
								<PhotoPreview img={student.photo} />
							)}
						</div>
					</div>
				</div>
				<div className="lg:p-10 bg-neutral-900 ">
					<p>Endereço:</p>
					<div className={"grid lg:grid-cols-4 sm:grid-rows"}>
						<InputComponent type={"text"} onChange={handleChangeInput} value={student.cep} disabled={formAvaible}
														label={"CEP"}
														placeholder={"CEP"} name={"cep"} />
						<InputComponent type={"text"} onChange={handleChangeInput} value={student.street} disabled={formAvaible}
														label={"Rua"}
														placeholder={"Rua"} name={"street"} />
						<InputComponent type={"text"} onChange={handleChangeInput} value={student.city} disabled={formAvaible}
														label={"Cidade"}
														placeholder={"Cidade"} name={"city"} />
						<InputComponent type={"text"} onChange={handleChangeInput} value={student.state} disabled={formAvaible}
														label={"UF"}
														placeholder={"UF"} name={"state"} />
						<InputComponent type={"text"} onChange={handleChangeInput} value={student.address_number}
														disabled={formAvaible} label={"Numero"}
														placeholder={"Numero"} name={"address_number"} />
						<InputComponent type={"text"} onChange={handleChangeInput} value={student.extra} disabled={formAvaible}
														label={"Complemento"}
														placeholder={"Complemento"} name={"extra"} />
					</div>
				</div>
			</div>
			<div className={"mt-10 justify-end flex"}>
				<FooterComponent formAvaible={formAvaible} makeEditable={makeEditable} isLoading={isLoading} cancelEdit={cancelEdit}
												 handleSubmit={handleSubmit} />
			</div>
		</form>
	)
}