import { Link } from "react-router-dom"

export const HeaderTableComponent = ({totalPages,numberPerPage,setPage,setNumberPerPage}) =>{
    return (
        <div className="flex mb-10 justify-between">
          <label className="text-lg">Numero por página</label>
            <select className="select select-bordered w-full max-w-xs" value={numberPerPage} onChange={(e) => setNumberPerPage(e.target.value)}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
            </select>
            <label className="text-lg">Pagina</label>
            <select className="select select-bordered w-full max-w-xs"  onChange={(e) => setPage(e.target.value)}>
                {
                    Array.from({length: totalPages}, (_, i) => i + 1).map((page)=>(
                        <option value={page}>{page}</option>
                    ))
                }
            </select>
        <Link to={'/student/'} className=" btn  btn-active btn-primary btn-wide" type="submit" >
            Cadastrar Novo Estudante
        </Link>
        </div>
    )
}