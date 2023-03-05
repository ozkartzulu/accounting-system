import { fixDate, getMonthLiteral } from '~/utils/helpers'


function RowDataChangeName({data}){

    return (
        <tr className="border-b border-gray-300">
            <td className="p-2">{data.amount} Bs.</td>
            <td className="p-2">{ fixDate(data.date) }</td>
            <td className="p-2">{data.book}</td>
            <td className="p-2">{data.receipt}</td>
        </tr>
    )
}

export default RowDataChangeName