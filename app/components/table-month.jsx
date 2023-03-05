
import image from '../../public/img/close.svg'
import { useState, useEffect } from 'react'
import { fixDate } from '~/utils/helpers'

function TableMonth({weeks, fines, helps, withdrawn, setShowTable, insured}){

    const [table, setTable] = useState(true)

    useEffect( () => {
        if(table === false){
            setShowTable(false)
        } 
    },[table] )

    if(table === false){
        let body = document.body
        body.classList.remove('fix-scroll')
    }

    const getSavingTotal = () => {
       return weeks?.reduce( (total, row) => total + row.saving, 0 )
    }

    const getInsuranceTotal = () => {
        return weeks?.reduce( (total, row) => total + row.insurance, 0 )
    }

    const getSheetsTotal = () => {
        return weeks?.reduce( (total, row) => total + row.sheets, 0 )
    }

    const getTotal = () => {
        return getSavingTotal() + getInsuranceTotal() + getSheetsTotal()
    }

    const getTotalInsuranceSaving = () => {
        return getSavingTotal() + getInsuranceTotal()
    }

    const getTotalFines = () => {
        return fines?.reduce( (total, row) => total + row.amount, 0 )
    }

    const getTotalHelp = () => {
        return helps?.reduce( (total, row) => total + row.amount, 0 )
    }

    const getTotalWithDrawn = () => {
        return withdrawn?.reduce( (total, row) => total + row.amount, 0 )
    }

    return (
        <div className="table-month p-2 shadow-md bg-white w-max">
            <div><img src={image} onClick={ () => setTable(false) } alt="image close" /></div>
            <h2 className='text-3xl text-indigo-900 font-bold text-center mb-5'>Reporte Mensual</h2>
            <div className="table-partners mb-8">
                <table className='table-four w-full'>
                    <thead className='bg-indigo-600 text-white text-left'>
                        <tr>
                            <th className='p-2'>Nº Semana</th>
                            <th className='p-2'>Hoja</th>
                            <th className='p-2'>Ahorro</th>
                            <th className='p-2'>S. Médico</th>
                        </tr>
                    </thead>
                    <tbody className='border-l border-r border-gray-300'>
                        { weeks.map( (row, index) => (
                            <tr key={index} className="border-b border-gray-300">
                                <td className="p-2">{row.week}</td>
                                <td className="p-2">{row.sheets} Bs.</td>
                                <td className="p-2">{row.saving} Bs.</td>
                                <td className="p-2">{ row.insurance } Bs.</td>
                            </tr>
                        ) ) }
                    </tbody>
                </table>
                <table className='table-four w-full'>
                    <tbody className='border-l border-r border-gray-300'>
                        <tr className='bg-green-200 border-b border-gray-300'>
                            <td className='p-2'>SubTotal</td>
                            <td className='p-2'>{ getSheetsTotal() } Bs.</td>
                            <td className='p-2'>{ getSavingTotal() } Bs.</td>
                            <td className='p-2'>{ getInsuranceTotal() } Bs.</td>
                        </tr>
                        
                    </tbody>
                </table>
                <table className='table-four w-full'>
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td className='p-2 border-l border-b font-bold uppercase bg-green-200 border-gray-300'>Total: </td>
                            <td className='border-r border-b bg-green-200 p-2 border-gray-300'>{ getTotal() } Bs.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            { fines?.length > 0 && (
            <div className="table-partners mb-8">
                <h2 className='text-3xl text-indigo-900 font-bold text-center mb-5'>Multas</h2>
                <table className='table-three w-full'>
                    <thead className='bg-indigo-600 text-white text-left'>
                        <tr>
                            <th className='p-2'>Fecha</th>
                            <th className='p-2'>Descripción</th>
                            <th className='p-2'>Monto</th>
                        </tr>
                    </thead>
                    <tbody className='border-l border-r border-gray-300'>
                        { fines.map( (row, index) => (
                            <tr key={index} className="border-b border-gray-300">
                                <td className="p-2">{ fixDate(row.date) }</td>
                                <td className="p-2">{row.description}</td>
                                <td className="p-2">{ row.amount } Bs.</td>
                            </tr>
                        ) ) }
                    </tbody>
                </table>
                <table className='table-three w-full'>
                    <tbody>
                        <tr>
                            <td></td>
                            <td className='p-2 border-l border-b font-bold uppercase bg-green-200 border-gray-300'>Total: </td>
                            <td className='border-r border-b bg-green-200 p-2 border-gray-300'>{ getTotalFines() } Bs.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            ) }

            { helps?.length > 0 && (
            <div className="table-partners mb-8">
                <h2 className='text-3xl text-indigo-900 font-bold text-center mb-5'>Ayudas</h2>
                <table className='table-three w-full'>
                    <thead className='bg-indigo-600 text-white text-left'>
                        <tr>
                            <th className='p-2'>Fecha</th>
                            <th className='p-2'>Descripción</th>
                            <th className='p-2'>Monto</th>
                        </tr>
                    </thead>
                    <tbody className='border-l border-r border-gray-300'>
                        { helps.map( (row, index) => (
                            <tr key={index} className="border-b border-gray-300">
                                <td className="p-2">{ fixDate(row.date) }</td>
                                <td className="p-2">{row.description}</td>
                                <td className="p-2">{ row.amount } Bs.</td>
                            </tr>
                        ) ) }
                    </tbody>
                </table>
                <table className='table-three w-full'>
                    <tbody>
                        <tr>
                            <td></td>
                            <td className='p-2 border-l border-b font-bold uppercase bg-green-200 border-gray-300'>Total: </td>
                            <td className='border-r border-b bg-green-200 p-2 border-gray-300'>{ getTotalHelp() } Bs.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            ) }

            { withdrawn?.length > 0 && (
            <div className="table-partners mb-8">
                <h2 className='text-3xl text-indigo-900 font-bold text-center mb-5'>Retiros</h2>
                <table className='table-four w-full'>
                    <thead className='bg-indigo-600 text-white text-left'>
                        <tr>
                            <th className='p-2'>Fecha</th>
                            <th className='p-2'>Monto</th>
                            <th className='p-2'>Nº Recibo</th>
                            <th className='p-2'>Nº Talonario</th>
                        </tr>
                    </thead>
                    <tbody className='border-l border-r border-gray-300'>
                        { withdrawn.map( (row, index) => (
                            <tr key={index} className="border-b border-gray-300">
                                <td className="p-2">{ fixDate(row.date) }</td>
                                <td className="p-2">{row.amount} Bs.</td>
                                <td className="p-2">{ row.receipt }</td>
                                <td className="p-2">{ row.book }</td>
                            </tr>
                        ) ) }
                    </tbody>
                </table>
                <table className='table-four w-full'>
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td className='p-2 border-l border-b font-bold uppercase bg-green-200 border-gray-300'>Total: </td>
                            <td className='border-r border-b bg-green-200 p-2 border-gray-300'>{ getTotalWithDrawn() } Bs.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            ) }

            {/* Total */}
            <div className="table-partners mb-8">
                <h2 className='text-3xl text-indigo-900 font-bold text-center mb-5'>Saldo</h2>
                <table className='table-five w-full'>
                    <thead className='bg-indigo-600 text-white text-left'>
                        <tr>
                            <th className='p-2'>Ahorro + S. Médico</th>
                            <th className='p-2'>Multas</th>
                            <th className='p-2'>Retiros</th>
                            <th className='p-2'>Asegurado</th>
                            <th className='p-2'>Total</th>
                        </tr>
                    </thead>
                    <tbody className='border-l border-r border-gray-300'>
                        <tr className="border-b border-gray-300 bg-green-200">
                            <td className="p-2">{ getTotalInsuranceSaving() } Bs.</td>
                            <td className="p-2">{ getTotalFines() } Bs.</td>
                            <td className="p-2">{ getTotalWithDrawn() } Bs.</td>
                            <td className="p-2">{ insured == 'true' ? 90 : 0 } Bs.</td>
                            <td className="p-2">{ getTotalInsuranceSaving() - getTotalFines() - getTotalWithDrawn() - (insured == 'true' ? 90 : 0) } Bs.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default TableMonth