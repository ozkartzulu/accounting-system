import { fixDate, getMonthLiteral } from '~/utils/helpers'


function RowDataRent({data}){

    return (
        <tr className="border-b border-gray-300">
            <td className="p-2">{ getMonthLiteral(new Date(data.date_ini).getMonth()) }</td>
            <td className="p-2">{data.amount} Bs.</td>
            <td className="p-2">{ fixDate(data.date_ini) }</td>
            <td className="p-2">{ fixDate(data.date_fin) }</td>
            <td className="p-2">{data.tenant_name}</td>
            <td className="p-2">{data.tenant_last}</td>
            <td className="p-2">{data.book}</td>
            <td className="p-2">{data.receipt}</td>
        </tr>
    )
}

export default RowDataRent