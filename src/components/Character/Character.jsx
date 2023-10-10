import React from 'react'

const Character = ({ name }) => {
    return (
        <div className='character__container'>
            <h2>{name}</h2>
        </div>
    )
}

export default Character