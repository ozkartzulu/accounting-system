
import { useLoaderData } from '@remix-run/react'
import { useState } from 'react'
import { getExpenses } from '~/models/expenses.server'
import ReportExpensesTotalPdf from '../components/reports/expenses/report-expenses-total-pdf'
import { getMonthLiteral } from '~/utils/helpers'

export async function loader(){
    const matrix = []
    const expenses = await getExpenses()

    // expenses.map( (row) => console.log(row.date, 'date') )

    expenses.map( (row) => {
        if(matrix.length){
            if(matrix.some( (obj) => obj.month === row.date.getMonth() && obj.year === row.date.getFullYear() )){
                matrix.map( (exp) => {
                    if(exp.month === row.date.getMonth() && exp.year === row.date.getFullYear()){
                        exp.list.push(row)
                        exp.total = exp.total + row.amount
                    }
                } )
            }else{
                const data = {
                    month: row.date.getMonth(),
                    year: row.date.getFullYear(),
                    list: [row],
                    total: row.amount
                }
                matrix.push(data)
            }
        }else{
            const data = {
                month: row.date.getMonth(),
                year: row.date.getFullYear(),
                list: [row],
                total: row.amount
            }
            matrix.push(data)
        } 
    } )

    const matrixYear = matrix.sort( (a, b) => b.month - a.month ).sort( (a,b) => (a.year > b.year) ? 1 : -1)

    return matrixYear
}

function ReportExpensesTotal(){

    const expenses = useLoaderData()

    const [tableWeb, setTableWeb] = useState(true)
    const [tablePDF, setTablePDF] = useState(false)

    const getTotalMonth = () => {
        return expenses.reduce( (total, row) => total + row.total, 0 )
    }

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
            <main className='container mx-auto'>
            <div className="expense-total">
                <h2 className='text-3xl text-indigo-900 font-bold text-center mb-5 pt-5'>Total Egresos</h2>
                <table className='table-three w-full'>
                    <thead className='bg-indigo-600 text-white text-left'>
                        <tr>
                            <th className='p-2'>Gestión</th>
                            <th className='p-2'>Mes</th>
                            <th className='p-2'>SubTotal</th>
                        </tr>
                    </thead>
                    <tbody className='border-l border-r border-gray-300'>
                        { expenses.map( (row, index) => (
                            <tr className="border-b border-gray-300">
                                <td className="p-2">{row.year} </td>
                                <td className="p-2">{getMonthLiteral(row.month)}</td>
                                <td className="p-2">{row.total} Bs.</td>
                            </tr>
                        ) ) }
                    </tbody>
                </table>
                <table className='table-three w-full mb-5'>
                    <tbody>
                        <tr>
                            <td className='p-2'></td>
                            <td className='p-2 border-gray-300 border-l border-b font-bold bg-green-200'>Total: </td>
                            <td className='p-2 border-gray-300 border-r border-b bg-green-200'>{ getTotalMonth() } Bs.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            </main>
            } 
            { tablePDF &&
                <ReportExpensesTotalPdf 
                    expenses={expenses}
                    getTotalMonth={getTotalMonth}
                />
            }
        </>
    )
}

export default ReportExpensesTotal