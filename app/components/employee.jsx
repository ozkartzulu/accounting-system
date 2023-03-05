
import { Form, useActionData, useNavigate } from '@remix-run/react'
import { redirect } from '@remix-run/node'
import { useState } from 'react'

// export async function action({params}){
//     return redirect('/employees')
// }

function Employee({partner, showListActive}){

    const navigation = useNavigate()
    const [status, setStatus] = useState(partner.status)

    const getSavingTotal = () => partner.road_map?.reduce((allTotal, row) => {
        const sum = row.weeks?.reduce((total, item) => {
          return total + item.saving
        }, 0)
        return allTotal + sum;
    }, 0)

    const getWithdrawnTotal = () => partner.road_map?.reduce((allTotal, row) => {
        const sum = row.withdrawn?.reduce((total, item) => {
          return total + item.amount
        }, 0)
        return allTotal + sum;
    }, 0)

    const getContributionTotal = () => partner.contribution ? partner.contribution?.amount - partner.contribution?.withdrawn_amount : 0

    const getTotal = () => getSavingTotal() - getWithdrawnTotal() + getContributionTotal()


    const {_id, ci} = partner
    return (
        <tr className="border-b">
            <td className="p-2">{partner.name}</td>
            <td className="p-2">{partner.first_name}</td>
            <td className="p-2">{partner.ci}</td>
            <td className="p-2">{partner.phone}</td>
            <td className="p-2">{getTotal()} Bs.</td>
            <td className="">
                <div className="flex gap-2 items-center">
                    {showListActive &&
                        <button 
                            className="bg-sky-600 hover:bg-sky-700 text-white px-2 py-1 rounded-sm text-sm" 
                            onClick={ () => navigation(`/employee-view/${ci}`) }
                        >Ver</button>
                    }
                    <Form method='post'>
                        <input type="hidden" id='user_status' name='user_status' value={status} />
                        <input type="hidden" id='user_ci' name='user_ci' value={ci} />
                        <input 
                            type='submit'
                            className="bg-green-700 hover:bg-green-800 text-white px-2 py-1 rounded-sm text-sm cursor-pointer" 
                            onClick={ () => setStatus(!status) }
                            value={showListActive ? 'Mover a Pasivo' : 'Mover a Activo'} />
                    </Form>

                    <button 
                        className="bg-yellow-600 hover:bg-yellow-700 text-white px-2 py-1 rounded-sm text-sm"
                        onClick={ () => navigation(`/employee-edit/${ci}`) }
                    >Editar</button>
                    <Form 
                        method='post'
                        action={`/employee-delete/${ci}`}
                        onSubmit={ e => {
                            if(!confirm('Estas seguro de eliminar?')){
                                e.preventDefault()
                            }
                        } }
                    >
                        <button type='submit' className="bg-red-700 hover:bg-red-800 text-white px-2 py-1 rounded-sm text-sm">Eliminar</button>
                    </Form>
                    
                </div>
            </td>
        </tr>
        
    )
}

export default Employee