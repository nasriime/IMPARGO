// Get characters to "T" to substring date
// example "2019-07-23T13:10:54.332Z"
const getDate = (string)=> {
    return string.indexOf("T");
}

// Get characters to ":" to substring hour
// example "2019-07-23T13:10:54.332Z"
const getHour = (string)=> {
    return string.indexOf(":");
}

// Get unique values in array
const uniqueArray = (arr)=> {
    const uniqueList = arr.filter((x, i, a) => a.indexOf(x) == i);
    return uniqueList;
}

// Get the date (year , month and day only)
//example "2019-07-23"
const splitDate = (fullDate)=> {
    // Get the index of "T" 
    const dashIndex = getDate(fullDate);
    // substring year, month and day only 
    const newDate = fullDate.substring(0, dashIndex);
    return newDate;
}

// Get the hour only from date string 
// example "2019-07-23T13:10:54.332Z"
const splitHour = (FullDate)=>{
    const colonIndex = getHour(FullDate);
    const dashIndex = getDate(FullDate);
    const hour = fullDate.substring(dashIndex, colonIndex);
    return hour;
}

// get array of segement based on days
const segemntsArray = (locations)=>{
    // get dates only from locations
    const dates = locations.map(element => {
        return splitDate(element.time);
    });
    //Get unique dates only from dates
    const uniqueDates = uniqueArray(dates);
    // segemnts array that we sent to frontend
    let segemnts = [];

    // sort locations based on the same day
    uniqueDates.forEach(element => {
        let filteredLocations = locations.filter(location=>{
            let date = splitDate(location.time);
            return date == element;
        })
        segemnts.push(filteredLocations);
    });

    return segemnts;
}


const searchByDate = (locations, searchDate, searchHour)=>{
    const dates = locations.map(element => {
        return splitDate(element.time);
    });

    const matchedDates = dates.filter(date=> {
        return date == searchDate
    });

    if(matchedDates.length >0){
        const hours = locations.map(element => {
            return splitHour(element.time);
        });

        const matchedHours = hours.filter(hour=> {
            return (Number(hour) == searchHour) || (Number(hour)+1 == searchHour) || (Number(hour)-1 == searchHour) 
        });

        if(matchedHours.length >0){
         return matchedHours;   
        }

        return false;
    }

    return false;
}

module.exports = {
    getDate,
    uniqueArray,
    splitDate,
    segemntsArray,
    searchByDate
}