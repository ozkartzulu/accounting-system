
function FormUser(){
    return (
        <>
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="username">Nombre de Usuario:</label>
                <input 
                    id="username"
                    type="text"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Humberto123"
                    name="username"
                />
            </div>
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="password">Contraseña:</label>
                <input 
                    id="password"
                    type="password"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    name="password"
                />
            </div>
        </>
    )
}

export default FormUser