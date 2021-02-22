import { formatToMoney } from "../../utils/common"
import React from 'react';
const Resumen = ({ arr = [], currencyId }) => {

    let subtotal = 0;
    let descuento = 0;
    let iva = 0;
    let total = 0;

    const sum = property => (a,b) => (+a) + (+b[property]);

    subtotal = arr.reduce(sum('subTotal'), 0);
    descuento = arr.reduce(sum('discount'), 0);
    iva = arr.reduce(sum('iva'), 0);
    total = arr.reduce(sum('total'), 0);

    const Render = ({value, title, bold}) => {

        let result = formatToMoney(value, currencyId);

        return (<div style={{ display: "flex" }}>
                    <div style={{ width: "85px"  }}>{title}:</div>
                    <p style={{ textAlign: "right", width: "100px", marginBottom: "1px" }}>
                        {bold ? <b>{result}</b> : result}
                    </p>
                </div>)
    }
    

    return (
            <>
                <Render title="Sub Total" value={subtotal} />
                <Render title="Descuento" value={descuento} />
                <Render title="Iva" value={iva} />
                <Render title="Total" value={total} bold={true} />
            </>
    )
}


export default Resumen;