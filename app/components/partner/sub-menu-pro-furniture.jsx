
import {useState, useEffect} from 'react'
import { Form } from '@remix-run/react'
import Error from '~/components/error'

function SubMenuProFurniture({children, errors}){

    const [showForm, setShowForm] = useState(false)
    const [submit, setSubmit] = useState(0)


    useEffect( () => {
        if(errors?.length){
            setShowForm(true)
        }else{
            if(submit !== 0){
                setShowForm(false)
            }else{
                setSubmit(1)
            }
        }
    }, [errors] )

    const handleSubmit = (e) => {
        const data = {
            amount: e.target.form.furniture_amount.value,
            book: e.target.form.furniture_book.value,
            receipt: e.target.form.furniture_receipt.value,
            date: e.target.form.furniture_date.value,
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
                <Form method='post' className='absolute bg-white rounded-sm shadow-lg py-6 px-5 w-full z-30' noValidate>
                    {errors && errors?.map( (row, index) =>  <Error key={index}>{row}</Error> ) }
                    <input type="number" placeholder='Monto Pro Mobiliario' id='furniture_amount' name='furniture_amount' className='border rounded-sm py-0.5 px-2 mb-4 w-full'/>
                    <input type="number" placeholder='Nº Talonario Ej: 1' id='furniture_book' name='furniture_book' className='border rounded-sm py-0.5 px-2 mb-4 w-full'/>
                    <input type="number" placeholder='Nº Recibo Ej: 12' id='furniture_receipt' name='furniture_receipt' className='border rounded-sm py-0.5 px-2 mb-4 w-full'/>
                    <div className='flex gap-2 '>
                        <label className='w-1/4' htmlFor="furniture_date">Fecha</label>
                        <input type="date" id='furniture_date' name='furniture_date' className='border rounded-sm py-0.5 px-2 mb-4 w-3/4'/>
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

export default SubMenuProFurniture