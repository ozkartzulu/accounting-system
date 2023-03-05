import { fixDate, getMonthLiteral } from '~/utils/helpers'


function RowGPS({data}){

    return (
        <tr className="border-b border-gray-300">
            <td className="p-2">{ getMonthLiteral(new Date(data.date_ini).getMonth()) }</td>
            <td className="p-2">{data.amount} Bs.</td>
            <td className="p-2">{data.book}</td>
            <td className="p-2">{ fixDate(data.date_ini) }</td>
            <td className="p-2">{ fixDate(data.date_fin) }</td>
            <td className="p-2">{ fixDate(data.date_pay) }</td>
        </tr>
    )
}

export default RowGPS