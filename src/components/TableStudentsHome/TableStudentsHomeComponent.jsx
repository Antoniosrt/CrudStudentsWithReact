import { Link } from "react-router-dom"

export const TableStudentsHomeComponent =({students})=>{
    return (
        <>
        <div className="overflow-x-auto w-100 ">
            <table className="table">
                {/* head */}
                <thead>
                <tr>
                    <th>
                    </th>
                    <th>Dados Básicos</th>
                    <th>Contato</th>
                    <th>Ações</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {
                    students.length > 0 ?
                    students.map((student)=>(
                    <tr>
                        <th>
                        <label key={student.id}>
                            {student.id}
                        </label>
                        </th>
                        <td>
                        <div className="flex items-center gap-3">
                            <div>
                            <div className="font-bold">{student.fullName}</div>
                            <div className="text-sm opacity-50">{student.city}-{student.state}</div>
                            </div>
                        </div>
                        </td>
                        <td>
                        {student.email} - {student.phone}
                        </td>
                        <th>
                        <Link to={"/student/"+student.id} className={"btn btn-info btn-outline"} >Ver mais</Link>
                        </th>
                    </tr>
                    ))
                    : <tr>
                        <td colSpan="5" className="text-center">Nenhum aluno encontrado</td>
                    </tr>
                }
                </tbody>
                {/* foot */}
                <tfoot>
                <tr>
                    <th></th>
                    <th>Dados Básicos</th>
                    <th>Contato</th>
                    <th>Ações</th>
                    <th></th>
                </tr>
                </tfoot>
            </table>
                
            </div>
        </>
    )
}