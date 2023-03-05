
import { Form } from '@remix-run/react'
import { useState } from 'react'
import RowHelp from '~/components/row-help'
import ImgHelp from '../../public/img/help.png'
import imagClose from '../../public/img/close.svg'

function Help({helps, errors, month_id}){

    const [showList, setShowList] = useState(false)

    const getHelps = () => {
        return helps?.reduce( (total, row) => total + row.amount, 0 )
    }

    return (
        <div>
            <p className='border-b mb-1 pb-1 area-rep flex'>Ayudas: - { getHelps() } Bs.
                <img onClick={ () => setShowList(true) } className='image-edit w-5 inline-block ml-auto' src={ImgHelp}  alt="image edit" />
            </p>
            {showList &&
                <div className="popup-help shadow-lg absolute flex-col bg-gray-100 text-gray-700 z-50 rounded-sm">
                    <div><img className='ml-auto' src={imagClose} onClick={ () => setShowList(false) } alt="image close" /></div>
                    <h2 className='text-3xl text-indigo-900 font-bold text-center mb-5'>Lista de Ayudas</h2>
                    <div className="table-partners mb-8">
                        <table className='w-full'>
                            <thead className='bg-indigo-600 text-white text-left'>
                                <tr>
                                    <th className='p-2'>Fecha</th>
                                    <th className='p-2'>Monto</th>
                                    <th className='p-2'>Descripción</th>
                                    <th className='p-2 border-r border-indigo-800'>Acciones</th>
                                    <th className='p-2'>Fecha</th>
                                    <th className='p-2'>Talonario</th>
                                    <th className='p-2'>Recibo</th>
                                    <th className='p-2'>Monto</th>
                                </tr>
                            </thead>
                            <tbody className='border-l border-r border-gray-300'>
                                { helps.map( (row, index) => <RowHelp errors={errors} row={row} key={index} month_id={month_id} /> ) }
                            </tbody>
                        </table>
                    </div>
                </div>
            }
        </div>
    )
}

export default Help