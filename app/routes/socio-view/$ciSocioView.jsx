
import { useLoaderData, Form} from '@remix-run/react'
import { redirect} from '@remix-run/node'
import { useState } from 'react'
import { getPartner, addMonth, addWeek, addGPS, addFines, addWithDrawn, updateInsured } from '~/models/partners.server'
import RoadMap from '~/components/road_map'
import SubMenu from '~/components/sub_menu'
import ListGPS from '~/components/gps/list-gps'

import imgFoton from '../../../public/img/foton.png'



export async function loader({params}){
    const partner = await getPartner(params.ciSocioView)
    return partner[0]
}

export async function action({request, params}){
    // console.log(params)
    const formData = await request.formData()
    const data = Object.fromEntries(formData)
    // console.log(data.month_id, 'hello')

    if(data.week && +data.insurance > 0 && +data.saving > 0 && +data.sheets > 0){
        const sendData = {
            week: data.week,
            month: data.month,
            insurance: +data.insurance,
            saving: +data.saving,
            sheets: +data.sheets
        }
        addWeek(params.ciSocioView, sendData)
    }

    if(data.id_fines && data.fines_description && +data.fines_amount > 0){
        const sendData = {
            amount: +data.fines_amount,
            description: data.fines_description,
            date: new Date(),
            id_month: data.fines_id_month,
            id_fines: data.id_fines
        }
        addFines(params.ciSocioView, sendData)
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
        addWithDrawn(params.ciSocioView, sendData)
    }

    if(data.month_id){
        const sendData = {
            id: data.month_id
        }
        addMonth(params.ciSocioView, sendData)
    }
    if(data.gps_amount){
        const sendData = {
            amount: +data.gps_amount,
            check_book: data.gps_check_book,
            receipt: data.gps_receipt,
            date: new Date(),
            id: data.gps_id
        }
        addGPS(params.ciSocioView, sendData)
    }
    if(data.state_insured){
        updateInsured(params.ciSocioView, data.state_insured, data.state_id_month)
    }
    
    return redirect(`/socio-view/${params.ciSocioView}`)
}

function SocioView(){

    const partner = useLoaderData()

    return (
        <main className='partner-view'>
            <div className="container mx-auto">
                <div className="">
                    <h2 className='text-3xl font-black text-center mb-5'>{`${partner.first_name} ${partner.name}` }</h2>
                    <div className='grid_partner gap-5'>
                        <div className='left-menu bg-gray-200 shadow-md rounded-sm py-4 px-2'>
                            <nav>
                                <ul>
                                    <SubMenu gps={partner.gps} />
                                </ul>
                            </nav>
                        </div>
                        <div>
                            <div className='bg-white py-6 px-10 shadow-md mb-5 grid grid-cols-2'>
                                <div className='flex flex-col justify-center'>
                                    <p className='font-black text-lg'> <span className='inline-block w-44'>Nombre: </span>  <span className='text-gray-500 font-bold'>{partner.name}</span></p>
                                    <p className='font-black text-lg'><span className='inline-block w-44'>Apellido Paterno: </span> <span className='text-gray-500 font-bold'>{partner.first_name}</span></p>
                                    <p className='font-black text-lg'><span className='inline-block w-44'>Apellido Materno: </span><span className='text-gray-500 font-bold'>{partner.last_name}</span></p>
                                    <p className='font-black text-lg'><span className='inline-block w-44'>CI: </span><span className='text-gray-500 font-bold'>{partner.ci}</span></p>
                                    <p className='font-black text-lg'><span className='inline-block w-44'>Teléfono: </span><span className='text-gray-500 font-bold'>{partner.phone}</span></p>
                                    <p className='font-black text-lg'><span className='inline-block w-44'>Dirección: </span><span className='text-gray-500 font-bold'>{partner.direction}</span></p>
                                </div>
                                <div>
                                    <img src={imgFoton} alt="Foton image" />
                                </div>
                            </div>  
                            <div className=' bg-white py-6 px-10 shadow-md mb-5'>
                                <h3 className='mb-3 text-2xl font-black text-center'>Hojas de Ruta</h3>
                                { partner.road_map === undefined ? (
                                    <div>
                                        <p>No hay ningúna hoja de ruta cancelada</p>                    
                                    </div>
                                ) : (
                                    <div className='grid grid-cols-4 gap-2 mb-4'>
                                        {partner.road_map.map( (month, i) => <RoadMap 
                                            ci={partner.ci} 
                                            month={month} 
                                            key={i}
                                        /> )}
                                    </div>
                                ) }
                                
                                <Form className='form-raodmap' method='post' action={`/socio-view/${partner.ci}`} >
                                    <input type="hidden" value={partner.road_map? partner.road_map.length : 0} id="month_id" name='month_id' />
                                    <input className='text-white bg-blue-600 hover:bg-blue-700 rounded-sm text-sm py-1 px-4 cursor-pointer border-none' type="submit" value='Agregar Mes' />
                                </Form>      
                            </div>
                            { partner.gps?.length > 0 && (
                                <div className='bg-white py-6 px-10 shadow-md mb-52'>
                                    <h3 className='mb-3 text-2xl font-black text-center'>GPS</h3>
                                    <ListGPS list_data={partner.gps} />
                                </div>
                            )}
                            
                        </div>
                    </div>
                    
                    
                </div>
            </div>
        </main>
    )
}

export default SocioView