import React from 'react'
import './Search.scss'

const Search = ({ filteredItem, handleFilteredItem, placeholder }) => {
    return (
        <div className='search__container'>
            <input value={filteredItem} placeholder={placeholder} onChange={handleFilteredItem} />
        </div>
    )
}

export default Search