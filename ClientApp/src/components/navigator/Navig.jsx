import React from 'react';

const Navig = (props) => {

    const { location } = props;

    setTimeout(() => {
        var pathname = location?.state?.returnUrl;
        props.history.push({ pathname });
    }, 1000);

    return (
        <div>
            
        </div>
    );
}

export default Navig;
