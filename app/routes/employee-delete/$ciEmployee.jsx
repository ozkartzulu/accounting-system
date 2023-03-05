
import { redirect } from '@remix-run/node'
import { deleteEmployee } from '~/models/employees.server'

export async function action({params}){
    deleteEmployee(params.ciEmployee)
    return redirect('/employees')
}

function Employee(){
    return (
        <h2></h2>
    )
}

export default Employee