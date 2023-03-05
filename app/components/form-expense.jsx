
function FormExpense({expense}){
    return (
        <>
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="name">Nº Talonario:</label>
                <input 
                    id="book"
                    type="number"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Ej: 1"
                    name="book"
                    defaultValue={expense?.book}
                />
            </div>
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="name">Nº Recibo:</label>
                <input 
                    id="receipt"
                    type="number"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Ej: 20"
                    name="receipt"
                    defaultValue={expense?.receipt}
                />
            </div>
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="name">Fecha:</label>
                <input 
                    id="date"
                    type="date"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    name="date"
                    defaultValue={expense?.date}
                />
            </div>
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="direction">Descripción:</label>
                <textarea
                    as="textarea"
                    id="description"
                    type="text"
                    className="mt-2 block w-full p-3 bg-gray-50 h-20 align-self"
                    placeholder="Compra material de escritorio"
                    name="description"
                    defaultValue={expense?.description}
                />
            </div>
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="name">Monto:</label>
                <input 
                    id="amount"
                    type="number"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Ej: 80"
                    name="amount"
                    defaultValue={expense?.amount}
                />
            </div>
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="last_name">Respaldo:</label>
                <input 
                    id="back"
                    type="text"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Factura: nº 11019"
                    name="back"
                    defaultValue={expense?.back}
                />
            </div>
        </>
    )
}

export default FormExpense