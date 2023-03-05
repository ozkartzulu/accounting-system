
import { fixDate } from '~/utils/helpers'

function RowChangeName({row, tableName}){

    return (
        <tr className="border-b border-gray-300">
            <td className="p-2">{row.name}</td>
            <td className="p-2">{row.first_name}</td>
            <td className="p-2">{row[tableName].amount} Bs.</td>
            <td className="p-2">{ fixDate(row[tableName].date) }</td>
            <td className="p-2">{ row[tableName].book }</td>
            <td className="p-2">{ row[tableName].receipt }</td>
        </tr>
    )
}

export default RowChangeName