const urlReport = () => 
{
    const urlBase = process.env.NODE_ENV == "development" ? "http://lex-pc/ClinicaReportAPI" : "http://pre-reports.clinicaflordesacuanjoche.com/";

    return {
        admisionTicket : id => `${urlBase}/admisions?id=${id}`,
        billTicket : id => `${urlBase}/bill?id=${id}`,
        billbyClient : id => `${urlBase}/bill/billByClient?id=${id}`,
        appointment : id => `${urlBase}/appointments?id=${id}`,
        testsResult : id => `${urlBase}/testservices?id=${id}`,
        privateTestsResult : id => `${urlBase}/testservices/privateTest?id=${id}`,
        compra : id => `${urlBase}/movimientos/compras?id=${id}`,
        saldoincial : id => `${urlBase}/movimientos/saldoinicial?id=${id}`,
        ajusteentrada : id => `${urlBase}/movimientos/ajusteentrada?id=${id}`,
        ajustesalida : id => `${urlBase}/movimientos/ajustesalida?id=${id}`,
        requisaSolicitud : id => `${urlBase}/movimientos/requisaSolicitud?id=${id}`,
        requisaDespacho : id => `${urlBase}/movimientos/requisaDespacho?id=${id}`,
        print : (url) =>  window.open(`${url}`,'_blank')
    }

}



export default urlReport;