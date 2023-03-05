

import {Text, View, Image} from '@react-pdf/renderer'

function RowWeekPDF({row, fines, withdrawn}){

    return (
        <View style={{
            display: "flex",
            flexDirection: "row",
            borderBottom: "1px solid #9CA3AF"
        }}>
            <Text style={{padding: "4px 6px", width: "14.2857%", fontSize: "12px"}}>{row._id.name}</Text>
            <Text style={{padding: "4px 6px", width: "14.2857%", fontSize: "12px"}}>{row._id.first_name}</Text>
            <Text style={{padding: "4px 6px", width: "14.2857%", fontSize: "12px"}}>{ row.sheets } Bs.</Text>
            <Text style={{padding: "4px 6px", width: "14.2857%", fontSize: "12px"}}>{ row.saving } Bs.</Text>
            <Text style={{padding: "4px 6px", width: "14.2857%", fontSize: "12px"}}>{ row.insurance } Bs.</Text>
            <Text style={{padding: "4px 6px", width: "14.2857%", fontSize: "12px"}}>{ fines[0].amount } Bs.</Text>
            <Text style={{padding: "4px 6px", width: "14.2857%", fontSize: "12px"}}>{ withdrawn[0].amount } Bs.</Text>
        </View>
    )
}

export default RowWeekPDF