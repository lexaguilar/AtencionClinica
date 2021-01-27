import numeral from 'numeral'
import React from 'react'

import { tipoMovimiento, monedaSymbol } from '../data/catalogos';
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

export const cellRender = data => formatToMoney(data.value);

export const cellRenderBold = data => cellAsBold(formatToMoney(data.value));

export const formatId = value => numeral(value).format('000000');

export const formatToMoney = (value) =>`$ ${numeral(value).format('0,0.00')}` ;

export const customizeTextAsPercent = data => `${data.value || 0} %`

export const cellAsBold = value => <b>{value}</b>;

export const cellDiff = data => {
    return(
        <div>
            <div className={data.data.tipo == tipoMovimiento.entrada ? 'count-entrada': 'count-salida'}>{data.data.existencias}</div>
        </div>
    )
}

const months = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic']
export const getMonthName = index => months[index-1]; 
export const customizeText = data => getMonthName(data.value);

export const phonePattern = /[-\s\./0-9]*$/g;
export const phoneRules = { X: /[0-9]/ };
export { getTicks }
export default toCapital