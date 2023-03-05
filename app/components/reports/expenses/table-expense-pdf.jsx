
import {Document, Page, Text, View, Image, PDFViewer} from '@react-pdf/renderer'
import { fixDate, getMonthLiteral } from '~/utils/helpers'

function TableExpensePdf({ listExp }){

    const getTotalMonth = () => {
        return listExp.list.reduce( (total, row) => total + row.amount, 0 )
    }
    
    const listSort = listExp.list.sort( (a,b) => new Date(a.date) - new Date(b.date) )

    return (
        <View style={{margin: "10px 12px"}}>
            <Text style={{marginBottom: "3px", fontSize: "10px"}}>Gestión: {listExp.year}</Text>
            <Text style={{marginBottom: "6px", fontSize: "10px"}}>Mes: {getMonthLiteral(listExp.month)}</Text>
            <View >
                <View style={{}}>
                    <View style={{backgroundColor: "#E5E7EB", border: "1px solid #9CA3AF"}}>
                        <View style={{display: "flex", flexDirection: "row"}}>
                            <Text style={{padding: "4px 6px", width: "10%", fontSize: "9px"}}>Nº Tal</Text>
                            <Text style={{padding: "4px 6px", width: "10%", fontSize: "9px"}}>Nº Recibo</Text>
                            <Text style={{padding: "4px 6px", width: "11%", fontSize: "9px"}}>Fecha</Text>
                            <Text style={{padding: "4px 6px", width: "45%", fontSize: "9px"}}>Descripción</Text>
                            <Text style={{padding: "4px 6px", width: "11%", fontSize: "9px"}}>Monto</Text>
                            <Text style={{padding: "4px 6px", width: "13%", fontSize: "9px"}}>Respaldo</Text>
                        </View>
                    </View>
                    <View style={{borderLeft: "1px solid #9CA3AF", borderRight: "1px solid #9CA3AF"}}>
                        { listSort?.map( (row, index) => (
                            <View key={index} style={{ display: "flex", flexDirection: "row", borderBottom: "1px solid #9CA3AF" }}>
                                <Text style={{padding: "4px 6px", width: "10%", fontSize: "9px"}}>{row.book}</Text>
                                <Text style={{padding: "4px 6px", width: "10%", fontSize: "9px"}}>{row.receipt}</Text>
                                <Text style={{padding: "4px 6px", width: "11%", fontSize: "9px"}}>{fixDate(row.date)}</Text>
                                <Text style={{padding: "4px 6px", width: "45%", fontSize: "9px"}}>{row.description}</Text>
                                <Text style={{padding: "4px 6px", width: "11%", fontSize: "9px"}}>{ row.amount } Bs.</Text>
                                <Text style={{padding: "4px 6px", width: "13%", fontSize: "9px"}}>{ row.back } Bs.</Text>
                            </View>
                        ) ) }
                    </View>
                </View>
                <View>
                    <View style={{}}>
                        <View style={{display: "flex", flexDirection: "row"}}>
                            <Text style={{padding: "4px 6px", width: "10%", fontSize: "9px"}}></Text>
                            <Text style={{padding: "4px 6px", width: "10%", fontSize: "9px"}}></Text>
                            <Text style={{padding: "4px 6px", width: "11%", fontSize: "9px"}}></Text>
                            <Text style={{padding: "4px 6px", width: "45%", fontSize: "9px", backgroundColor: "#E5E7EB", borderBottom: "1px solid #9CA3AF", borderLeft: "1px solid #9CA3AF"}}>Total</Text>
                            <Text style={{padding: "4px 6px", width: "11%", fontSize: "9px", backgroundColor: "#E5E7EB", borderBottom: "1px solid #9CA3AF", borderRight: "1px solid #9CA3AF"}}>{ getTotalMonth() } Bs.</Text>
                            <Text style={{padding: "4px 6px", width: "13%", fontSize: "9px"}}></Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default TableExpensePdf