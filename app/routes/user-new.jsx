import { Form, useActionData} from '@remix-run/react'
import Formulary from '~/components/form-user'
import Error from '~/components/error'
import { redirect } from '@remix-run/node'
import { addUser, getUser } from '~/models/user.server'


export async function action({request}){

    const formData = await request.formData()
    let data = Object.fromEntries(formData)
    const errors = []
    if(Object.values(data).includes('')){
        errors.push('Todos los campos son requeridos')
    }

    // If exist a error return a error
    if(Object.keys(errors).length){
        return errors
    }

    await addUser(data)

    return redirect('/login')
}

export async function loader(){
    const user = await getUser('ocar')
    console.log(user[0])
    return null
}

function UserNew(){

    const errors = useActionData()

    return (
        <main className="social-new">
            <div className="container mx-auto">
                <h2 className="text-3xl text-indigo-900 font-bold text-center mb-5">Registro Nuevo Usuario</h2>
                <div className="form w-3/4 mx-auto shadow rounded-md py-10 px-4 bg-violet-100">
                    { errors?.length && errors.map( (error,i) => <Error key={i}>{error}</Error> ) }
                    <Form method='post' noValidate>
                        <Formulary />
                        <input type="submit" value='Registrar' className='bg-violet-600 text-white font-bold w-full rounded-sm p-3 cursor-pointer hover:bg-violet-800' />
                    </Form>
                </div>
            </div>
        </main>
    )
}

export default UserNew