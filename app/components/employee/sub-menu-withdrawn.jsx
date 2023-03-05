
import {useState, useEffect} from 'react'
import { Form } from '@remix-run/react'
import Error from '~/components/error'

function SubMenuWithdrawn({children, errors, contribution}){

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
            amount: +e.target.form.withdrawn_amount.value,
            book: e.target.form.withdrawn_book.value,
            receipt: e.target.form.withdrawn_receipt.value,
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
                className='bg-indigo-600 hover:bg-indigo-700 rounded-sm text-white py-0.5 px-4'
            >{children}</button>
            { showForm && (
                <Form method='post' className='absolute bg-white rounded-sm shadow-lg py-6 px-5 w-full top-full left-0 z-40' noValidate>
                    {errors?.length && errors?.map( (row, index) =>  <Error key={index}>{row}</Error> ) }
                    <input type="number" readOnly value={contribution?.amount - contribution?.withdrawn_amount} id='withdrawn_amount' name='withdrawn_amount' className='border rounded-sm py-0.5 px-2 mb-4 w-full'/>
                    <input type="number" placeholder='Nº Talonario Ej: 1' id='withdrawn_book' name='withdrawn_book' className='border rounded-sm py-0.5 px-2 mb-4 w-full'/>
                    <input type="number" placeholder='Nº Recibo Ej: 12' id='withdrawn_receipt' name='withdrawn_receipt' className='border rounded-sm py-0.5 px-2 mb-4 w-full'/>
                    <input type="submit" value='Retirar' 
                        className='bg-indigo-600 hover:bg-indigo-700 rounded-sm text-white py-0.5 px-2 w-full cursor-pointer'
                        onClick={ handleSubmit } 
                    />
                </Form>
            ) }
        </li>
    )
}

export default SubMenuWithdrawn