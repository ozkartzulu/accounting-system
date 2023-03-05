
import { useState } from 'react'
import { Form } from '@remix-run/react'
import { currentYear } from '~/utils/helpers'
import Error from '~/components/error'

function ButtonAddBasket({errors}){

    const [showForm, setShowForm] = useState(false)

    const handleSubmit = (e) => {
        if(e.target.form.basket_year.value > 2022 && e.target.form.basket_year.value < 2100){
            setTimeout( () => setShowForm(false), 200 )
        }
    }

    return (
        <>
            <button 
                onClick={ () => setShowForm(!showForm) }
                className='text-white bg-blue-600 hover:bg-blue-700 rounded-sm text-sm py-1 px-4 border-none'
            >Agregar Gestión</button>
            {showForm && 
            <Form className='area flex p-3 shadow-md absolute flex-col bg-gray-300 gap-2 text-gray-700 z-50 rounded-sm w-72' method='post'>
                {errors && errors?.map( (row, index) =>  <Error key={index}>{row}</Error> ) }
                <input type="number" placeholder="YYYY" id='basket_year' name='basket_year' defaultValue={currentYear()} className='placeholder:text-gray-700 py-0.5 px-2 rounded-sm' />
                <input 
                    className='text-white bg-blue-600 hover:bg-blue-700 rounded-sm text-sm py-1 px-4 cursor-pointer border-none' 
                    type="submit" 
                    value='Agregar Gestión' 
                    onClick={ handleSubmit }
                />
            </Form>
            } 
        </>  
    )
}

export default ButtonAddBasket