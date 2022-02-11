import React from 'react';

const NormalTime = (time) => {
    const dateNTime = time.split("T")
    const yearMonthDay = dateNTime[0]?.split("-")
    const hoursMinutes = dateNTime[1]?.split(":")
    const hours = hoursMinutes[0]
    const minutes = hoursMinutes[1]
    const mm = Number(yearMonthDay[1]).toString() - 1
    const dd = yearMonthDay[2];
    const ddChars = dd.split('');
    const arr = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];
    const normalTime = arr[mm] + " " + (ddChars[1] ? dd : ddChars[0]) + ', ' + (hours > 12 ? hours - 12 : hours) +
        ":" + (minutes) + (hours > 12 ? " pm" : " am")
    return (
        <>
            {normalTime}
        </>
    );
};

export default NormalTime;