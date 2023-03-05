
import { Form, useActionData } from '@remix-run/react'
import { redirect } from '@remix-run/node'
import { addExpense } from '~/models/expenses.server'
import Error from '~/components/error'
import FormExpense from "~/components/form-expense"

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

    data['date'] = new Date(data.date.replace(/-/g, '\/'))
    // data['date'] = new Date(data.date)
    data['amount'] = +data.amount
    addExpense(data)

    return redirect('/report-expenses')
}

function ExpenseCreate(){

    const errors = useActionData()

    return (
    <main className="form-create">
        <div className="container mx-auto">
            <h2 className="text-3xl text-indigo-900 font-bold text-center mb-5">Registro Nuevo Egreso</h2>
            <div className="form w-3/4 mx-auto shadow rounded-md py-10 px-4 bg-violet-100">
                { errors?.length && errors.map( (error,i) => <Error key={i}>{error}</Error> ) }
                <Form method='post' noValidate>
                    <FormExpense />
                    <input type="submit" value='Registrar' className='bg-violet-600 text-white font-bold w-full rounded-sm p-3 cursor-pointer hover:bg-violet-800' />
                </Form>
            </div>
        </div>
    </main>
    )
}

export default ExpenseCreate