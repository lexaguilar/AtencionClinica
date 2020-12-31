import { formatToMoney } from "../../utils/common"
import React from 'react';
export default function Resumen(props){
    let { title, value, monedaId } = props;
    return (
        <div style={{ display: "flex" }}>
            <div style={{ width: "85px"  }}>{title}:</div>
            <p style={{ textAlign: "right", width: "100px", marginBottom: "1px" }}>
                {formatToMoney(value, monedaId)}
            </p>
        </div>
    )
}