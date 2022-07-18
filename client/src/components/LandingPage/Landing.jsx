import React from 'react'
import { Link } from 'react-router-dom';
import './Style.css'
import sample from './sample.mp4';
const Landing= () => {
  return (
    <div className="Landing">
    <div className="nav">
      <h1>Countries</h1>
      <Link to='/countries'>
        <button>Go Home</button>
      </Link>
    </div>
      
      <video className='videoTag' autoPlay loop muted>
        <source src={sample} type='video/mp4' />
      </video>
    </div>
  )
}

export default Landing