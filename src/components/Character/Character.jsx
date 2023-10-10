import React from 'react'
import './Character.scss'

const Character = ({ name }) => {
    return (
        <div className='character__container'>
            <h2>{name}</h2>
        </div>
    )
}

export default Character