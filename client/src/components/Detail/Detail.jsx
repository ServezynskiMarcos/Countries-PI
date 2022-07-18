import React from 'react'
//import { Link } from 'react-router-dom';
const Detail = (props) => {
  return (
    <div>
      <h1>{props.name}</h1>
      <img src={props.img} alt={props.name}/>
      <h3>{props.continent}</h3>
    </div>
  
  )
}

export default Detail