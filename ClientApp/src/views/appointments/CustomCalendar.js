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


export default CustomCalendar;
