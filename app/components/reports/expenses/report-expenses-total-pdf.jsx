
import {Document, Page, Text, View, Image, PDFViewer} from '@react-pdf/renderer'
import { getMonthLiteral } from '~/utils/helpers'

function ReportExpensesTotalPdf({ expenses, getTotalMonth }){
    return (
        <PDFViewer style={{ width: "100%", height: "100vh"}}>
        <Document>
        <Page size='LETTER' style={{ padding: "20px 0"}}>
        <View style={{margin: "25px 12px"}}>
            <Text style={{marginBottom: "14px", textAlign: "center"}}>Total Egresos</Text>
            <View >
                <View style={{}}>
                    <View style={{backgroundColor: "#E5E7EB", border: "1px solid #9CA3AF"}}>
                        <View style={{display: "flex", flexDirection: "row"}}>
                            <Text style={{padding: "4px 6px", width: "33.333%", fontSize: "11px"}}>Gestión</Text>
                            <Text style={{padding: "4px 6px", width: "33.333%", fontSize: "11px"}}>Mes</Text>
                            <Text style={{padding: "4px 6px", width: "33.333%", fontSize: "11px"}}>SubTotal</Text>
                        </View>
                    </View>
                    <View style={{borderLeft: "1px solid #9CA3AF", borderRight: "1px solid #9CA3AF"}}>
                        { expenses?.map( (row, index) => (
                            <View style={{ display: "flex", flexDirection: "row", borderBottom: "1px solid #9CA3AF" }}>
                                <Text style={{padding: "4px 6px", width: "33.333%", fontSize: "10px"}}>{row.year}</Text>
                                <Text style={{padding: "4px 6px", width: "33.333%", fontSize: "10px"}}>{getMonthLiteral(row.month)}</Text>
                                <Text style={{padding: "4px 6px", width: "33.333%", fontSize: "10px"}}>{ row.total } Bs.</Text>
                            </View>
                        ) ) }
                    </View>
                </View>
                <View>
                    <View style={{}}>
                        <View style={{display: "flex", flexDirection: "row"}}>
                            <Text style={{padding: "4px 6px", width: "33.333%", fontSize: "10px"}}></Text>
                            <Text style={{padding: "4px 6px", width: "33.333%", fontSize: "10px", backgroundColor: "#E5E7EB", borderLeft: "1px solid #9CA3AF", borderBottom: "1px solid #9CA3AF"}}>Total</Text>
                            <Text style={{padding: "4px 6px", width: "33.333%", fontSize: "10px", backgroundColor: "#E5E7EB", borderBottom: "1px solid #9CA3AF", borderRight: "1px solid #9CA3AF"}}>{ getTotalMonth() } Bs.</Text>
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

export default ReportExpensesTotalPdf