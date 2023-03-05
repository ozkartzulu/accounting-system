
import { getMonthLiteral, fixDate } from '~/utils/helpers'

function TableExpense({listExp}){

    const getTotalMonth = () => {
        return listExp.list.reduce( (total, row) => total + row.amount, 0 )
    }
    
    const listSort = listExp.list.sort( (a,b) => new Date(a.date) - new Date(b.date) )

    return (
        <>
        <h2 className='font-bold'>Gestión: { listExp.year }</h2>
        <h2 className='font-bold mb-2'>Mes: { getMonthLiteral(listExp.month) }</h2>
        <table className='table-expenses w-full'>
            <thead className='bg-indigo-600 text-white text-left'>
                <tr>
                    <th className='p-2'>Nº Talonario</th>
                    <th className='p-2'>Nº Recibo</th>
                    <th className='p-2'>Fecha</th>
                    <th className='p-2'>Descripción</th>
                    <th className='p-2'>Monto</th>
                    <th className='p-2'>Respaldo</th>
                </tr>
            </thead>
            <tbody className='border-l border-r border-gray-300'>
                { listSort.map( (row, index) => (
                    <tr key={index} className="border-b border-gray-300">
                        <td className="p-2">{row.book} </td>
                        <td className="p-2">{row.receipt}</td>
                        <td className="p-2">{fixDate(row.date)}</td>
                        <td className="p-2">{row.description }</td>
                        <td className="p-2">{row.amount } Bs.</td>
                        <td className="p-2">{row.back }</td>
                    </tr>
                ) ) }
            </tbody>
        </table>
        <table className='table-expenses w-full mb-5'>
            <tbody>
                <tr>
                    <td className='p-2'></td>
                    <td className='p-2'></td>
                    <td className='p-2'></td>
                    <td className='p-2 border-gray-300 border-l border-b font-bold bg-green-200'>Total: </td>
                    <td className='p-2 border-gray-300 border-r border-b bg-green-200'>{ getTotalMonth() } Bs.</td>
                </tr>
            </tbody>
        </table>
        </>
    )
}

export default TableExpense