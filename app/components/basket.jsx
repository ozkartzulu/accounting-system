
import {useEffect, useState} from 'react'
import { Form } from '@remix-run/react'
import { generateKey, getMonthLiteral, currentDate } from '~/utils/helpers'
import TableMonth from '~/components/table-basket'
import Error from '~/components/error'
import imageCheck from '../../public/img/check.svg'



function Basket({ci, item, errors, generalForms}){

    const [formWeek, setFormWeek] = useState(false)
    const [formWithDrawn, setFormWithDrawn] = useState(false)
    const [showTable, setShowTable] = useState(false)

    useEffect( () => {
        setFormWeek(false)
        setFormWithDrawn(false)
    },[generalForms] )

    if(showTable){
        let body = document.body
        body.classList.add('fix-scroll')
    }

    const showTableMonth = (e) => {
        if(e.target.classList.contains('area-rep')){
            setShowTable(true)
        } 
    }

    const getSavingMonth = () => {
        const total = item.list_basket?.reduce( (total, row) => total + row.saving , 0 )
        return total
    }

    const getWithDrawn = () => {
        const total = item.withdrawn?.reduce( (total, row) => total + row.amount , 0 )
        return total
    }

    const getTotal = () => {
        const total = getSavingMonth() - getWithDrawn()
        return total
    }

    const validateFormSheets = (e) => {
        const data = {
            month: e.target.form.basket_saving_month.value,
            amount: e.target.form.basket_saving_amount.value,
            book: e.target.form.basket_saving_book.value,
            receipt: e.target.form.basket_saving_receipt.value,
        }
        if(!Object.values(data).includes('')){
            setTimeout( () => setFormWeek(false), 200 )
        }
    }

    const validateFormWithDrawn = (e) => {
        const data = {
            basket_id: e.target.form.basket_withdrawn_id.value,
            amount: e.target.form.basket_withdrawn_amount.value,
            book: e.target.form.basket_withdrawn_book.value,
            receipt: e.target.form.basket_withdrawn_receipt.value,
        }
        if(!Object.values(data).includes('')){
            setTimeout( () => setFormWithDrawn(false), 200 )
        } 
    }
    
    return (
        <div className={`flex flex-col area-rep month-box shadow-md p-3 text-white rounded-sm ${getSavingMonth() === 0 ? 'bg-gray-400 hover:bg-gray-500': 'bg-green-500 hover:bg-green-600'}`}
            onClick={ (e) => showTableMonth(e) }
        >
            {showTable && (
                <TableMonth year={item.year} basket={item.list_basket} withdrawn={item.withdrawn} setShowTable={setShowTable} />
            )}
            <div className='flex area-rep'>
                <h2 className='area-rep font-bold'>{ item.year } </h2>
            </div>
            <p className='area-rep'>{item.list_basket?.length} Meses pagadas</p>
            {item.list_basket &&
                item.list_basket.map( (row, index) => <p key={index} className='area-rep'>{getMonthLiteral(row.month)}: {row.saving} Bs.</p> )
            }
            
            <p className='area-rep border-b border-t mb-1 pb-1 mt-1 pt-1 '>Retiros: - {getWithDrawn()} Bs. </p>
            <p className='area-rep'>Total: {getTotal()} Bs.</p>
            <div className='area-rep flex relative mt-auto'>
                <div>
                    <button 
                        className='bg-blue-600 text-white py-1 px-2 mr-1 font-medium rounded-sm text-sm mt-3 hover:bg-blue-700 border-none' 
                        onClick={ () => { 
                            setFormWeek(!formWeek)
                        } }
                    >Registrar</button>
                    { formWeek && (
                    <Form className='flex p-3 shadow-md absolute flex-col bg-gray-300 gap-2 text-gray-700 z-50 rounded-sm w-72' noValidate method='post' >
                        {errors?.basket_saving && errors.basket_saving.map( (row, index) =>  <Error key={index}>{row}</Error> ) }
                        <input type="month" id='basket_saving_month' name='basket_saving_month' defaultValue={currentDate()} className='placeholder:text-gray-700 py-0.5 px-2 rounded-sm' />
                        <input type="number" placeholder='Monto. Ej: 100' id="basket_saving_amount" name='basket_saving_amount' className='placeholder:text-gray-700 py-0.5 px-2 rounded-sm'/>
                        <input type="number" placeholder='Nº Talonario' id="basket_saving_book" name='basket_saving_book' className='placeholder:text-gray-700 py-0.5 px-2 rounded-sm'/>
                        <input type="number" placeholder='Nº Recibo' id="basket_saving_receipt" name='basket_saving_receipt' className='placeholder:text-gray-700 py-0.5 px-2 rounded-sm'/>
                        <input id='basket_saving_id' name='basket_saving_id' type="hidden" value={item.id} />
                        <input 
                            className='py-0.5 px-2 bg-blue-600 hover:bg-blue-700 text-white rounded-sm border-none cursor-pointer' 
                            type="submit" 
                            value='Crear'
                            onClick={ validateFormSheets }
                            
                        />
                    </Form>
                    )}
                </div>
                
                <div>
                    <button 
                        onClick={ () => {
                            setFormWithDrawn(!formWithDrawn)
                        } }
                        className='bg-blue-600 text-white py-1 px-2 font-medium rounded-sm text-sm mt-3 hover:bg-blue-700 border-none' 
                    >Retirar</button>
                    { formWithDrawn && (
                    <Form className='flex p-3 shadow-md absolute flex-col bg-gray-300 gap-2 text-gray-700 z-50 rounded-sm w-72' noValidate method='post' >
                        {errors?.basket_withdrawn && errors.basket_withdrawn.map( (row, index) =>  <Error key={index}>{row}</Error> ) }
                        <input type="number" placeholder='Monto. Ej: 100' id="basket_withdrawn_amount" name='basket_withdrawn_amount' 
                            className='placeholder:text-gray-700 py-0.5 px-2 rounded-sm'
                            value={getTotal() }
                            readOnly
                        />
                        <input type="number" placeholder='Nº Talonario. Ej: 2' id="basket_withdrawn_book" name='basket_withdrawn_book' className='placeholder:text-gray-700 py-0.5 px-2 rounded-sm'/>
                        <input type="number" placeholder='Nº Recibo. Ej: 5' id="basket_withdrawn_receipt" name='basket_withdrawn_receipt' className='placeholder:text-gray-700 py-0.5 px-2 rounded-sm'/>
                        <input id='basket_withdrawn_id' name='basket_withdrawn_id' type="hidden" value={item.id} />
                        <input 
                            className='py-0.5 px-2 bg-blue-600 hover:bg-blue-700 text-white rounded-sm border-none cursor-pointer' 
                            type="submit" 
                            value='Crear'
                            onClick={ validateFormWithDrawn }
                            disabled={getTotal() === 0 ? true : false}
                        />
                    </Form>
                    )}
                </div>
            </div>
            
            
        </div>
    )
}

export default Basket