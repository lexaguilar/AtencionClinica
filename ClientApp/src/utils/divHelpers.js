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