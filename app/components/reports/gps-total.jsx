import { fixDate } from '~/utils/helpers'
import { useEffect, useState } from 'react'


function GPSTotal({gps}){

    const [total, setTotal] = useState(0)


    // setTotalGps(...totalGps, getTotalGps(partner.gps))
    // console.log('useEffect',getTotalGps(partner.gps)+'-',totalGps)

    return (
        <tr className="border-b border-gray-300">
            <td className="p-2">{gps._id.name}</td>
            <td className="p-2">{gps._id.first_name}</td>
            <td className="p-2">{ gps.amount } Bs.</td>
        </tr>
    )
}

export default GPSTotal