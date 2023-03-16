
function Formulary({client}){
    return (
        <>
            {client?.pointer &&
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="name">Antiguedad:</label>
                <input 
                    id="pointer"
                    type="number"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    name="pointer"
                    defaultValue={client.pointer}
                />
            </div> 
            }
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="name">Nombre:</label>
                <input 
                    id="name"
                    type="text"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Limber"
                    name="name"
                    defaultValue={client?.name}
                />
            </div>
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="first_name">Apellido Paterno:</label>
                <input 
                    id="first_name"
                    type="text"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Molina"
                    name="first_name"
                    defaultValue={client?.first_name}
                />
            </div>
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="last_name">Apellido Materno:</label>
                <input 
                    id="last_name"
                    type="text"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Guzman"
                    name="last_name"
                    defaultValue={client?.last_name}
                />
            </div>
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="ci">CI:</label>
                <input 
                    id="ci"
                    type="number"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="6554158"
                    name="ci"
                    defaultValue={client?.ci}
                />
            </div>

            <div className="mb-4">
                <label className="text-gray-800" htmlFor="phone">Teléfono:</label>
                <input 
                    id="phone"
                    type="number"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="77545512"
                    name="phone"
                    defaultValue={client?.phone}
                />
            </div>

            <div className="mb-4">
                <label className="text-gray-800" htmlFor="direction">Dirección:</label>
                <textarea
                    as="textarea"
                    id="direction"
                    type="text"
                    className="mt-2 block w-full p-3 bg-gray-50 h-20 align-self"
                    placeholder="Av. Simon lopez #30"
                    name="direction"
                    defaultValue={client?.direction}
                />
            </div>
        </>
    )
}

export default Formulary