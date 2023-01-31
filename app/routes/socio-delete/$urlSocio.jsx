
import { redirect } from '@remix-run/node'
import { deletePartner } from '~/models/partners.server'

export async function action({params}){
    deletePartner(params.urlSocio)
    return redirect('/socios')
}

function Socio(){
    return (
        <h2>Socio</h2>
    )
}

export default Socio