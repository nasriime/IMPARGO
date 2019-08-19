import React , {useState} from 'react'

const Slider = ({search}) => {
    const [ date, setDate ] = useState('');
    const [ hour, setHour ] = useState(18);
    // Error message if no results found
    const [error, setError] = useState(false)

    // format date
    // example: 2019-07-23
    const formatDate = (date)=>{
        var dd = date.getDate();
        var mm = date.getMonth()+1;
        var yyyy = date.getFullYear();
        if(dd<10) {dd='0'+dd}
        if(mm<10) {mm='0'+mm}
        date = yyyy+'-'+mm+'-'+dd;
        return date
     }
    
    // get the last 30 days to put it in the dropdown
    const Last30Days = ()=> {
        var result = [];
        for (var i=0; i<30; i++) {
            var d = new Date();
            d.setDate(d.getDate() - i);
            result.push( formatDate(d) )
        }
    
        return(result);
     }

    // Submit form
     const formSubmit =(e) =>{
        e.preventDefault();
        setError(false)
        const fullDate = `${date}T${hour.length == 1 ? `0${hour}` : `${hour}`}`
        fetch(`http://localhost:3000/location/${fullDate}`)
        .then(response => response.json())
        .then((json) => {
            if(json.length == 0){
                setError(true)
            }
            search(json)
        })
     }

     const resetMarkers = ()=>{
        setError(false)
        search([])
     }
    return (
        <div>
            <form onSubmit={formSubmit}>
                <div>
                    <label htmlFor="day">Choose from last 30 days</label>
                    <select id="day" required onChange={(e)=> setDate(e.target.value)} value={date}>
                    {Last30Days().map(day=>
                            (<option key={day} value={day}>{day}</option>)
                    )} 
                    </select>
                </div>
                <div>
                    <label htmlFor="range">choose hour {hour.length == 1 ? `0${hour}:00` : `${hour}:00`}</label>
                    <input id="range" type="range" min="0" max="23" required step="1" value={hour} onChange={(e) => setHour(e.target.value)} />
                </div>

                <div>
                    <button type="submit">Search</button>
                    <button type="button" onClick={resetMarkers}>Reset</button>
                </div>
            </form>
            { error && <div className="error">No results found!</div>}

        </div>
    )
}


export default Slider