import { Form, useActionData, useLoaderData} from '@remix-run/react'
import Formulary from '~/components/formulary'
import Error from '~/components/error'
import { redirect } from '@remix-run/node'
import { updatePartner, getPartner } from '~/models/partners.server'

export async function loader({params}){
    const formData = await getPartner(params.ciSocio)

    return formData[0]
}

export async function action({request, params}){

    const formData = await request.formData()
    const data = Object.fromEntries(formData)
    const errors = []
    if(Object.values(data).includes('')){
        errors.push('Todos los campos son requeridos')
    }

    // If exist a error return a error
    if(Object.keys(errors).length){
        return errors
    }

    await updatePartner(data, params.ciSocio)

    return redirect('/socios')
}

function SocioEdit(){

    const errors = useActionData()
    const client = useLoaderData()

    return (
        <main className="social-new">
            <div className="container mx-auto">
                <h2 className="text-3xl text-indigo-900 font-bold text-center mb-5">Registro Nuevo Socio</h2>
                <div className="form w-3/4 mx-auto shadow rounded-md py-10 px-4 bg-violet-100">
                    { errors?.length && errors.map( (error,i) => <Error key={i}>{error}</Error> ) }
                    <Form method='post' noValidate>
                        <Formulary client={client} />
                        <input type="submit" value='Modificar' className='bg-violet-600 text-white font-bold w-full rounded-sm p-3 cursor-pointer hover:bg-violet-800' />
                    </Form>
                </div>
            </div>
        </main>
    )
}

export default SocioEdit