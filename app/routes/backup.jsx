import {Form, useActionData} from "@remix-run/react";
import { redirect } from '@remix-run/node'
import Error from '~/components/error'
import { takeBackup, restoreBackup } from '~/models/backup.server'


export async function action({ request }){

  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  const errors = []

  if(Object.values(data).includes('')){
      errors.push('Todos los campos son requeridos')
  }

  if(Object.keys(errors).length){
      return errors
  }

  if(data.backup_name){
    await takeBackup(data.backup_name)
  }
  if(data.restore_name){
    await restoreBackup(data.restore_name)
  }

  return redirect('/')
};

  
export default function BuckUp() {

  const errors = useActionData()

  return (
    <main>
      <div className="container mx-auto mb-14">
        <h2 className="text-3xl text-indigo-900 font-bold text-center mb-5">Sacar Back Up de la Base de Datos</h2>
        <Form className="w-1/3 shadow-md p-3 rounded-sm mx-auto" method="post">
          {errors?.length > 0 && errors.map( (row, index) => <Error key={index}>{row}</Error>) }
          <input type="text" name="backup_name" id="backup_name" placeholder="Nombre de Archivo" className="mb-2 block w-full p-3 bg-gray-50"/>
          <input 
            type='submit' 
            className='bg-violet-600 text-white font-bold w-full rounded-sm p-3 cursor-pointer hover:bg-violet-800'
            value='Sacar Back up'
          />
        </Form>
      </div>
      <div className="container mx-auto">
        <h2 className="text-3xl text-indigo-900 font-bold text-center mb-5">Restaurar Base de Datos</h2>
        <form className="w-1/3 shadow-md p-3 rounded-sm mx-auto" method="post" >
          {errors?.length > 0 && errors.map( (row, index) => <Error key={index}>{row}</Error>) }
          <input type="file" name="restore_name" id="restore_name" className="mb-2 block w-full p-3 bg-gray-50"/>
          <input 
            type='submit' 
            className='bg-violet-600 text-white font-bold w-full rounded-sm p-3 cursor-pointer hover:bg-violet-800'
            value='Restaurar'
          />
        </form>
      </div>
    </main>
  )
}