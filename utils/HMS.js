export const SecondsToHMS = (seconds) => {
    // create date instance 
    const date = new Date(null);
    // specify seconds
    date.setSeconds(seconds);
    // get the hms values
    const h = Number(date.toISOString().slice(11, 13));
    const m = Number(date.toISOString().slice(14, 16));
    const s = Number(date.toISOString().slice(17, 19));
    // return the hms values
    return { h, m, s, }
}

export const HMSFormatted = (hms) => {
    // console.log('hms' + JSON.stringify(hms));
    const h = hms.h ? hms.h.toString() + 'h' : '';
    const m = hms.m ? ' ' + hms.m.toString() + 'm' : '';
    const s = hms.s ? ' ' + hms.s.toString() + 's' : '';
    console.log(h + m + s);
    // if time is 0
    if (h + m + s === '') {
        return '0s'
    }

    return `${h}${m}${s}`

}


export const HMSToSeconds = (hms) => {
    // get total seconds by ...
    // adding seconds in an hour * amount of hours
    // and seconds in a minute * amount of minutes
    // and seconds
    const hourSeconds = hms.h * 3600;
    const minuteSeconds = hms.m * 60;
    totalSeconds = hourSeconds + minuteSeconds + hms.s;
    // return total seconds
    return totalSeconds;
}