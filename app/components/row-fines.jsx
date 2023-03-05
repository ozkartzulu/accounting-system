
import { Form } from '@remix-run/react'
import { useState } from 'react'
import Error from '~/components/error'
import { fixDate } from '~/utils/helpers'

function RowFines({errors, row, month_id}){

    const [showForm, setShowForm] = useState(false)

    const handleSubmit = (e) => {
        const data = {
            amount: e.target.form.pay_fines_book.value,
            book: e.target.form.pay_fines_receipt.value,
        }
        if(!Object.values(data).includes('')){
            setTimeout( () => setShowForm(false), 200 )
        }  
    }

    return (
        <tr className="border-b border-gray-300">
            <td className="p-2">{ fixDate(row.date) }</td>
            <td className="p-2">{row.description}</td>
            <td className="p-2">{row.amount} Bs.</td>
            <td className="p-2 border-r border-gray-300">
                <div className="flex gap-2 items-center relative">
                    <button 
                        className="bg-yellow-600 text-white px-2 py-1 rounded-sm text-sm"
                        onClick={ () => setShowForm(!showForm) }
                    >Pagar Multa</button>
                    { showForm && 
                    <Form className='flex p-3 shadow-md absolute top-full flex-col bg-gray-300 gap-2 text-gray-700 z-50 rounded-sm w-72' noValidate method='post' >
                        { errors?.length && errors.map( (row, index) => <Error key={index}>{row}</Error> ) }
                        <input type="number" placeholder='Nº Talonario Ej: 2' id="pay_fines_book" name='pay_fines_book' className='placeholder:text-gray-700 py-0.5 px-2 rounded-sm'/>
                        <input type="number" placeholder='Nº Recibo. Ej: 12' id="pay_fines_receipt" name='pay_fines_receipt' className='placeholder:text-gray-700 py-0.5 px-2 rounded-sm'/>
                        <input type="number" value={row.amount} id="pay_fines_amount" name='pay_fines_amount' readOnly className='placeholder:text-gray-700 py-0.5 px-2 rounded-sm'/>
                        <input type="hidden" id="pay_fines_id" name='pay_fines_id' value={ row.id }/>
                        <input id='pay_fines_month' name='pay_fines_month' type="hidden" value={month_id} />
                        <input 
                            className='py-0.5 px-2 bg-blue-600 hover:bg-blue-700 text-white rounded-sm border-none cursor-pointer' 
                            type="submit" 
                            value='Cancelar Multa'
                            onClick={ handleSubmit }  
                        />
                    </Form>
                    }
                </div>
            </td>
            <td className="p-2">{fixDate(row?.date_pay)}</td>
            <td className="p-2">{row?.book}</td>
            <td className="p-2">{row?.receipt}</td>
            <td className="p-2">{row?.amount_pay} Bs.</td>
        </tr>
    )
}

export default RowFines