
import { useLoaderData, Form, useActionData} from '@remix-run/react'
import { redirect} from '@remix-run/node'
import { useState } from 'react'
import { getPartner, addMonth, addWeek, addGPS, addFines, addWithDrawn, 
    updateInsured, updateFines, updateHelp, 
    addWithDrawnInsurance, addWithDrawnSaving, addChangeName, addProAccident, addProFurniture, addBasket, addBasketSaving, addBasketWithdrawn
} from '~/models/partners.server'
import RoadMap from '~/components/road_map'
import Basket from '~/components/basket'
import ButtonAddBasket from '~/components/partner/button-add-basket'
import { generateKey, currentDate } from '~/utils/helpers'
import SubMenuChangeName from '~/components/partner/sub-menu-change-name'
import SubMenuProAccident from '~/components/partner/sub-menu-pro-accident'
import SubMenuProFurniture from '~/components/partner/sub-menu-pro-furniture'

import imgFoton from '../../../public/img/foton.png'



export async function loader({params}){
    const partner = await getPartner(params.ciSocioView)
    return partner[0]
}

export async function action({request, params}){
    const formData = await request.formData()
    const data = Object.fromEntries(formData)

    const errors = {
        general: [],
        change_name: [],
        pro_accident: [],
        pro_furniture: [],
        basket: [],
        basket_saving: [],
        basket_withdrawn: [],
    }

    // if(Object.values(data).includes('')){
    //     errors.general.push('Todos los campos son requeridos')
    // }

    // if(Object.keys(errors.general).length){
    //     return errors
    // }

    if(data.week && +data.insurance > 0 && +data.saving > 0 && +data.sheets > 0){
        const sendData = {
            id: data.week_id,
            week: data.week,
            month: data.month,
            insurance: +data.insurance,
            saving: +data.saving,
            sheets: +data.sheets
        }
        await addWeek(params.ciSocioView, sendData)
    }

    if(data.id_fines && data.fines_description && +data.fines_amount > 0){
        const sendData = {
            amount: +data.fines_amount,
            description: data.fines_description,
            date: new Date(),
            id_month: data.fines_id_month,
            id_fines: data.id_fines
        }
        await addFines(params.ciSocioView, sendData)
    }

    if(data.id_withdrawn && data.withdrawn_receipt && data.withdrawn_book && +data.withdrawn_amount > 0 && data.withdrawn_type){
        if(+data.withdrawn_amount <= +data.withdrawn_type_amount){
            const sendData = {
                amount: +data.withdrawn_amount,
                type: data.withdrawn_type,
                receipt: data.withdrawn_receipt,
                book: data.withdrawn_book,
                date: new Date(),
                id_month: data.withdrawn_id_month,
                id_withdrawn: data.id_withdrawn
            }
            if(data.withdrawn_type === 'insurance'){
                await addWithDrawnInsurance(params.ciSocioView, sendData)
            }
            if(data.withdrawn_type === 'saving'){
                await addWithDrawnSaving(params.ciSocioView, sendData)
            }
        }else{
            console.log('Withdrawn unsuccessful!!!')
        }
    }

    if(data.month_id){
        const sendData = {
            id: data.month_id,
            month: new Date(data.month_year.replace(/-/g, '\/')).getMonth(),
            year: new Date(data.month_year.replace(/-/g, '\/')).getFullYear()
        }
        await addMonth(params.ciSocioView, sendData)
    }
    if(data.gps_amount){
        const sendData = {
            amount: +data.gps_amount,
            check_book: data.gps_check_book,
            receipt: data.gps_receipt,
            date: new Date(),
            id: data.gps_id
        }
        await addGPS(params.ciSocioView, sendData)
    }
    if(data.state_insured){
        await updateInsured(params.ciSocioView, data.state_insured, data.state_id_month)
    }

    // pay fines
    if(data.pay_fines_id){
        const sendData = {
            idFines: data.pay_fines_id,
            idMonth: data.pay_fines_month,
            book: data.pay_fines_book,
            receipt: data.pay_fines_receipt,
            amount: +data.pay_fines_amount,
            date: new Date()
        }
        await updateFines(params.ciSocioView, sendData)
    }

    // pay helps
    if(data.pay_help_id){
        const sendData = {
            idHelp: data.pay_help_id,
            idMonth: data.pay_help_month,
            book: data.pay_help_book,
            receipt: data.pay_help_receipt,
            amount: +data.pay_help_amount,
            date: new Date()
        }
        await updateHelp(params.ciSocioView, sendData)
    }

    // register name change for a new partner
    if(data.change_amount){
        if(Object.values(data).includes('')){
            errors['change_name'].push('Todos los campos son obligatorios')
        }
        if(Object.keys(errors.change_name).length){
            return errors
        }
        const sendData = {
            amount: +data.change_amount,
            book: data.change_book,
            receipt: data.change_receipt,
            date: new Date(data.change_date.replace(/-/g, '\/')),
        }
        await addChangeName(params.ciSocioView, sendData)
    }

    // register pro deport for a new partner
    if(data.accident_amount){
        if(Object.values(data).includes('')){
            errors.pro_accident.push('Todos los campos son obligatorios')
        }
        if(Object.keys(errors.pro_accident).length){
            return errors
        }
        const sendData = {
            amount: +data.accident_amount,
            book: data.accident_book,
            receipt: data.accident_receipt,
            date: new Date(data.accident_date.replace(/-/g, '\/')),
        }
        await addProAccident(params.ciSocioView, sendData)
    }

    // register pro furniture for a new partner
    if(data.furniture_amount){
        if(Object.values(data).includes('')){
            errors.pro_furniture.push('Todos los campos son obligatorios')
        }
        if(Object.keys(errors.pro_furniture).length){
            return errors
        }
        const sendData = {
            amount: +data.furniture_amount,
            book: data.furniture_book,
            receipt: data.furniture_receipt,
            date: new Date(data.furniture_date.replace(/-/g, '\/')),
        }
        await addProFurniture(params.ciSocioView, sendData)
    }

    // register a basket for a partner
    if(data.basket_year){
        if(+data.basket_year < 2023 || +data.basket_year > 2099){
            errors['basket'].push('Ingrese un año entre 2023 y 2100')
            return errors
        }
        const sendData = {
            id: generateKey(),
            year: data.basket_year,
        }
        await addBasket(params.ciSocioView, sendData)
    }

    // register a basket list for a partner
    if(data.basket_saving_id){
        if(Object.values(data).includes('')){
            errors.basket_saving.push('Todos los campos son obligatorios')
        }
        if(Object.keys(errors.basket_saving).length){
            return errors
        }
        const sendData = {
            id: generateKey(),
            basket_id: data.basket_saving_id,
            month: new Date(data.basket_saving_month.replace(/-/g, '\/')).getMonth(),
            saving: +data.basket_saving_amount,
            book: data.basket_saving_book,
            receipt: data.basket_saving_receipt,
            date: new Date()
        }
        await addBasketSaving(params.ciSocioView, sendData)
    }

    // register a basket withdrawn for a partner
    if(data.basket_withdrawn_id){
        if(Object.values(data).includes('')){
            errors.basket_withdrawn.push('Todos los campos son obligatorios')
        }
        if(Object.keys(errors.basket_withdrawn).length){
            return errors
        }
        const sendData = {
            id: generateKey(),
            basket_id: data.basket_withdrawn_id,
            amount: +data.basket_withdrawn_amount,
            book: data.basket_withdrawn_book,
            receipt: data.basket_withdrawn_receipt,
            date: new Date()
        }
        await addBasketWithdrawn(params.ciSocioView, sendData)
    }

    return redirect(`/socio-view/${params.ciSocioView}`)
}

function SocioView(){

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
                                    <SubMenuChangeName errors={errors?.change_name} >{'Registrar Cambio de Nombre'}</SubMenuChangeName>
                                    <SubMenuProAccident errors={errors?.pro_accident} >{'Registrar Pro Accidente'}</SubMenuProAccident>
                                    <SubMenuProFurniture errors={errors?.pro_furniture} >{'Registrar Pro Mobiliario'}</SubMenuProFurniture>
                                </ul>
                            </nav>
                        </div>
                        <div className='area user-block'>
                            <div className='area bg-white py-6 px-10 shadow-md mb-5 grid grid-cols-2'>
                                <div className='flex flex-col justify-center'>
                                    <p className='font-black text-lg'> <span className='inline-block w-44'>Nombre: </span><span className='text-gray-500 font-bold capitalize'>{partner.name}</span></p>
                                    <p className='font-black text-lg'><span className='inline-block w-44'>Apellido Paterno: </span><span className='text-gray-500 font-bold capitalize'>{partner.first_name}</span></p>
                                    <p className='font-black text-lg'><span className='inline-block w-44'>Apellido Materno: </span><span className='text-gray-500 font-bold capitalize'>{partner.last_name}</span></p>
                                    <p className='font-black text-lg'><span className='inline-block w-44'>CI: </span><span className='text-gray-500 font-bold'>{partner.ci}</span></p>
                                    <p className='font-black text-lg'><span className='inline-block w-44'>Teléfono: </span><span className='text-gray-500 font-bold'>{partner.phone}</span></p>
                                    { partner.direction && <p className='font-black text-lg'><span className='inline-block w-44'>Dirección: </span><span className='text-gray-500 font-bold capitalize'>{partner.direction}</span></p> }
                                    {partner.change_name && 
                                        <p className='font-black text-lg'><span className='inline-block w-44'>Cambio de Nombre: </span><span className='text-gray-500 font-bold'>{partner.change_name?.amount} Bs.</span></p>
                                    }
                                    {partner.pro_accident && 
                                        <p className='font-black text-lg'><span className='inline-block w-44'>Pro Accidente: </span><span className='text-gray-500 font-bold'>{partner.pro_accident?.amount} Bs.</span></p>
                                    }
                                    {partner.pro_furniture && 
                                        <p className='font-black text-lg'><span className='inline-block w-44'>Pro Mobiliario: </span><span className='text-gray-500 font-bold'>{partner.pro_furniture?.amount} Bs.</span></p>
                                    }
                                </div>
                                <div>
                                    <img src={imgFoton} alt="Foton image" />
                                </div>
                            </div>  
                            <div className=' area bg-white py-6 px-10 shadow-md mb-5'>
                                <h3 className='mb-3 text-2xl font-black text-center'>Hojas de Ruta</h3>
                                { partner.road_map === undefined ? (
                                    <div>
                                        <p className='text-xl mb-3'>No hay ningúna hoja de Ruta cancelada</p>                    
                                    </div>
                                ) : (
                                    <div className='relative area grid grid-cols-4 gap-2 mb-4'>
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

                            <div className=' area bg-white py-6 px-10 shadow-md mb-5'>
                                <h3 className='mb-3 text-2xl font-black text-center'>Aporte Canastón</h3>
                                { partner.basket === undefined ? (
                                    <div>
                                        <p className='text-xl mb-3'>No hay ningúna Aporte de Canastón cancelada</p>                    
                                    </div>
                                ) : (
                                    <div className='relative area grid grid-cols-4 gap-2 mb-4'>
                                        {partner.basket?.map( (item, i) => <Basket 
                                            ci={partner.ci} 
                                            errors={errors}
                                            item={item}
                                            key={i}
                                            generalForms={generalForms}
                                        /> )}
                                    </div>
                                ) }

                                <ButtonAddBasket errors={errors?.basket} />
     
                            </div>
                            
                        </div>
                    </div> 
                </div>
            </div>
        </main>
    )
}

export default SocioView