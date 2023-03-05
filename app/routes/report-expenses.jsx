
import { useLoaderData } from '@remix-run/react'
import { useState } from 'react'
import {Document, Page, Text, PDFViewer} from '@react-pdf/renderer'
import { getExpenses } from '~/models/expenses.server'
import TableExpense from '~/components/reports/expenses/table-expense'
import TableExpensePdf from '~/components/reports/expenses/table-expense-pdf'
// import TableExpenseTotal from '~/components/reports/expenses/table-expense-total'

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

function ReportExpenses(){

    const expenses = useLoaderData()

    const [tableWeb, setTableWeb] = useState(true)
    const [tablePDF, setTablePDF] = useState(false)

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
                    <h2 className='text-3xl text-indigo-900 font-bold text-center mb-5'>Reporte Egresos</h2>
                    { expenses?.map( (listExp, index) => <TableExpense listExp={listExp} key={index} /> ) }
                </div>
            </main>
            }
            { tablePDF && 
            <PDFViewer style={{ width: "100%", height: "100vh"}}>
            <Document>
            <Page size='LETTER' orientation='landscape' style={{ padding: "20px 0"}}>
            <Text style={{marginBottom: "15px", textAlign: "center", marginTop: "15px"}}>Reporte Egresos</Text>
                { expenses?.map( (listExp, index) => <TableExpensePdf listExp={listExp} key={index} /> ) }
            </Page>
            </Document>
            </PDFViewer>  
            }
            {/* <div className="expense-total">
                <h2 className='text-3xl text-indigo-900 font-bold text-center mb-5 pt-5'>Total Egresos</h2>
                {  <TableExpenseTotal expenses={expenses} />  }
            </div> */}
        </> 
    )
}

export default ReportExpenses