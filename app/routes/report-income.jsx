
import { useLoaderData } from '@remix-run/react'
import { useState } from 'react'
import { getAllIncome, getAllRent } from '~/models/income.server'
import { getAllAir, getAllDeport, getAllGps, getAllHanging } from '~/models/partners.server'
import ReportIncomePdf from '~/components/reports/expenses/report-income-pdf'

export async function loader(){
    const allAir = await getAllAir()
    const allGps = await getAllGps()
    const allRent = await getAllRent()
    const allHanging = await getAllHanging()
    const allProDeport = await getAllDeport()
    const allIncome = await getAllIncome()

    const amountAir = allAir?.reduce( (total, data) => total + data.amount, 0 )
    const amountGps = allGps?.reduce( (total, data) => total + data.amount, 0 )
    const amountRent = allRent?.reduce( (total, data) => total + data.amount, 0 )
    const amountHanging = allHanging?.reduce( (total, data) => total + data.amount, 0 )
    const amountProDeport = allProDeport?.reduce( (total, data) => total + data.amount, 0 )
    const amountSheets = allIncome?.reduce( (total, data) => total + data.sheets, 0 )
    const amountChangeName = allIncome?.reduce( (total, data) => {
        const dataNow = data._id.change_name ? data._id.change_name.amount : 0
        return total + dataNow
    }, 0 )
    const amountProAccident = allIncome?.reduce( (total, data) => {
        const dataNow = data._id.pro_accident ? data._id.pro_accident.amount : 0
        return total + dataNow
    }, 0 )
    const amountProFurniture = allIncome?.reduce( (total, data) => {
        const dataNow = data._id.pro_furniture ? data._id.pro_furniture.amount : 0
        return total + dataNow
    }, 0 )

    const dataAmount = [
        {name: "Hojas de Ruta", amount: amountSheets},
        {name: "Aire", amount: amountAir},
        {name: "GPS", amount: amountGps},
        {name: "Alquiler Lineas", amount: amountRent},
        {name: "Colgadas Minutos", amount: amountHanging},
        {name: "Pro Deporte", amount: amountProDeport},
        {name: "Cambio de Nombre", amount: amountChangeName},
        {name: "Pro Accidente", amount: amountProAccident},
        {name: "Pro Mobiliario", amount: amountProFurniture},
    ]
    return dataAmount
}

function ReportIncome(){

    const data = useLoaderData()

    const [tableWeb, setTableWeb] = useState(true)
    const [tablePDF, setTablePDF] = useState(false)

    const getTotal = () => data.reduce( (total, row) => total + row.amount, 0 )

    return (
        <>
        <div className="view-pdf">
            <button className='text-white ml-4 font-bold' onClick={ () => {
                setTableWeb(!tableWeb)
                setTablePDF(false)
            } }>Vista Tabla</button>
            <button className='text-white ml-4 font-bold' onClick={ () => {
                setTableWeb(false)
                setTablePDF(!tablePDF)
            } }>Vista PDF</button>
        </div>
        { tableWeb && 
        <main className='container mx-auto mb-10'>
            <div className="table-partners">
                <h2 className='text-3xl text-indigo-900 font-bold text-center mb-5'>Reporte Ingresos</h2>
                <table className=' table-two w-full'>
                    <thead className='bg-indigo-600 text-white text-left'>
                        <tr>
                            <th className='p-2'>Nombre Ingreso</th>
                            <th className='p-2'>Monto</th>
                        </tr>
                    </thead>
                    <tbody className='border-l border-r border-gray-300'>
                        { data.map( (row, index) => (
                            <tr key={index} className="border-b border-gray-300">
                                <td className="p-2">{row.name} </td>
                                <td className="p-2">{row.amount} Bs.</td>
                            </tr>
                        ) ) }
                    </tbody>
                </table>
                <table className='table-two w-full mb-5'>
                    <tbody>
                        <tr>
                            <td className='p-2 border-gray-300 border-l border-b font-bold bg-green-200'>Total: </td>
                            <td className='p-2 border-gray-300 border-r border-b bg-green-200'>{getTotal()} Bs.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </main>
        }
        { tablePDF &&
            <ReportIncomePdf data={data} getTotal={getTotal} />
        }
        </>
        
    )
}

export default ReportIncome