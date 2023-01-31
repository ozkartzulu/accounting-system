
import {useState} from 'react'
import { Form } from '@remix-run/react'
import { generateKey } from '~/utils/helpers'
import TableMonth from '~/components/table-month'
import Error from '~/components/error'


function RoadMap({ci, month}){

    const [formWeek, setFormWeek] = useState(false)
    const [insured, setInsured] = useState(month.insured)
    const [formFines, setFormFines] = useState(false)
    const [formWithDrawn, setFormWithDrawn] = useState(false)
    const [showTable, setShowTable] = useState(false)

    const [showError, setShowError] = useState(false)

    if(showTable){
        let body = document.body
        body.classList.add('fix-scroll')
    }

    const showFormWeek = () => {
        if(formWeek){
            setFormWeek(false)
            setShowError(false)
        }else{
            setFormWeek(true)
        }
    }

    const showFormFines = (e) => {
        if(formFines){
            setFormFines(false)
            setShowError(false)
        }else{
            setFormFines(true)
        }
    }

    const showFormWithDrawn = () => {
        if(formWithDrawn){
            setFormWithDrawn(false)
            setShowError(false)
        }else{
            setFormWithDrawn(true)
        }
    }

    const changeInsuredState = () => {
        if(insured == 'true'){
            setInsured('false')
        }else{
            setInsured('true')
        }
    }

    const showTableMonth = (e) => {
        if(e.target.nodeName === 'BUTTON' || e.target.nodeName === 'INPUT' || e.target.nodeName === 'SELECT'){
        }else{
            setShowTable(true)
        }
        
    }

    const getSheetsMonth = () => {
        const total = month.weeks?.reduce( (total, row) => total + row.sheets , 0 )
        return total
    }

    const getInsuranceMonth = () => {
        const total = month.weeks?.reduce( (total, row) => total + row.insurance , 0 )
        return total
    }

    const getSavingMonth = () => {
        const total = month.weeks?.reduce( (total, row) => total + row.saving , 0 )
        return total
    }

    const getFines = () => {
        const total = month.fines?.reduce( (total, row) => total + row.amount , 0 )
        return total
    }

    const getWithDrawn = () => {
        const total = month.withdrawn?.reduce( (total, row) => total + row.amount , 0 )
        return total
    }

    const getTotal = () => {
        const totalSheet = getSheetsMonth() + getInsuranceMonth() + getSavingMonth()
        const total = totalSheet - getFines() - getWithDrawn()
        return total
    }

    const getMonthLiteral = () => {
        const months = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
        const name = months[month.id]
        return name
    }

    const validateFormSheets = (e) => {
        if(e.target.form.week.value && e.target.form.insurance.value > 0 && e.target.form.saving.value > 0 && e.target.form.sheets.value > 0){
            setTimeout( () => setFormWeek(false), 300 )
            setShowError(false)
        }else{
            setShowError(true)
        } 
    }

    const validateFormFines = (e) => {
        if(e.target.form.fines_description.value && e.target.form.fines_amount.value > 0){
            setTimeout( () => setFormFines(false), 300 )
            setShowError(false)
        }else{
            setShowError(true)
        } 
    }

    const validateFormWithDrawn = (e) => {
        if(e.target.form.withdrawn_receipt.value && e.target.form.withdrawn_book.value && e.target.form.withdrawn_amount.value > 0){
            setTimeout( () => setFormWithDrawn(false), 300 )
            setShowError(false)
        }else{
            setShowError(true)
        } 
    }
    

    return (
        <div className={`month-box shadow-md p-3 text-white rounded-sm ${getSheetsMonth() === 0 ? 'bg-gray-400': 'bg-green-500'}`}
            onClick={ (e) => showTableMonth(e) }
        >
            {showTable && (
                <TableMonth weeks={month.weeks} fines={month.fines} withdrawn={month.withdrawn} setShowTable={setShowTable} />
            )}
            <div className='flex'>
                <h2 className='font-bold'>{ getMonthLiteral() } </h2>
                <Form method='post' className='ml-auto'>
                    <input type="submit" 
                        onClick={ () => changeInsuredState() }
                        value={insured == 'true' ? 'Asegurado': 'No Asegurado'} 
                        className={`${insured == 'true'?'bg-blue-600':'bg-red-500'} rounded-sm py-0.5 px-2 cursor-pointer text-sm`}
                    />
                    <input type="hidden" value={insured} id='state_insured' name='state_insured'/>
                    <input type="hidden" value={month.id} id='state_id_month' name='state_id_month'/>
                </Form>
            </div>
            <p>{month.weeks?.length} Semanas pagadas</p>
            <p>Hojas: {getSheetsMonth()} Bs.</p>
            <p>Ahorro: {getSavingMonth()} Bs.</p>
            <p>Seguro Médico: {getInsuranceMonth()} Bs.</p>
            <p>Multas: -{getFines()} Bs.</p>
            <p>Retiros: -{getWithDrawn()} Bs.</p>
            <p>Total: {getTotal()} Bs.</p>
            <div className='flex relative'>
                <div>
                    <button 
                        className='bg-blue-600 text-white py-1 px-2 mr-1 font-medium rounded-sm text-sm mt-3 hover:bg-blue-700 border-none' 
                        onClick={ () => showFormWeek() }
                    >Hoja</button>
                    { formWeek && (
                    <Form className='flex p-3 shadow-md absolute flex-col bg-gray-300 gap-2 text-gray-700 z-50 rounded-sm w-72' noValidate method='post' >
                        { showError && <Error>{'Por favor llenar datos'}</Error>}
                        <select className='py-1.5 px-2 rounded-sm' name="week" id="week">
                            <option value="">-- Selecione Semana --</option>
                            <option value="1">Semana 1</option>
                            <option value="2">Semana 2</option>
                            <option value="3">Semana 3</option>
                            <option value="4">Semana 4</option>
                            <option value="5">Semana 5</option>
                        </select>
                        <input type="number" placeholder='Seguro Médico. Ej: 20' id="insurance" name='insurance' className='placeholder:text-gray-700 py-0.5 px-2 rounded-sm'/>
                        <input type="number" placeholder='Ahorro. Ej: 60' id="saving" name='saving' className='placeholder:text-gray-700 py-0.5 px-2 rounded-sm'/>
                        <input type="number" placeholder='Hojas. Ej: 40' id="sheets" name='sheets' className='placeholder:text-gray-700 py-0.5 px-2 rounded-sm'/>
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
                        className='bg-blue-600 text-white py-1 px-2 mr-1 font-medium rounded-sm text-sm mt-3 hover:bg-blue-700 border-none' 
                        onClick={ () => showFormFines() }
                    >Multa</button>
                    { formFines && (
                    <Form className='flex p-3 shadow-md absolute flex-col bg-gray-300 gap-2 text-gray-700 z-50 rounded-sm w-72' noValidate method='post' >
                        { showError && <Error>{'Por favor llenar datos'}</Error>}
                        <input type="text" placeholder='Descripción. Ej: Falta Marcha' id="fines_description" name='fines_description' className='placeholder:text-gray-700 py-0.5 px-2 rounded-sm'/>
                        <input type="number" placeholder='Monto. Ej: 100' id="fines_amount" name='fines_amount' className='placeholder:text-gray-700 py-0.5 px-2 rounded-sm'/>
                        <input id='fines_id_month' name='fines_id_month' type="hidden" value={month.id} />
                        <input type="hidden" id='id_fines' name='id_fines' value={generateKey()} />
                        <input 
                            className='py-0.5 px-2 bg-blue-600 hover:bg-blue-700 text-white rounded-sm border-none cursor-pointer' 
                            type="submit" 
                            value='Crear'
                            onClick={ validateFormFines }
                        />
                    </Form>
                    )}
                </div>
                <div>
                    <button 
                        onClick={ () => showFormWithDrawn() }
                        className='bg-blue-600 text-white py-1 px-2 font-medium rounded-sm text-sm mt-3 hover:bg-blue-700 border-none' 
                    >Retirar</button>
                    { formWithDrawn && (
                    <Form className='flex p-3 shadow-md absolute flex-col bg-gray-300 gap-2 text-gray-700 z-50 rounded-sm w-72' noValidate method='post' >
                        { showError && <Error>{'Por favor llenar datos'}</Error>}
                        <input type="number" placeholder='Monto. Ej: 100' id="withdrawn_amount" name='withdrawn_amount' className='placeholder:text-gray-700 py-0.5 px-2 rounded-sm'/>
                        <input type="number" placeholder='Nº Recibo. Ej: 5' id="withdrawn_receipt" name='withdrawn_receipt' className='placeholder:text-gray-700 py-0.5 px-2 rounded-sm'/>
                        <input type="number" placeholder='Nº Talonario. Ej: 2' id="withdrawn_book" name='withdrawn_book' className='placeholder:text-gray-700 py-0.5 px-2 rounded-sm'/>
                        <input id='withdrawn_id_month' name='withdrawn_id_month' type="hidden" value={month.id} />
                        <input type="hidden" id='id_withdrawn' name='id_withdrawn' value={generateKey()} />
                        <input 
                            className='py-0.5 px-2 bg-blue-600 hover:bg-blue-700 text-white rounded-sm border-none cursor-pointer' 
                            type="submit" 
                            value='Crear'
                            onClick={ validateFormWithDrawn }
                        />
                    </Form>
                    )}
                </div>
            </div>
            
            
        </div>
    )
}

export default RoadMap