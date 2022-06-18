import React, { useContext } from 'react'
import { Context } from '../App'

export default function Content(){

  const {data} = useContext(Context)

  return(
    <div className='content-list'>
      {data.map(item => {
      return(
        <div className='content-list-item' key={item.link}>
        <div className='content-list-item-title'><a href={item.link}>{item.title}</a></div>
        <div className='content-list-item-description'>{item.snippet}</div>
        </div>
      )
    })}
    </div>
  )
}