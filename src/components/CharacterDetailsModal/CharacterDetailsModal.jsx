import React, { useEffect, useState } from 'react';
import './CharacterDetailsModal.scss';
import { format } from 'date-fns';

const CharacterDetailsModal = ({ isOpen, characterData, closeModal }) => {
    const [homeWorldData, setHomeWorldData] = useState([]);
    const [formattedDate, setFormattedDate] = useState('');

    const convertStarWarsYearToAD = (starWarsYear) => {
        const bbyYear = parseInt(starWarsYear, 10);
        const battleOfYavinYear = 0;
        const equivalentADYear = battleOfYavinYear + bbyYear;
        return equivalentADYear;
    };

    const fetchHomeWorldData = () => {
        if (isOpen && characterData.homeworld) {
            fetch(characterData.homeworld)
                .then((response) => response.json())
                .then((data) => {
                    setHomeWorldData(data);
                })
                .catch((error) => {
                    console.error('Error fetching homeworld data:', error);
                });
        }
    };

    useEffect(() => {
        fetchHomeWorldData();
        console.log(homeWorldData)

        if (isOpen && characterData.created) {
            const originalDate = new Date(characterData.created);
            if (!isNaN(originalDate.getTime())) {
                const formatted = format(originalDate, "dd-MM-yyyy");
                setFormattedDate(formatted);
            }
        }
    }, [isOpen, characterData]);

    const starWarsYear = "19BBY";
    const equivalentADYear = convertStarWarsYearToAD(starWarsYear);

    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Name: {characterData.name}</h2>
                <p>Height: {characterData.height / 100} m</p>
                <p>Mass: {characterData.mass} kg</p>
                <p>Created: {formattedDate} </p>
                <p>Number of films: {characterData.films.length} </p>
                <p>Birth year: {equivalentADYear} </p>
                <h3>Homeworld:</h3>
                <p>Name: {homeWorldData.name}</p>
                <p>Terrain: {homeWorldData.terrain}</p>
                <p>Climate: {homeWorldData.climate}</p>
                <p>Amount of residents: {homeWorldData.residents.length}</p>
                <button onClick={closeModal}>Close</button>
            </div>
        </div>
    );
};

export default CharacterDetailsModal;
