import React from 'react';
import './Filter.scss'

const Filter = ({ selectedFilter, handleFilterChange, data, filterName }) => {

    return (
        <div className='filter__component'>
            <label htmlFor="filter__dropdown">Select <span>{filterName}:</span></label>
            <select
                id="filter__dropdown"
                value={selectedFilter}
                onChange={handleFilterChange}
                className='filter__dropdown'
            >
                {filterName === "Films" ?
                    <>
                        {
                            data.map((option, idx) => (
                                <option key={idx} value={option.url}>{option.title}</option>
                            ))
                        }</> :
                    <>
                        {
                            data.map((option, idx) => (
                                <option key={idx} value={option.url}>{option.name}</option>
                            ))
                        }
                    </>
                }

            </select>
        </div>
    );
};

export default Filter;
