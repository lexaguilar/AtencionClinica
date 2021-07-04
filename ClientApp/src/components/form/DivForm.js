import React from "react"


export const DivForm = ({title, required= false, children}) => {
    return(
        <div className="dx-field">
            <div className="dx-field-label" style={{ width : '30%' }}>
                {title} {required && <span className="dx-field-item-required-mark">*</span>}
            </div>
            <div className="dx-field-value" style={{ width : '70%' }}>
               {children}
            </div>
        </div>
    )
}

const style = {whiteSpace : 'break-spaces'};

export const DivFormColumns = ({title, description, required= false, children}) => {
    return(
        <div className="dx-field" style={{  borderRadius : '10px', padding:7, border :'solid 1px #e9e9e9',margin: '0 0 10px'  }}>
            <div className="dx-field-label" style={{ width : '100%', fontSize: 15, fontWeight : "bold", paddingBottom : 0, paddingTop:0 }}>
                {title} {required && <span className="dx-field-item-required-mark">*</span>}
            </div>
            <div className="dx-field-label" style={{...style, width : '100%', color: "grey", paddingBottom : 4, paddingTop:4 }}>
                {description}
            </div>
            <div className="dx-field-value" style={{ width : '100%' }}>
               {children}
            </div>
        </div>
    )
}