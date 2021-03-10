import numeral from 'numeral'
import moment from 'moment'
import React from 'react'

import { tipoMovimiento, monedaSymbol } from '../data/catalogos';
import http from './http';

const currency ={
    1: 'C$',
    2: '$'
}
/**
 * returna una cadena en tipo capital
 * @param {String} string -  cadena de texto a covertir en Capital
 * @return {String} result
 */
const toCapital = string => [...string].map((c, i) => i == 0 ? c.toUpperCase() : c).join('');

/**
 * Convierte un date a ticks
 * @param {Date} date -  cadena de texto a covertir en Capital
 */
const getTicks = date => ((date.getTime() * 10000) + 621355968000000000);

export const cellRender = currencyId =>  data => formatToMoney(data.value, currencyId || data.data.currencyId); 

export const cellRenderBold = currencyId => data => cellAsBold(formatToMoney(data.value, currencyId || data.data.currencyId));

export const formatId = value => numeral(value).format('000000');

export const dataFormatId = data => formatId(data.value);

export const formatToMoney = (value, currencyId) =>`${currency[currencyId || 1]} ${numeral(value).format('0,0.00')}`;

export const customizeTextAsPercent = data => `${data.value || 0} %`

export const cellAsBold = value => <b>{value}</b>;

export const obtenerTasaCambio  = date => {

    let v = new Date(moment(date).format());
    let ticks = getTicks(v);

    return http(`rates/get/${ticks}`).asGet();

}

export const getPriceByCurrency = (currencyId, rate) => service => {
       
    let price = 0;

    if(currencyId == service.currencyId)
        price = service.price;
    else
        if(currencyId == 1)
            price = service.price * rate;
        else
            price = service.price / rate;

    return price;
     
}

const fn = fx => data => {
    return fx;
}  

export const cellDiff = data => {
    return(
        <div>
            <div className={data.data.tipo == tipoMovimiento.entrada ? 'count-entrada': 'count-salida'}>{data.data.existencias}</div>
        </div>
    )
}

export const onCellPrepared = e => {

    const cellsQuantity = ['quantity', 'quantityRequest']
        
    if (e.rowType == 'data' && e.column.allowEditing) {
        if(cellsQuantity.includes(e.column.dataField))
            e.cellElement.classList.add('quantity-text');
        if(e.column.dataField == "quantityResponse")
            e.cellElement.classList.add('quantityResponse-text');
        if(e.column.dataField == "cost")
            e.cellElement.classList.add('cost-text');
        if(e.column.dataField == "price")
            e.cellElement.classList.add('price-text');
    }

}


const months = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic']
export const getMonthName = index => months[index-1]; 
export const customizeText = data => getMonthName(data.value);

export const phonePattern = /[-\s\./0-9]*$/g;
export const phoneRules = { X: /[0-9]/ };
export { getTicks }
export default toCapital