// Get characters to "T"
// example "2019-07-23T13:10:54.332Z"
const getPosition = (string)=> {
    return string.indexOf("T");
}

// Get unique values in array
const uniqueArray = (arr)=> {
    const uniqueList = arr.filter((x, i, a) => a.indexOf(x) == i);
    return uniqueList;
}

// Get the date (year , month and day only)
//example "2019-07-23"
const splitDate = (date)=> {
    // Get the index of "T" 
    const dashIndex = getPosition(date);
    // substring year, month and day only 
    const newDate = date.substring(0, dashIndex);
    return newDate;
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

module.exports = {
    getPosition,
    uniqueArray,
    splitDate,
    segemntsArray
}