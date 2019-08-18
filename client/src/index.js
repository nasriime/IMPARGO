import React , {useState} from 'react'
import ReactDOM from 'react-dom'
import MapComponent from './map_component'
import Slider from './Slider'
import './styles.css'

const Index = () => {
  const [result, setResult] = useState('');
  const search = (searchResult)=>{
    setResult(searchResult);
  }

  return (
    <div>
      <div className='header'>
        <h1>Welcome to the example task!</h1>
      </div>
      {/* TODO(Task 2): Add a slider to select datetime in the past.
        Pass the selected value as prop to the MapContainer */ }
        <Slider search={search}/>
      <MapComponent result={result} />
    </div>)
}

ReactDOM.render(<Index />, document.getElementById('main-container'))
