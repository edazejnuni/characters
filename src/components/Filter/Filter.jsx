import React from 'react';

const Filter = ({ selectedFilter, handleFilterChange, homeworlds, films, species }) => {
    return (
        <div>
            <label htmlFor="filterDropdown">Filter by:</label>
            <select
                id="filterDropdown"
                value={selectedFilter}
                onChange={handleFilterChange}
            >
                <option value="">All</option>
                <option value="homeworld">Homeworld</option>
                <option value="film">Film</option>
                <option value="species">Species</option>
            </select>

            {selectedFilter === "homeworld" && (
                <select>
                    <option value="">Select a homeworld</option>
                    {homeworlds.map((homeworld) => (
                        <option key={homeworld.id} value={homeworld.name}>
                            {homeworld.name}
                        </option>
                    ))}
                </select>
            )}

            {selectedFilter === "film" && (
                <select>
                    <option value="">Select a film</option>
                    {films.map((film) => (
                        <option key={film.id} value={film.title}>
                            {film.title}
                        </option>
                    ))}
                </select>
            )}

            {selectedFilter === "species" && (
                <select>
                    <option value="">Select a species</option>
                    {species.map((specie) => (
                        <option key={specie.id} value={specie.name}>
                            {specie.name}
                        </option>
                    ))}
                </select>
            )}
        </div>
    );
};

export default Filter;
