
import { redirect } from '@remix-run/node'
import { deletePartner, setPointer, getPartners } from '~/models/partners.server'

export async function action({params}){
    await deletePartner(params.urlSocio)
    const partners = await getPartners()
    await setPointer(partners.length)
    return redirect('/socios')
}

function Socio(){
    return (
        <h2>Socio</h2>
    )
}

export default Socio