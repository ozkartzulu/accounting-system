
import { useLoaderData } from '@remix-run/react'
import { useState } from 'react'
import { getPartners } from '~/models/partners.server'

import Socio from '~/components/socio'

export async function loader(){
const res = await getPartners()
    return res
}

function Socios(){

    const partners = useLoaderData()
    const [searchTerm, setSearchTerm] = useState('')

    return (
        <main>
            <div className='container mx-auto'>
                <h2 className='text-3xl text-indigo-900 font-bold text-center mb-5'>Lista de Socios</h2>
                <div className="table-partners">
                    <input 
                        type="text"
                        className='py-1 px-3 mb-3 shadow-sm w-1/3'
                        onChange={ e => setSearchTerm(e.target.value) } 
                        placeholder="Buscar por Nombre..." 
                    />
                    <table className='w-full'> 
                        <thead className='bg-indigo-600 text-white text-left'>
                            <tr>
                                <th className='p-2'>Nombre</th>
                                <th className='p-2'>Apellido Paterno</th>
                                <th className='p-2'>CI</th>
                                <th className='p-2'>Teléfono</th>
                                <th className='p-2'>Acciones</th>
                            </tr>
                        </thead>
                        <tbody className='border-l border-r'>
                            { partners.filter( (partner) => {
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