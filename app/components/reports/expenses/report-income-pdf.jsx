
import {Document, Page, Text, View, Image, PDFViewer} from '@react-pdf/renderer'
import { getMonthLiteral } from '~/utils/helpers'

function ReportIncomePdf({ data, getTotal }){
    return (
        <PDFViewer style={{ width: "100%", height: "100vh"}}>
        <Document>
        <Page size='LETTER' style={{ padding: "20px 0"}}>
        <View style={{margin: "25px 12px"}}>
            <Text style={{marginBottom: "14px", textAlign: "center"}}>Reporte Ingresos</Text>
            <View >
                <View style={{}}>
                    <View style={{backgroundColor: "#E5E7EB", border: "1px solid #9CA3AF"}}>
                        <View style={{display: "flex", flexDirection: "row"}}>
                            <Text style={{padding: "4px 6px", width: "50%", fontSize: "11px"}}>Nombre Ingreso</Text>
                            <Text style={{padding: "4px 6px", width: "50%", fontSize: "11px"}}>Monto</Text>
                        </View>
                    </View>
                    <View style={{borderLeft: "1px solid #9CA3AF", borderRight: "1px solid #9CA3AF"}}>
                        { data?.map( (row, index) => (
                            <View key={index} style={{ display: "flex", flexDirection: "row", borderBottom: "1px solid #9CA3AF" }}>
                                <Text style={{padding: "4px 6px", width: "50%", fontSize: "10px"}}>{row.name}</Text>
                                <Text style={{padding: "4px 6px", width: "50%", fontSize: "10px"}}>{ row.amount } Bs.</Text>
                            </View>
                        ) ) }
                    </View>
                </View>
                <View>
                    <View style={{borderLeft: "1px solid #9CA3AF", borderRight: "1px solid #9CA3AF"}}>
                        <View style={{display: "flex", flexDirection: "row", borderBottom: "1px solid #9CA3AF"}}>
                            <Text style={{padding: "4px 6px", width: "50%", fontSize: "10px", backgroundColor: "#E5E7EB"}}>Total</Text>
                            <Text style={{padding: "4px 6px", width: "50%", fontSize: "10px", backgroundColor: "#E5E7EB"}}>{ getTotal() } Bs.</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
        </Page>
        </Document>
        </PDFViewer>
    )
}

export default ReportIncomePdf