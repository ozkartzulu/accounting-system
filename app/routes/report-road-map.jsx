

import { useLoaderData } from '@remix-run/react'
import { useState } from 'react'
import { getAllWeeks, getAllFines, getAllWithDrawn } from '~/models/partners.server'
import RowWeek from '~/components/reports/row-week'

export async function loader(){
    const allWeeks = await getAllWeeks()
    const allFines = await getAllFines()
    const allWithDrawn = await getAllWithDrawn()
    const data = {
        allWeeks,
        allFines,
        allWithDrawn
    }
    return data
}

function ReportRoadMap(){

    const data = useLoaderData()
    const allWeeks = data.allWeeks
    const allFines = data.allFines
    const allWithDrawn = data.allWithDrawn

    const getAmountFines = (ci) => {
        return allFines.filter( (row) => row._id.ci === ci )
    }

    const getAmountWithDrawn = (ci) => {
        return allWithDrawn.filter( (row) => row._id.ci === ci )
    }

    const getSavingTotal = () => {
        return allWeeks.reduce( (total, row) => total + row.saving, 0 )
    }
 
    const getInsuranceTotal = () => {
        return allWeeks.reduce( (total, row) => total + row.insurance, 0 )
    }
 
    const getSheetsTotal = () => {
        return allWeeks.reduce( (total, row) => total + row.sheets, 0 )
    }
 
    const getTotalFines = () => {
        return allFines.reduce( (total, row) => total + row.amount, 0 )
    }

    const getTotalWithDrawn = () => {
        return allWithDrawn.reduce( (total, row) => total + row.amount, 0 )
    }

    const getTotal = () => {
        return getSavingTotal() + getInsuranceTotal() + getSheetsTotal() - getTotalFines() - getTotalWithDrawn()
    }

    return (
        <div className='container mx-auto'>
            <h2 className='text-3xl text-indigo-900 font-bold text-center mb-5'>Reporte Hojas de Ruta de todos los Socios</h2>
            <div className="table-partners">
                <table className='table-seven w-full'>
                    <thead className='bg-indigo-600 text-white text-left'>
                        <tr>
                            <th className='p-2'>Nombre</th>
                            <th className='p-2'>Apellido Paterno</th>
                            <th className='p-2'>Hojas</th>
                            <th className='p-2'>Ahorro</th>
                            <th className='p-2'>S. Médico</th>
                            <th className='p-2'>Multas</th>
                            <th className='p-2'>Retiros</th>
                        </tr>
                    </thead>
                    <tbody className='border-l border-r border-gray-300'>
                        { allWeeks?.map( (row, index) => (
                            <RowWeek row={row} 
                                fines={getAmountFines(row._id.ci)}
                                withdrawn={getAmountWithDrawn(row._id.ci)}
                                key={index} 
                            />
                        ) ) }
                    </tbody>
                </table>
                <table className='table-seven w-full'>
                    <tbody className='border-l border-r border-gray-300'>
                        <tr className='bg-green-200 border-b border-gray-300'>
                            <td></td>
                            <td className='p-2'>SubTotal</td>
                            <td className='p-2'>{ getSheetsTotal() } Bs.</td>
                            <td className='p-2'>{ getSavingTotal() } Bs.</td>
                            <td className='p-2'>{ getInsuranceTotal() } Bs.</td>
                            <td className='p-2'>{ getTotalFines() } Bs.</td>
                            <td className='p-2'>{ getTotalWithDrawn() } Bs.</td>
                        </tr>
                        
                    </tbody>
                </table>
                <table className='table-seven w-full'>
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td className='p-2 border-l border-b font-bold uppercase bg-green-200 border-gray-300'>Total: </td>
                            <td className='border-r border-b bg-green-200 p-2 border-gray-300'>{ getTotal() } Bs.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ReportRoadMap