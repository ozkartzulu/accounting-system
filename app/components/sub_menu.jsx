
import {useState} from 'react'
import { Form } from '@remix-run/react'
import Error from '~/components/error'
import { generateKey } from '~/utils/helpers'

function SubMenu({gps}){

    const [showForm, setShowForm] = useState(false)
    const [showError, setShowError] = useState(false)

    const changeStateForm = () => {
        if(showForm){
            setShowForm(false)
        }else{
            setShowForm(true)
        }
    }

    const validateForm = (e) => {
        if(e.target.form.gps_amount.value){
            setTimeout( () => setShowForm(false) ,300 )
            setShowError(false)
        }else{
            setShowError(true)
        }
    }

    return(
        <li className='sub-menu relative'>
            <button onClick={ changeStateForm } className='bg-indigo-600 hover:bg-indigo-700 rounded-sm text-white py-0.5 px-2 w-36'>GPS</button>
            { showForm && (
                <Form method='post' className='absolute bg-white rounded-sm shadow-lg py-4 px-3' noValidate>
                    {showError && <Error>{'Por favor llenar datos'}</Error>}
                    <input type="number" placeholder='Monto Ej: 30' id='gps_amount' name='gps_amount' className='border rounded-sm py-0.5 px-2 mb-3'/>
                    <input type="number" placeholder='# Talonario Ej: 1' id='gps_check_book' name='gps_check_book' className='border rounded-sm py-0.5 px-2 mb-3'/>
                    <input type="number" placeholder='# Recibo Ej: 1' id='gps_receipt' name='gps_receipt' className='border rounded-sm py-0.5 px-2 mb-3'/>
                    <input type="hidden" id='gps_id' name='gps_id' value={ generateKey() } />
                    <input type="submit" value='Crear' onClick={ validateForm } className='bg-indigo-600 hover:bg-indigo-700 rounded-sm text-white py-0.5 px-2 w-full cursor-pointer' />
                </Form>
            ) }
        </li>
    )
}

export default SubMenu