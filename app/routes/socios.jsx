
import { useLoaderData, Form, useActionData } from '@remix-run/react'
import { useState } from 'react'
import { getPartners, addHelper, setPointer, setPointerPartner } from '~/models/partners.server'
import authenticator from "~/services/auth.server";

import Socio from '~/components/socio'
import Error from '~/components/error'

export async function loader({request}){

    // const user = await authenticator.isAuthenticated(request, {
    //     failureRedirect: "/login",
    // });
    // console.log(user)
    
    const partners = await getPartners()
    return partners.sort( (a,b) => a.pointer - b.pointer  )
}

export async function action({request}){
    const formData = await request.formData()
    const data = Object.fromEntries(formData)

    const errors = []

    if(Object.values(data).includes('')){
        errors.push('Todos los campos son requeridos')
    }

    if(Object.keys(errors).length){
        return errors
    }

    if(data.help_amount){
        const sendData = {
            amount: +data.help_amount,
            description: data.help_description,
            year: new Date(data.help_date.replace(/-/g, '\/')).getFullYear(),
            month: new Date(data.help_date.replace(/-/g, '\/')).getMonth(),
            date: new Date()
        }
        await addHelper(sendData)
    }

    if(data.pointer){
        const partners = await getPartners()
        const partnerSort = partners.sort( (a,b) => a.pointer - b.pointer  )
        partnerSort.map( async (row, index) => {
            await setPointerPartner(row.ci, index + 1)
        } )
        await setPointer(partners.length)
    }

    return null
}

function Socios(){

    const partners = useLoaderData()
    const errors = useActionData()

    const [searchTerm, setSearchTerm] = useState('')
    const [helpForm, setHelpForm] = useState(false)

    const handleSubmit = (e) => {
        if(e.target.form.help_amount.value && e.target.form.help_date.value){
            setTimeout( () => setHelpForm(false), 200 )
        }
    }

    return (
        <main>
            <div className='container mx-auto'>
                <h2 className='text-3xl text-indigo-900 font-bold text-center mb-5'>Lista de Socios</h2>
                <div className='flex gap-5 mb-3'>
                    <input 
                        type="text"
                        className='py-1 px-3 shadow-sm w-1/3'
                        onChange={ e => setSearchTerm(e.target.value) } 
                        placeholder="Buscar por Nombre..." 
                    />
                    <div className='flex gap-3'>
                        <div>
                            <button 
                                onClick={ () => setHelpForm(!helpForm) }
                                className='bg-indigo-600 hover:bg-indigo-700 rounded-sm text-white py-1 px-4'
                            >Registrar Ayuda</button>
                            {helpForm && 
                            <Form className='flex p-3 shadow-md absolute flex-col bg-gray-300 gap-2 text-gray-700 z-50 rounded-sm w-72' noValidate method='post' >
                                { errors?.length && errors.map( (row, index) => <Error key={index} >{row}</Error> ) }
                                <input type="number" placeholder='Monto. Ej: 80' id="help_amount" name='help_amount' className='placeholder:text-gray-700 py-0.5 px-2 rounded-sm'/>
                                <input type="text" placeholder='Descripción...' id="help_description" name='help_description' className='placeholder:text-gray-700 py-0.5 px-2 rounded-sm'/>
                                <input type="date" id="help_date" name='help_date' className='placeholder:text-gray-700 py-0.5 px-2 rounded-sm'/>
                                <input 
                                    className='py-0.5 px-2 bg-blue-600 hover:bg-blue-700 text-white rounded-sm border-none cursor-pointer' 
                                    type="submit" 
                                    value='Crear'
                                    onClick={ handleSubmit }
                                />
                            </Form>
                            }
                        </div>
                        <div>
                            <Form method='post'>
                                <input type="hidden" id='pointer' name='pointer' value='1' />
                                <input 
                                type="submit"
                                    className='bg-indigo-600 hover:bg-indigo-700 rounded-sm text-white py-1 px-4 cursor-pointer'
                                    value="Resetear Antiguedad"
                                />
                            </Form>
                            
                        </div>
                    </div>
                </div>
                <div className="table-partners">
                    <table className='w-full'> 
                        <thead className='bg-indigo-600 text-white text-left'>
                            <tr>
                                <th className='p-2'>Ant</th>
                                <th className='p-2'>Nombre</th>
                                <th className='p-2'>Apellido Paterno</th>
                                <th className='p-2'>CI</th>
                                <th className='p-2'>Teléfono</th>
                                <th className='p-2'>Acciones</th>
                            </tr>
                        </thead>
                        <tbody className='border-l border-r'>
                            { partners?.filter( (partner) => {
                                if(searchTerm == ''){
                                    return partner
                                }else if( partner.name.toLowerCase().includes( searchTerm.toLowerCase() ) ){
                                    return partner
                                }
                            } ).map( partner => (
                                <Socio partner={partner} key={partner._id} />
                            ) ) }
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    )
}

export default Socios