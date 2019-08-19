import React , {useState} from 'react'

const Slider = ({search}) => {
    const [ date, setDate ] = useState('');
    const [ hour, setHour ] = useState(18);

    const formatDate = (date)=>{
        var dd = date.getDate();
        var mm = date.getMonth()+1;
        var yyyy = date.getFullYear();
        if(dd<10) {dd='0'+dd}
        if(mm<10) {mm='0'+mm}
        date = yyyy+'-'+mm+'-'+dd;
        return date
     }
    
    const Last30Days = ()=> {
        var result = [];
        for (var i=0; i<30; i++) {
            var d = new Date();
            d.setDate(d.getDate() - i);
            result.push( formatDate(d) )
        }
    
        return(result);
     }

     const formSubmit =(e) =>{
         e.preventDefault();
        const fullDate = `${date}T${hour.length == 1 ? `0${hour}` : `${hour}`}`
        fetch(`http://localhost:3000/location/${fullDate}`)
        .then(response => response.json())
        .then((json) => {
            search(json)
        })
     }

    return (
        <div>
            <form onSubmit={formSubmit}>
                <label>choose from last 30 days</label>
                <select id="day" required onChange={(e)=> setDate(e.target.value)} value={date}>
                   {Last30Days().map(day=>
                        (<option key={day} value={day}>{day}</option>)
                   )} 
                </select>
                <br/>
                <label>choose hour {hour.length == 1 ? `0${hour}:00` : `${hour}:00`}</label>
                <input type="range" min="0" max="23" required step="1" value={hour} onChange={(e) => setHour(e.target.value)} />
                <br/>
                <button type="submit">Search</button>
            </form>
        </div>
    )
}


export default Slider