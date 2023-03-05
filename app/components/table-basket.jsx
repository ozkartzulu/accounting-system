
import image from '../../public/img/close.svg'
import { useState, useEffect } from 'react'
import { fixDate, getMonthLiteral } from '~/utils/helpers'

function TableBasket({year, basket, withdrawn, setShowTable}){

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
       return basket?.reduce( (total, row) => total + row.saving, 0 )
    }

    const getTotal = () => {
        return getSavingTotal()
    }

    const getTotalWithDrawn = () => {
        return withdrawn?.reduce( (total, row) => total + row.amount, 0 )
    }

    return (
        <div className="table-month p-2 shadow-md bg-white w-max">
            <div><img src={image} onClick={ () => setTable(false) } alt="image close" /></div>
            <h2 className='text-3xl text-indigo-900 font-bold text-center mb-5'>Aporte Canastón Gestión {year}</h2>
            <div className="table-partners mb-8">
                <table className='table-five w-full'>
                    <thead className='bg-indigo-600 text-white text-left'>
                        <tr>
                            <th className='p-2'>Mes</th>
                            <th className='p-2'>Ahorro</th>
                            <th className='p-2'>Nº Talonario</th>
                            <th className='p-2'>Nº Recibo</th>
                            <th className='p-2'>Fecha</th>
                        </tr>
                    </thead>
                    <tbody className='border-l border-r border-gray-300'>
                        { basket.map( (row, index) => (
                            <tr key={index} className="border-b border-gray-300">
                                <td className="p-2">{getMonthLiteral(row.month)}</td>
                                <td className="p-2">{row.saving} Bs.</td>
                                <td className="p-2">{row.book} </td>
                                <td className="p-2">{row.receipt} </td>
                                <td className="p-2">{ fixDate(row.date) }</td>
                            </tr>
                        ) ) }
                    </tbody>
                </table>
                <table className='table-five w-full'>
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td className='p-2 border-l border-b font-bold uppercase bg-green-200 border-gray-300'>Total: </td>
                            <td className='border-r border-b bg-green-200 p-2 border-gray-300'>{ getSavingTotal() } Bs.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            { withdrawn?.length > 0 && (
            <div className="table-partners mb-8">
                <h2 className='text-3xl text-indigo-900 font-bold text-center mb-5'>Retiros</h2>
                <table className='table-four w-full'>
                    <thead className='bg-indigo-600 text-white text-left'>
                        <tr>
                            <th className='p-2'>Fecha</th>
                            <th className='p-2'>Monto</th>
                            <th className='p-2'>Nº Talonario</th>
                            <th className='p-2'>Nº Recibo</th>
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

        </div>
    )
}

export default TableBasket