import React from 'react';
import Calendar from 'devextreme-react/calendar';

const CustomCalendar = props => {
    return (
        <Calendar
            id="calendar-container"
            value={props.value}
            onValueChanged={props.onValueChanged}
            min={props.minDateValue}
            disabledDates={props.disabledDates} 
            disabled = {!props.doctorId || !props.specialtyId}
            />
    );
}

// function areEqual(prevProps, nextProps) {
//     /*
//     retorna true si al pasar los nextProps a renderizar retorna
//     el mismo resultado que al pasar los prevProps a renderizar,
//     de otro modo retorna false
//     */
//    console.log(prevProps);
//    console.log(nextProps);
//    return prevProps.doctorId == nextProps.doctorId
   
//   }

export default CustomCalendar;
