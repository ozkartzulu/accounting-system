import {Form, useLoaderData, useActionData} from "@remix-run/react";
import { ActionFunction, json, LoaderFunction } from '@remix-run/node'
import authenticator from "~/services/auth.server";
import { sessionStorage } from "~/services/session.server";
import Error from '~/components/error'


  export async function action({request, context}){
    const resp = await authenticator.authenticate("form", request, {
      successRedirect: "/",
      failureRedirect: "/login",
      throwOnError: true,
      context,
    });

    return resp
  }

  export async function loader({request}){

    await authenticator.isAuthenticated(request, {
      successRedirect : "/"
    });
  
    const session = await sessionStorage.getSession(
      request.headers.get("Cookie")
    );
  
    const error = session.get("sessionErrorKey");

    return json({ error });
  }
  
  /**
   *
   * @returns
   */
  export default function LoginPage() {
    // if i got an error it will come back with the loader data
    const loaderData = useLoaderData();

    return (
      <main>
        <div className="container mx-auto">
          <h2 className="text-3xl text-indigo-900 font-bold text-center mb-5">Ingresar al Sistema</h2>
          <Form className="w-1/3 shadow-md p-3 rounded-sm mx-auto" method="post">
            {loaderData.error && <Error>{'Acceso Denegado'}</Error> }
            <input type="text" name="username" id="username" placeholder="Nombre de Usuario" className="mb-2 block w-full p-3 bg-gray-50"/>
            <input type="password" name="password" id="password" placeholder="Contraseña" className="mb-2 block w-full p-3 bg-gray-50"/>
            <button className='bg-violet-600 text-white font-bold w-full rounded-sm p-3 cursor-pointer hover:bg-violet-800'>Ingresar</button>
          </Form>
        </div>
      </main>
    )
  }