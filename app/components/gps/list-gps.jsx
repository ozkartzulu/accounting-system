
import { useLoaderData } from '@remix-run/react'
import { getAllGps } from '~/models/partners.server'
import GPS from '~/components/gps/gps'


export async function loader(){
    const allGps = await getAllGps()
    // console.log(allGps,'allgps')
    return allGps
}

function ListGPS({list_data}){

    const allGps = useLoaderData()
    // console.log(allGps,'allgps')

    return (
        <table className='w-full'>
            <thead className='bg-indigo-600 text-white text-left'>
                <tr>
                    <th className='p-2'>Monto</th>
                    <th className='p-2'>Fecha</th>
                    <th className='p-2'>N Talonario</th>
                    <th className='p-2'>N Recibo</th>
                </tr>
            </thead>
            <tbody className='border-l border-r'>
                { list_data.map( data => (
                    <GPS row={data} key={data.id} />
                ) ) }
            </tbody>
        </table>
    )
}

export default ListGPS