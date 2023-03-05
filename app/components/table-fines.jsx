
import { useState, useEffect } from 'react'
import RowFines from '~/components/row-fines'
import image from '../../public/img/close.svg'

function TableFines({errors, setShowFines, fines, month_id}){

    const [table, setTable] = useState(true)

    useEffect( () => {
        if(table === false){
            setShowFines(false)
        }
    }, [table] )

    // console.log(fines)

    return (
        <div className="table-month">
            <div><img src={image} onClick={ () => setTable(false) } alt="image close" /></div>
            <h2 className='text-3xl text-indigo-900 font-bold text-center mb-5'>Lista de Multas</h2>
            <div className="table-partners mb-8">
                <table className='w-full'>
                    <thead className='bg-indigo-600 text-white text-left'>
                        <tr>
                            <th className='p-2'>Fecha</th>
                            <th className='p-2'>Descripción</th>
                            <th className='p-2'>Monto</th>
                            <th className='p-2 border-r border-indigo-800'>Acciones</th>
                            <th className='p-2'>Fecha</th>
                            <th className='p-2'>Talonario</th>
                            <th className='p-2'>Recibo</th>
                            <th className='p-2'>Monto</th>
                        </tr>
                    </thead>
                    <tbody className='border-l border-r border-gray-300'>
                        { fines.map( (row, index) => <RowFines errors={errors} row={row} key={index} month_id={month_id} /> ) }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TableFines