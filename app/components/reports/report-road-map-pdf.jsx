
import {Document, Page, Text, View, Image, PDFViewer} from '@react-pdf/renderer'
import RowWeekPDF from '~/components/reports/row-week-pdf'

function ReportRoadMapPdf({ allWeeks, getAmountFines, getAmountWithDrawn, getSheetsTotal, getSavingTotal, getInsuranceTotal, getTotalFines, getTotalWithDrawn, getTotal }){
    return (
        <PDFViewer style={{ width: "100%", height: "100vh"}}>
        <Document>
        <Page size='A4'>
        <View style={{margin: "25px 12px"}}>
            <Text style={{marginBottom: "20px", textAlign: "center"}}>Reporte Hojas de Ruta</Text>
            <View >
                <View style={{}}>
                    <View style={{backgroundColor: "#E5E7EB", border: "1px solid #9CA3AF"}}>
                        <View style={{display: "flex", flexDirection: "row"}}>
                            <Text style={{padding: "4px 6px", width: "14.2857%", fontSize: "14px"}}>Nombre</Text>
                            <Text style={{padding: "4px 6px", width: "14.2857%", fontSize: "14px"}}>Apellido</Text>
                            <Text style={{padding: "4px 6px", width: "14.2857%", fontSize: "14px"}}>Hojas</Text>
                            <Text style={{padding: "4px 6px", width: "14.2857%", fontSize: "14px"}}>Ahorro</Text>
                            <Text style={{padding: "4px 6px", width: "14.2857%", fontSize: "14px"}}>S. Médico</Text>
                            <Text style={{padding: "4px 6px", width: "14.2857%", fontSize: "14px"}}>Multas</Text>
                            <Text style={{padding: "4px 6px", width: "14.2857%", fontSize: "14px"}}>Retiros</Text>
                        </View>
                    </View>
                    <View style={{borderLeft: "1px solid #9CA3AF", borderRight: "1px solid #9CA3AF"}}>
                        { allWeeks?.map( (row, index) => (
                            <RowWeekPDF row={row} 
                                fines={getAmountFines(row._id.ci)}
                                withdrawn={getAmountWithDrawn(row._id.ci)}
                                key={index} 
                            />
                        ) ) }
                    </View>
                </View>
                <View>
                    <View style={{borderLeft: "1px solid #9CA3AF", borderRight: "1px solid #9CA3AF"}}>
                        <View style={{display: "flex", flexDirection: "row", borderBottom: "1px solid #9CA3AF"}}>
                            <Text style={{padding: "4px 6px", width: "14.2857%", fontSize: "12px"}}></Text>
                            <Text style={{padding: "4px 6px", width: "14.2857%", fontSize: "12px", backgroundColor: "#E5E7EB"}}>SubTotal</Text>
                            <Text style={{padding: "4px 6px", width: "14.2857%", fontSize: "12px", backgroundColor: "#E5E7EB"}}>{ getSheetsTotal() } Bs.</Text>
                            <Text style={{padding: "4px 6px", width: "14.2857%", fontSize: "12px", backgroundColor: "#E5E7EB"}}>{ getSavingTotal() } Bs.</Text>
                            <Text style={{padding: "4px 6px", width: "14.2857%", fontSize: "12px", backgroundColor: "#E5E7EB"}}>{ getInsuranceTotal() } Bs.</Text>
                            <Text style={{padding: "4px 6px", width: "14.2857%", fontSize: "12px", backgroundColor: "#E5E7EB"}}>{ getTotalFines() } Bs.</Text>
                            <Text style={{padding: "4px 6px", width: "14.2857%", fontSize: "12px", backgroundColor: "#E5E7EB"}}>{ getTotalWithDrawn() } Bs.</Text>
                        </View>
                    </View>
                </View>
                <View className='table-seven w-full'>
                    <View>
                        <View style={{display: "flex", flexDirection: "row"}}>
                            <Text style={{padding: "4px 6px", width: "14.2857%", fontSize: "12px"}}></Text>
                            <Text style={{padding: "4px 6px", width: "14.2857%", fontSize: "12px"}}></Text>
                            <Text style={{padding: "4px 6px", width: "14.2857%", fontSize: "12px"}}></Text>
                            <Text style={{padding: "4px 6px", width: "14.2857%", fontSize: "12px"}}></Text>
                            <Text style={{padding: "4px 6px", width: "14.2857%", fontSize: "12px"}}></Text>
                            <Text style={{padding: "4px 6px", width: "14.2857%", fontSize: "12px", backgroundColor: "#E5E7EB", borderBottom: "1px solid #9CA3AF", borderLeft: "1px solid #9CA3AF"}}>Total: </Text>
                            <Text style={{padding: "4px 6px", width: "14.2857%", fontSize: "12px", backgroundColor: "#E5E7EB", borderBottom: "1px solid #9CA3AF", borderRight: "1px solid #9CA3AF"}}>{ getTotal() } Bs.</Text>
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

export default ReportRoadMapPdf