import { fixDate } from '~/utils/helpers'

function GPS({row}){

    return (
        <tr className="border-b">
            <td className="p-2">{row.amount}</td>
            <td className="p-2">{fixDate(row.date)}</td>
            <td className="p-2">{row.check_book}</td>
            <td className="p-2">{row.receipt}</td>
        </tr>
    )
}

export default GPS