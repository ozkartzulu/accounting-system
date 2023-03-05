
import {useState, useEffect} from 'react'
import { Form } from '@remix-run/react'
import Error from '~/components/error'

function SubMenu({children, errors}){

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
            amount: e.target.form.amount.value,
            book: e.target.form.book.value,
            date_ini: e.target.form.date_ini.value,
            date_fin: e.target.form.date_fin.value,
            date_pay: e.target.form.date_pay.value,
        }
        if(!Object.values(data).includes('')){
            setTimeout( () => setShowForm(false), 200 )
        }  
    }

    return(
        <li className='sub-menu relative'>
            <button 
                onClick={ () => {
                    setShowForm(!showForm)
                } } 
                className='bg-indigo-600 hover:bg-indigo-700 rounded-sm text-white py-0.5 px-4 '
            >{children}</button>
            { showForm && (
                <Form method='post' className='absolute bg-white rounded-sm shadow-lg py-6 px-5 w-1/2' noValidate>
                    {errors?.length && errors?.map( (row, index) =>  <Error key={index}>{row}</Error> ) }
                    <input type="number" placeholder='Monto Ej: 900' id='amount' name='amount' className='border rounded-sm py-0.5 px-2 mb-4 w-full'/>
                    <input type="text" placeholder='Nº Talonario Ej: del 1 al 60' id='book' name='book' className='border rounded-sm py-0.5 px-2 mb-4 w-full'/>
                    <div className='flex gap-2 '>
                        <label className='w-1/5' htmlFor="date_ini">Fecha Inicio</label>
                        <input type="date" id='date_ini' name='date_ini' className='border rounded-sm py-0.5 px-2 mb-4 w-4/5'/>
                    </div>
                    <div className='flex gap-2 '>
                        <label className='w-1/5' htmlFor="date_fin">Fecha Fin</label>
                        <input type="date" id='date_fin' name='date_fin' className='border rounded-sm py-0.5 px-2 mb-4 w-4/5'/>
                    </div>
                    <div className='flex gap-2 '>
                        <label className='w-1/5' htmlFor="date_pay">Fecha de Pago</label>
                        <input type="date" id='date_pay' name='date_pay' className='border rounded-sm py-0.5 px-2 mb-4 w-4/5'/>
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

export default SubMenu