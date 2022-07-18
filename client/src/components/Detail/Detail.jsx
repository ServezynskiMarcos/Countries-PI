import React from 'react'
//import { Link } from 'react-router-dom';
import './Style.css'
const Detail = (props) => {
  return (
    <div className='containerDetail'>
      <div className='div2'>
      <h1>{props.name}</h1>
      <img src={props.img} alt={props.name}/>
      <h3>{props.continent}</h3>
      </div>
    </div>
  
  )
}

export default Detail