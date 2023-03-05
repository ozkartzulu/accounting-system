

import { useLoaderData } from '@remix-run/react'
import { useState } from 'react'
import { getChangeName } from '~/models/partners.server'
import RowChangeName from '~/components/reports/partner/row-change-name'
// import RowWeekPDF from '~/components/reports/row-week-pdf'

// import {Document, Page, Text, View, Image, PDFViewer} from '@react-pdf/renderer'

export async function loader(){
    const partners = await getChangeName()
    return partners
}

function ReportChangeName(){

    const [tableWeb, setTableWeb] = useState(true)
    const [tablePDF, setTablePDF] = useState(false)

    const partners = useLoaderData()

    const getTotal = () => partners.reduce( (total, row) => total + row.change_name.amount, 0 )

    return (
        <> 
        {/* <div className="view-pdf">
            <button className='text-white ml-4 font-bold' onClick={ () => {
                setTableWeb(!tableWeb)
                setTablePDF(false)
            } }>Vista Tabla</button>
            <button className='text-white ml-4 font-bold' onClick={ () => {
                setTableWeb(false)
                setTablePDF(!tablePDF)
            } }>Vista PDF</button>
        </div> */}
        { tableWeb && (
        <main className='container mx-auto'>
            <h2 className='text-3xl text-indigo-900 font-bold text-center mb-5'>Reporte Cambio de Nombre</h2>
            <div className="table-partners">
                <table className='table-seven w-full'>
                    <thead className='bg-indigo-600 text-white text-left'>
                        <tr>
                            <th className='p-2'>Nombre</th>
                            <th className='p-2'>Apellido Paterno</th>
                            <th className='p-2'>Monto</th>
                            <th className='p-2'>Fecha</th>
                            <th className='p-2'>Nº Talonario</th>
                            <th className='p-2'>Nº Recibo</th>
                        </tr>
                    </thead>
                    <tbody className='border-l border-r border-gray-300'>
                        { partners?.map( (row, index) => (
                            <RowChangeName row={row} 
                                tableName={'change_name'} 
                                key={index} 
                            />
                        ) ) }
                    </tbody>
                </table>
                <table className='table-seven w-full'>
                    <tbody>
                        <tr>
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
        </main>
        ) }

        </>
    )
}

export default ReportChangeName