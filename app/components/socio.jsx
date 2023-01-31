
import { Form, useActionData, useNavigate } from '@remix-run/react'
import { redirect } from '@remix-run/node'

export async function action({params}){
    return redirect('/socios')
}

function Socio({partner}){

    const navigation = useNavigate()
    const {_id, ci} = partner
    return (
        <tr className="border-b">
            <td className="p-2">{partner.name}</td>
            <td className="p-2">{partner.first_name}</td>
            <td className="p-2">{partner.ci}</td>
            <td className="p-2">{partner.phone}</td>
            <td className="">
                <div className="flex gap-2 items-center">
                    <button 
                        className="bg-green-700 text-white px-2 py-1 rounded-sm text-sm" 
                        onClick={ () => navigation(`/socio-view/${ci}`) }
                    >Ver</button>
                    <button 
                        className="bg-yellow-600 text-white px-2 py-1 rounded-sm text-sm"
                        onClick={ () => navigation(`/socio-edit/${ci}`) }
                    >Editar</button>
                    <Form 
                        method='post'
                        action={`/socio-delete/${ci}`}
                        onSubmit={ e => {
                            if(!confirm('Estas seguro de eliminar?')){
                                e.preventDefault()
                            }
                        } }
                    >
                        <button type='submit' className="bg-red-700 text-white px-2 py-1 rounded-sm text-sm">Eliminar</button>
                    </Form>
                    
                </div>
            </td>
        </tr>
        
    )
}

export default Socio