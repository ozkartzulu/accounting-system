
import { useLoaderData, Form, useActionData} from '@remix-run/react'
import { redirect} from '@remix-run/node'
import { useState } from 'react'
import { getEmployee, addMonth, addWeek, addWithDrawn, addContribution, updateContribution } from '~/models/employees.server'
import RoadMap from '~/components/month_employee'
import { generateKey, currentDate } from '~/utils/helpers'
import SubMenuDeposit from '~/components/employee/sub-menu-deposit'
import SubMenuWithdrawn from '~/components/employee/sub-menu-withdrawn'

import imgFoton from '../../../public/img/foton.png'



export async function loader({params}){
    const partner = await getEmployee(params.ciEmployee)
    return partner[0]
}

export async function action({request, params}){
    const formData = await request.formData()
    const data = Object.fromEntries(formData)

    const errors = []

    if(Object.values(data).includes('')){
        errors.push('Todos los campos son requeridos')
    }

    if(Object.keys(errors).length){
        return errors
    }

    if(data.week && +data.saving > 0){
        const sendData = {
            id: data.week_id,
            week: data.week,
            month: data.month,
            saving: +data.saving,
            date: new Date()
        }
        await addWeek(params.ciEmployee, sendData)
    }

    if(data.id_withdrawn && data.withdrawn_receipt && data.withdrawn_book && +data.withdrawn_amount > 0){
        const sendData = {
            amount: +data.withdrawn_amount,
            receipt: data.withdrawn_receipt,
            book: data.withdrawn_book,
            date: new Date(),
            id_month: data.withdrawn_id_month,
            id_withdrawn: data.id_withdrawn
        }
        await addWithDrawn(params.ciEmployee, sendData)

    }

    if(data.month_id){
        const sendData = {
            id: data.month_id,
            month: new Date(data.month_year.replace(/-/g, '\/')).getMonth(),
            year: new Date(data.month_year.replace(/-/g, '\/')).getFullYear()
        }
        await addMonth(params.ciEmployee, sendData)
    }

    if(data.deposit_amount){
        const sendData = {
            id: generateKey(),
            amount: +data.deposit_amount - 50,
            pro_deport: 50,
            date: new Date(),
        }
        await addContribution(params.ciEmployee, sendData)
    }

    if(data.withdrawn_amount){
        const sendData = {
            withdrawn_amount: +data.withdrawn_amount,
            book: data.withdrawn_book,
            receipt: data.withdrawn_receipt,
            withdrawn_date: new Date(),
        }
        await updateContribution(params.ciEmployee, sendData)
    }

    return redirect(`/employee-view/${params.ciEmployee}`)
}

function EmployeeView(){

    const partner = useLoaderData()
    const errors = useActionData()

    const [generalForms, setGeneralForms] = useState(false)
    const [formMonth, setFormMonth] = useState(false)

    return (
        <main className='partner-view area' onClick={ (e) => {
            if(e.target.classList.contains('area')){
                setGeneralForms(!generalForms)
            }
        } }>
            <div className="container mx-auto">
                <div className="">
                    <h2 className='text-3xl font-black text-center mb-5'>{`${partner.first_name} ${partner.name}` }</h2>
                    <div className='area grid_partner gap-5'>
                        <div className='area left-menu bg-gray-200 shadow-md rounded-sm py-4 px-2'>
                            <nav>
                                <ul className='menu-sticky'>
                                    <SubMenuDeposit errors={errors} > {'Registrar Depósito'} </SubMenuDeposit>
                                    <SubMenuWithdrawn errors={errors} contribution={partner.contribution} > {'Retirar Depósito'} </SubMenuWithdrawn>
                                </ul>
                            </nav>
                        </div>
                        <div className='area user-block'>
                            <div className='area bg-white py-6 px-10 shadow-md mb-5 grid grid-cols-2'>
                                <div className='flex flex-col justify-center'>
                                    <p className='font-black text-lg'> <span className='inline-block w-44'>Nombre: </span>  <span className='text-gray-500 font-bold'>{partner.name}</span></p>
                                    <p className='font-black text-lg'><span className='inline-block w-44'>Apellido Paterno: </span> <span className='text-gray-500 font-bold'>{partner.first_name}</span></p>
                                    <p className='font-black text-lg'><span className='inline-block w-44'>Apellido Materno: </span><span className='text-gray-500 font-bold'>{partner.last_name}</span></p>
                                    <p className='font-black text-lg'><span className='inline-block w-44'>CI: </span><span className='text-gray-500 font-bold'>{partner.ci}</span></p>
                                    <p className='font-black text-lg'><span className='inline-block w-44'>Teléfono: </span><span className='text-gray-500 font-bold'>{partner.phone}</span></p>
                                    <p className='font-black text-lg'><span className='inline-block w-44'>Dirección: </span><span className='text-gray-500 font-bold'>{partner.direction}</span></p>
                                    {partner.contribution?.amount && 
                                        <p className='font-black text-lg'><span className='inline-block w-44'>Depósito Inicial: </span><span className='text-gray-500 font-bold'>{partner.contribution?.amount - partner.contribution?.withdrawn_amount} Bs.</span></p>
                                    }
                                </div>
                                <div>
                                    <img src={imgFoton} alt="Foton image" />
                                </div>
                            </div>  
                            <div className=' area bg-white py-6 px-10 shadow-md mb-5'>
                                <h3 className='mb-3 text-2xl font-black text-center'>Ahorros</h3>
                                { partner.road_map === undefined ? (
                                    <div>
                                        <p>No hay ningúna depósito aún</p>                    
                                    </div>
                                ) : (
                                    <div className='area grid grid-cols-4 gap-2 mb-4'>
                                        {partner.road_map.map( (month, i) => <RoadMap 
                                            ci={partner.ci} 
                                            errors={errors}
                                            month={month} 
                                            key={i}
                                            generalForms={generalForms}
                                        /> )}
                                    </div>
                                ) }
                                <button 
                                    onClick={ () => setFormMonth(!formMonth) }
                                    className='text-white bg-blue-600 hover:bg-blue-700 rounded-sm text-sm py-1 px-4 border-none'
                                >Agregar Mes</button>
                                {formMonth && 
                                <Form className='area flex p-3 shadow-md absolute flex-col bg-gray-300 gap-2 text-gray-700 z-50 rounded-sm w-72' method='post'>
                                    <input type="hidden" value={generateKey()} id="month_id" name='month_id' />
                                    <input className='placeholder:text-gray-700 py-0.5 px-2 rounded-sm' type="month" min="2023-01" defaultValue={currentDate()} id='month_year' name='month_year'/>
                                    <input 
                                        className='text-white bg-blue-600 hover:bg-blue-700 rounded-sm text-sm py-1 px-4 cursor-pointer border-none' 
                                        type="submit" 
                                        value='Agregar Mes' 
                                        onClick={ () => setTimeout( () => setFormMonth(false),200 ) }
                                    />
                                </Form>
                                }
                            </div>
                            
                        </div>
                    </div> 
                </div>
            </div>
        </main>
    )
}

export default EmployeeView