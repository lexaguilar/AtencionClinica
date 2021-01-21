import numeral from 'numeral'
import React from 'react'
import moment from 'moment'

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

const getMonthAndYear = date => [date.getMonth(), date.getFullYear()];

/**
 * returna una cadena en tipo capital
 * @param {Date} date -  fecha
 * @param {Boolean} exact - 
 * @return {Number} week
 */
export const getWeekOfMonth = function(date, exact = false) {
        const [ month, year ] = getMonthAndYear(date);
        let  firstWeekday = new Date(year, month, 1).getDay()
        , lastDateOfMonth = new Date(year, month + 1, 0).getDate()
        , offsetDate = date.getDate() + firstWeekday - 1
        , index = 1 // start index at 0 or 1, your choice
        , weeksInMonth = index + Math.ceil((lastDateOfMonth + firstWeekday - 7) / 7)
        , week = index + Math.floor(offsetDate / 7)
    ;
    if (exact || week < 2 + index) return week;
    return week === weeksInMonth ? index + 5 : week;
};

export const getWeeksOfMonth = date =>{

    let weeks = [];
    let [ month, year ] = getMonthAndYear(date);
    let initDate = new Date(year, month, 1, 0, 0, 0, 0);

    let nextMonth = (month + 1);

    while (month < nextMonth) {
        weeks.push(getWeekOfMonth(initDate));
        initDate = moment(initDate).add(1, 'd').toDate();
        month =  initDate.getMonth();
    }

    return [...new Set(weeks)]

}



export const getDayInLastWeek =(date, day) => {
    const [ month, year ] = getMonthAndYear(date);

    let lastDateOfMonth = new Date(year, month + 1, 0);
    let week = 0;

    let found = false;
    let maxDayCount = 31;
    while (!found) {
        let currenDay = lastDateOfMonth.getDay();
        if(currenDay == day){
            week = getWeekOfMonth(lastDateOfMonth);
            found = true;
        }
        maxDayCount-=1;
        lastDateOfMonth =  moment(lastDateOfMonth).add(-1, 'd').toDate();

        if(maxDayCount == 0)
            found = true;
    }

    return week;
}

export const cellRender = data => formatToMoney(data.value);

export const cellRenderBold = data => cellAsBold(formatToMoney(data.value));

export const formatId = value => numeral(value).format('000000');

export const formatToMoney = (value, moneda) =>`${monedaSymbol[moneda]||''} ${numeral(value).format('0,0.00')}` ;

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