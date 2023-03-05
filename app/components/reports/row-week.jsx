
function RowWeek({row, fines, withdrawn}){

    return (
        <tr className="border-b border-gray-300">
            <td className="p-2">{row._id.name}</td>
            <td className="p-2">{row._id.first_name}</td>
            <td className="p-2">{ row.sheets } Bs.</td>
            <td className="p-2">{ row.saving } Bs.</td>
            <td className="p-2">{ row.insurance } Bs.</td>

            <td className="p-2">{ fines[0].amount } Bs.</td>
            <td className="p-2">{ withdrawn[0].amount } Bs.</td>
        </tr>
    )
}

export default RowWeek