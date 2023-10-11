import React from 'react';
import './Search.scss';

const Search = ({ filteredItem, handleSearchedItem, placeholder }) => {
    return (
        <div className="search__container">
            <input value={filteredItem} placeholder={placeholder} onChange={handleSearchedItem} />
        </div>
    );
};

export default Search;
