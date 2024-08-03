import React from 'react'
import Poster from '../Poster/Poster'
import { Category } from './Category'

export const SingleCategory = () => {
  return (
    <div style={{display: 'flex', flexDirection: "column", rowGap: 10}}>
        <Poster />
        <Category />
    </div>
  )
}
