const urlReport = () => 
{
    const urlBase = process.env.NODE_ENV == "development" ? "http://lex-pc/ClinicaReportAPI" : "http://clinicalcarereports.eurekani.com";

    return {
        admisionTicket : id => `${urlBase}/admisions?id=${id}`,
        billTicket : id => `${urlBase}/bill?id=${id}`,
        appointment : id => `${urlBase}/appointments?id=${id}`,
        print : (url) =>  window.open(`${url}`,'_blank')
    }

}



export default urlReport;