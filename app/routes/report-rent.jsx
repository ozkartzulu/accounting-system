
import { useActionData, useLoaderData } from '@remix-run/react'
import { getAllRent, addRent } from '~/models/income.server'
import { redirect } from '@remix-run/node'
import RowData from '~/components/income/row-data-rent'
import SubMenu from '~/components/income/sub-menu-rent'

export async function loader(){
    allData = await getAllRent()
    return allData
}

export async function action({request}){

    const formData = await request.formData()
    let data = Object.fromEntries(formData)
    const errors = []
    if(Object.values(data).includes('')){
        errors.push('Todos los campos son requeridos')
    }

    // If exist a error return a error
    if(Object.keys(errors).length){
        return errors
    }
    data['date_ini'] = new Date(data.date_ini.replace(/-/g, '\/'))
    data['date_fin'] = new Date(data.date_fin.replace(/-/g, '\/'))
    data['date_pay'] = new Date(data.date_pay.replace(/-/g, '\/'))
    data['amount'] = +data.amount
    await addRent(data)

    return redirect('/report-rent')
}

function ReportRent(){

    const allData = useLoaderData()
    const errors = useActionData()

    const getTotalData = (list) => {
        const res = list?.reduce( (total, item) => total + parseInt(item.amount), 0 )
        return res
    }

    return (
        <main className='container mx-auto'>
            <h2 className='text-3xl text-indigo-900 font-bold text-center mb-5'>Reporte Alquiler de Lineas del Sindicato</h2>
            <div className='mb-4'>
                <ul>
                    <SubMenu errors={errors} >{'Agregar Alquiler'}</SubMenu>
                </ul>
            </div>
            { allData.length > 0 ?
            <div className="table-partners">
                <table className='table-rent w-full'>
                    <thead className='bg-indigo-600 text-white text-left'>
                        <tr>
                            <th className='p-2'>Mes</th>
                            <th className='p-2'>Monto</th>
                            <th className='p-2'>Fecha Inicio</th>
                            <th className='p-2'>Fecha Fin</th>
                            <th className='p-2'>Nombre Alquiler</th>
                            <th className='p-2'>Apellido Alquiler</th>
                            <th className='p-2'>Talonario</th>
                            <th className='p-2'>Recibo</th>
                        </tr>
                    </thead>
                    <tbody className='border-l border-r border-gray-300'>
                        { allData.sort( (a,b) => new Date(a.date_ini) - new Date(b.date_ini) ).map( (data, index) => (
                            <RowData data={data} key={index} />
                        ) ) }
                    </tbody>
                </table>
                <table className='table-rent w-full'>
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td className='p-2 border-l border-b font-bold uppercase bg-green-200 border-gray-300'>Total: </td>
                            <td className='border-r border-b bg-green-200 p-2 border-gray-300'>{ getTotalData(allData)} Bs.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            :
            <div className='text-xl'>No hay Ninguna registro de Alquiler de Lineas agregado aún</div>
            }
        </main>
    )
}

export default ReportRent