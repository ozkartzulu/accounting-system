
import { useLoaderData } from '@remix-run/react'
import { redirect } from '@remix-run/node'
import { useState } from 'react'
import { getEmployees, updateStatus } from '~/models/employees.server'

import User from '~/components/employee'

export async function loader(){

    const allUsers = await getEmployees()
    const usersActive = []
    const usersPassive = []

    allUsers.map( (user) => {
        if(user.status === true){
            usersActive.push(user)
        }else{
            usersPassive.push(user)
        }
    } )

    const data = {
        usersActive,
        usersPassive
    }

    return data
}

export async function action({request, params}){

    const formData = await request.formData()
    const data = Object.fromEntries(formData)

    const errors = []

    // if(Object.values(data).includes('')){
    //     errors.push('Todos los campos son requeridos')
    // }

    // if(Object.keys(errors).length){
    //     return errors
    // }

    if(data.user_ci){
        const dataSend = {
            status: (data.user_status === 'true'),
            user_ci: data.user_ci
        }

        await updateStatus(dataSend)
    }
    return redirect('/employees')
}

function Employees(){

    const partners = useLoaderData()
    const [searchTerm, setSearchTerm] = useState('')
    const [showListActive, setShowListActive] = useState(true)

    return (
        <main>
            <div className='container mx-auto'>
                <h2 className='text-3xl text-indigo-900 font-bold text-center mb-5'>Lista de Asalariados 
                    {showListActive ? ' Activos' : ' Pasivos'}
                </h2>
                <div className='flex gap-5 mb-3'>
                    <input 
                        type="text"
                        className='py-1 px-3 shadow-sm w-1/3'
                        onChange={ e => setSearchTerm(e.target.value) } 
                        placeholder="Buscar por Nombre..." 
                    />
                    <div>
                        <button 
                            onClick={ () => setShowListActive(!showListActive) }
                            className='bg-indigo-600 hover:bg-indigo-700 rounded-sm text-white py-1 px-4'
                        >{showListActive ? 'Asalariados Pasivos' : 'Asalariados Activos'}</button>
                    </div>
                </div>
                {showListActive === true ? (
                <div className="table-partners">
                    <table className='w-full'> 
                        <thead className='bg-indigo-600 text-white text-left'>
                            <tr>
                                <th className='p-2'>Nombre</th>
                                <th className='p-2'>Apellido Paterno</th>
                                <th className='p-2'>CI</th>
                                <th className='p-2'>Ahorro</th>
                                <th className='p-2'>Acciones</th>
                            </tr>
                        </thead>
                        <tbody className='border-l border-r'>
                            { partners.usersActive.filter( (partner) => {
                                if(searchTerm == ''){
                                    return partner
                                }else if( partner.name.toLowerCase().includes( searchTerm.toLowerCase() ) ){
                                    return partner
                                }
                            } ).map( partner => (
                                <User partner={partner} key={partner._id} showListActive={showListActive} />
                            ) ) }
                        </tbody>
                    </table>
                </div>
                ): (
                <div className="table-partners">
                    <table className='w-full'> 
                        <thead className='bg-indigo-600 text-white text-left'>
                            <tr>
                                <th className='p-2'>Nombre</th>
                                <th className='p-2'>Apellido Paterno</th>
                                <th className='p-2'>CI</th>
                                <th className='p-2'>Ahorro</th>
                                <th className='p-2'>Acciones</th>  
                            </tr>
                        </thead>
                        <tbody className='border-l border-r'>
                            { partners.usersPassive.filter( (partner) => {
                                if(searchTerm == ''){
                                    return partner
                                }else if( partner.name.toLowerCase().includes( searchTerm.toLowerCase() ) ){
                                    return partner
                                }
                            } ).map( partner => (
                                <User partner={partner} key={partner._id} showListActive={showListActive} />
                            ) ) }
                        </tbody>
                    </table>
                </div>
                )}
            </div>
        </main>
    )
}

export default Employees