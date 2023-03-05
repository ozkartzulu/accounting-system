
import {useEffect, useState} from 'react'
import { Form } from '@remix-run/react'
import { generateKey, getMonthLiteral } from '~/utils/helpers'
import TableMonth from '~/components/table-month-employee'
import Error from '~/components/error'
import imageCheck from '../../public/img/check.svg'



function MonthEmployee({ci, month, errors, generalForms}){

    const [formWeek, setFormWeek] = useState(false)
    const [formWithDrawn, setFormWithDrawn] = useState(false)
    const [showTable, setShowTable] = useState(false)

    const [showError, setShowError] = useState(false)

    useEffect( () => {
        setFormWeek(false)
        setFormWithDrawn(false)
    },[generalForms] )

    if(showTable){
        let body = document.body
        body.classList.add('fix-scroll')
    }

    const showTableMonth = (e) => {
        if(e.target.classList.contains('area-rep')){
            setShowTable(true)
        } 
    }

    const getSavingMonth = () => {
        const total = month.weeks?.reduce( (total, row) => total + row.saving , 0 )
        return total
    }

    const getWithDrawn = () => {
        const total = month.withdrawn?.reduce( (total, row) => total + row.amount , 0 )
        return total
    }

    const getTotal = () => {

        const total = getSavingMonth() - getWithDrawn()
        return total
    }

    const validateFormSheets = (e) => {
        if(e.target.form.week.value && e.target.form.saving.value > 0){
            setTimeout( () => setFormWeek(false), 200 )
            setShowError(false)
        }else{
            setShowError(true)
        } 
    }

    const validateFormWithDrawn = (e) => {
        if(e.target.form.withdrawn_receipt.value && e.target.form.withdrawn_book.value && e.target.form.withdrawn_amount.value > 0){
            setTimeout( () => setFormWithDrawn(false), 200 )
            setShowError(false) 
        }else{
            setShowError(true) 
        } 
    }
    
    return (
        <div className={`area-rep month-box shadow-md p-3 text-white rounded-sm ${getSavingMonth() === 0 ? 'bg-gray-400 hover:bg-gray-500': 'bg-green-500 hover:bg-green-600'}`}
            onClick={ (e) => showTableMonth(e) }
        >
            {showTable && (
                <TableMonth weeks={month.weeks} withdrawn={month.withdrawn} setShowTable={setShowTable} />
            )}
            <div className='flex area-rep'>
                <h2 className='area-rep font-bold'>{ getMonthLiteral(month.month) } </h2>
            </div>
            <p className='area-rep'>{month.weeks?.length} Quincenas pagadas</p>
            <p className='area-rep flex border-b mb-1 pb-1'>Ahorro: {getSavingMonth()} Bs. <span className='ml-auto w-6'>{month.state_saving && <img src={imageCheck} alt="image check" />}</span></p>
            <p className='area-rep border-b mb-1 pb-1 '>Retiros: -{getWithDrawn()} Bs. </p>
            <p className='area-rep'>Total: {getTotal()} Bs.</p>
            <div className='area-rep flex relative'>
                <div>
                    <button 
                        className='bg-blue-600 text-white py-1 px-2 mr-1 font-medium rounded-sm text-sm mt-3 hover:bg-blue-700 border-none' 
                        onClick={ () => { 
                            setFormWeek(!formWeek)
                            setShowError(false)
                        } }
                    >Ahorro</button>
                    { formWeek && (
                    <Form className='flex p-3 shadow-md absolute flex-col bg-gray-300 gap-2 text-gray-700 z-50 rounded-sm w-72' noValidate method='post' >
                        { showError && <Error>{'Por favor llenar datos'}</Error>}
                        <select className='py-1.5 px-2 rounded-sm' name="week" id="week">
                            <option value="">-- Selecione Quincena --</option>
                            <option value="1">Quincena 1</option>
                            <option value="2">Quincena 2</option>
                        </select>
                        <input type="number" placeholder='Ahorro. Ej: 60' id="saving" name='saving' className='placeholder:text-gray-700 py-0.5 px-2 rounded-sm'/>
                        <input type="hidden" id="week_id" name='week_id' value={ generateKey() }/>
                        <input id='month' name='month' type="hidden" value={month.id} />
                        <input 
                            className='py-0.5 px-2 bg-blue-600 hover:bg-blue-700 text-white rounded-sm border-none cursor-pointer' 
                            type="submit" 
                            value='Crear'
                            onClick={ validateFormSheets }
                            
                        />
                    </Form>
                    )}
                </div>
                
                <div>
                    <button 
                        onClick={ () => {
                            setFormWithDrawn(!formWithDrawn)
                            setShowError(false)
                        } }
                        className='bg-blue-600 text-white py-1 px-2 font-medium rounded-sm text-sm mt-3 hover:bg-blue-700 border-none' 
                    >Retirar</button>
                    { formWithDrawn && (
                    <Form className='flex p-3 shadow-md absolute flex-col bg-gray-300 gap-2 text-gray-700 z-50 rounded-sm w-72' noValidate method='post' >
                        { showError && <Error>{'Por favor llenar datos'}</Error>}
                        <input type="number" placeholder='Monto. Ej: 100' id="withdrawn_amount" name='withdrawn_amount' 
                            className='placeholder:text-gray-700 py-0.5 px-2 rounded-sm'
                            value={getTotal() }
                            readOnly
                        />
                        <input type="number" placeholder='Nº Recibo. Ej: 5' id="withdrawn_receipt" name='withdrawn_receipt' className='placeholder:text-gray-700 py-0.5 px-2 rounded-sm'/>
                        <input type="number" placeholder='Nº Talonario. Ej: 2' id="withdrawn_book" name='withdrawn_book' className='placeholder:text-gray-700 py-0.5 px-2 rounded-sm'/>
                        <input id='withdrawn_id_month' name='withdrawn_id_month' type="hidden" value={month.id} />
                        <input type="hidden" id='id_withdrawn' name='id_withdrawn' value={generateKey()} />
                        <input 
                            className='py-0.5 px-2 bg-blue-600 hover:bg-blue-700 text-white rounded-sm border-none cursor-pointer' 
                            type="submit" 
                            value='Crear'
                            onClick={ validateFormWithDrawn }
                            disabled={getTotal() === 0 ? true : false}
                        />
                    </Form>
                    )}
                </div>
            </div>
            
            
        </div>
    )
}

export default MonthEmployee