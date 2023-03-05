
import {useState, useEffect} from 'react'
import { Form } from '@remix-run/react'
import Error from '~/components/error'

function SubMenuDeposit({children, errors}){

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
        if(+e.target.form.deposit_amount.value){
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
                <Form method='post' className='absolute bg-white rounded-sm shadow-lg py-6 px-5 w-full top-full left-0 z-50' noValidate>
                    {errors?.length && errors?.map( (row, index) =>  <Error key={index}>{row}</Error> ) }
                    <input type="number" placeholder='Monto Ej: 900' id='deposit_amount' name='deposit_amount' className='border rounded-sm py-0.5 px-2 mb-4 w-full'/>
                    <input type="submit" value='Registrar' 
                        className='bg-indigo-600 hover:bg-indigo-700 rounded-sm text-white py-0.5 px-2 w-full cursor-pointer'
                        onClick={ handleSubmit } 
                    />
                </Form>
            ) }
        </li>
    )
}

export default SubMenuDeposit