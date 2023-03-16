import { Form, useActionData} from '@remix-run/react'
import Formulary from '~/components/formulary'
import Error from '~/components/error'
import { redirect } from '@remix-run/node'
import { addPartner, getPointer, setPointer, addPointer } from '~/models/partners.server'


export async function action({request}){

    const formData = await request.formData()
    let data = Object.fromEntries(formData)
    const errors = []
    const dataValidate = {...data}
    delete dataValidate.direction

    if(Object.values(dataValidate).includes('')){
        errors.push('Todos los campos son requeridos')
    }

    // If exist a error return a error
    if(Object.keys(errors).length){
        return errors
    }

    const pointer = await getPointer()
    let pointerNum = 1

    if(pointer.length === 0){
        await addPointer({number: 1})
    }else{
        pointerNum = pointer[0].number + 1
        await setPointer(pointerNum)
    }
    data['road_map'] = []
    data['name'] = data.name.toLowerCase()
    data['first_name'] = data.first_name.toLowerCase()
    data['last_name'] = data.last_name.toLowerCase()
    data['direction'] = data.direction ? data.direction.toLowerCase() : ''
    data['pointer'] = pointerNum

    await addPartner(data)

    return redirect('/socios')
}

function SocioNew(){

    const errors = useActionData()

    return (
        <main className="social-new">
            <div className="container mx-auto">
                <h2 className="text-3xl text-indigo-900 font-bold text-center mb-5">Registro Nuevo Socio</h2>
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

export default SocioNew