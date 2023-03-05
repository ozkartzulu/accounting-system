
import {useState, useEffect} from 'react'
import { Form } from '@remix-run/react'
import Error from '~/components/error'

function SubMenuChangeName({children, errors}){

    const [showForm, setShowForm] = useState(false)
    const [submit, setSubmit] = useState(0)

    // useEffect( () => {
    //     if(errors?.length){
    //         setShowForm(true)
    //     }else{
    //         if(submit !== 0){
    //             setShowForm(false)
    //         }else{
    //             setSubmit(1)
    //         }
    //     }
    // }, [errors] )

    const handleSubmit = (e) => {
        const data = {
            amount: e.target.form.change_amount.value,
            book: e.target.form.change_book.value,
            receipt: e.target.form.change_receipt.value,
            date_pay: e.target.form.change_date.value,
        }
        if(!Object.values(data).includes('')){
            setTimeout( () => setShowForm(false), 200 )
        }  
    }

    return(
        <li className='sub-menu relative mb-2'>
            <button 
                onClick={ () => {
                    setShowForm(!showForm)
                } } 
                className='bg-indigo-600 hover:bg-indigo-700 rounded-sm text-white py-0.5 px-4 '
            >{children}</button>
            { showForm && (
                <Form method='post' className='absolute bg-white rounded-sm shadow-lg py-6 px-5 w-full z-50' noValidate>
                    {errors && errors?.map( (row, index) =>  <Error key={index}>{row}</Error> ) }
                    <input type="number" placeholder='Monto Cambio de Nombre' id='change_amount' name='change_amount' className='border rounded-sm py-0.5 px-2 mb-4 w-full'/>
                    <input type="number" placeholder='Nº Talonario Ej: 1' id='change_book' name='change_book' className='border rounded-sm py-0.5 px-2 mb-4 w-full'/>
                    <input type="number" placeholder='Nº Recibo Ej: 12' id='change_receipt' name='change_receipt' className='border rounded-sm py-0.5 px-2 mb-4 w-full'/>
                    <div className='flex gap-2 '>
                        <label className='w-1/4' htmlFor="change_date">Fecha</label>
                        <input type="date" id='change_date' name='change_date' className='border rounded-sm py-0.5 px-2 mb-4 w-3/4'/>
                    </div>
                    <input type="submit" value='Registrar' 
                        className='bg-indigo-600 hover:bg-indigo-700 rounded-sm text-white py-0.5 px-2 w-full cursor-pointer'
                        onClick={ handleSubmit } 
                    />
                </Form>
            ) }
        </li>
    )
}

export default SubMenuChangeName