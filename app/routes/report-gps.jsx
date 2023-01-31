
import { useLoaderData } from '@remix-run/react'
import { useState } from 'react'
import { getAllGps } from '~/models/partners.server'
import GPSTotal from '~/components/reports/gps-total'

export async function loader(){
    const allGps = await getAllGps()
    return allGps
}

function ReportGPS(){

    const allGps = useLoaderData()
    console.log(allGps)

    const getTotalGps = (list) => {
        const res = list?.reduce( (total, item) => total + parseInt(item.amount), 0 )
        return res
    }

    return (
        <div className='container mx-auto'>
            <h2 className='text-3xl text-indigo-900 font-bold text-center mb-5'>Reporte GPS de todos los Socios</h2>
            <div className="table-partners">
                <table className='table-fix w-full'>
                    <thead className='bg-indigo-600 text-white text-left'>
                        <tr>
                            <th className='p-2'>Nombre</th>
                            <th className='p-2'>Apellido Paterno</th>
                            <th className='p-2'>Monto GPS</th>
                        </tr>
                    </thead>
                    <tbody className='border-l border-r border-gray-300'>
                        { allGps.map( (gps, index) => (
                            <GPSTotal gps={gps} key={index} />
                        ) ) }
                    </tbody>
                </table>
                <table className='table-fix w-full'>
                    <tbody>
                        <tr>
                            <td></td>
                            <td className='p-2 border-l border-b font-bold uppercase bg-green-200 border-gray-300'>Total: </td>
                            <td className='border-r border-b bg-green-200 p-2 border-gray-300'>{ getTotalGps(allGps)} Bs.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ReportGPS