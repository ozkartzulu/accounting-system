
function FormEmployee({client}){
    return (
        <>
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
        </>
    )
}

export default FormEmployee