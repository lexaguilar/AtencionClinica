const urlReport = () => 
{
    const urlBase = process.env.NODE_ENV == "development" ? "http://lex-pc/ClinicaReportAPI" : "http://reports.clinicaflordesacuanjoche.com/";

    return {
        admisionTicket : id => `${urlBase}/admisions?id=${id}`,
        billTicket : id => `${urlBase}/bill?id=${id}`,
        billbyClient : id => `${urlBase}/bill/billByClient?id=${id}`,
        appointment : id => `${urlBase}/appointments?id=${id}`,
        testsResult : id => `${urlBase}/testservices?id=${id}`,
        print : (url) =>  window.open(`${url}`,'_blank')
    }

}



export default urlReport;