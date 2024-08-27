import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit } from "@fortawesome/free-solid-svg-icons"

export const FooterComponent = ({ formAvaible, handleSubmit, cancelEdit, makeEditable, isLoading }) => {
	return (<>
			{formAvaible && (<>
					<button className="btn btn-lg btn-outline btn-danger mr-3" onClick={cancelEdit} type={"button"}>Voltar
					</button>
					<button className="btn btn-lg btn-outline btn-info mr-3" onClick={makeEditable} type={"button"}>Habilitar
						Edição
						<FontAwesomeIcon icon={faEdit} className="ml-1" />
					</button>
				</>
			)
			}
			{
				!formAvaible && (
					<>
						<button className="btn btn-lg btn-outline btn-danger mr-3" onClick={cancelEdit} type={"button"}
										disabled={isLoading ? true : false}>
							{
								isLoading ? (<span className="loading loading-spinner loading-xs"></span>) : "Cancelar"
							}
						</button>
						<button onClick={handleSubmit} className="btn btn-lg btn-outline btn-primary"
										disabled={isLoading ? true : false}>
							{
								isLoading ? (<span className="loading loading-spinner loading-xs"></span>) : "Salvar"
							}
						</button>
					</>)
			}
		</>
	)
}