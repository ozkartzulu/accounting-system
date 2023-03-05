import { Form, useLoaderData} from "@remix-run/react";
import { LoaderFunction, ActionFunction, json } from '@remix-run/node'
import authenticator from "~/services/auth.server";
import { sessionStorage } from "~/services/session.server";


export async function loader({request}){

  const dataSession = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );

  const secretName = dataSession.name
  session.set('secretName', dataSession.name)
  const cookie = await sessionStorage.commitSession(session)

  return dataSession

}

export default function Index() {


  return (
    <main className="main-index w-full bg-yellow-500 flex justify-center items-center flex-col">
      <h1 className="text-6xl font-black mb-4">LINEA DE TAXI TRUFI "102"</h1>
      <p className="text-xl">Fundado el 18 de agosto de 1988</p>
      <p className="text-xl">Afiliado al Sindicato de Taxistas y Trufibusistas "14 de Septiembre"</p>
      <p className="text-xl">Oficina Parque B. Lindo Av. San Basilio y K.M. Borda</p>
      <p className="text-xl">Teléfonos: 4238220 - 4540525</p>
      <p className="">Cochabamba - Bolivia</p>
    </main>
  );
}
