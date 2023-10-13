import React, { useEffect, useState } from 'react';
import {
    useGetCharactersQuery,
    useGetFilmsQuery,
    useGetPlanetsQuery,
    useGetSpeciesQuery,
} from '../../redux/api/charactersApi';
import Character from '../../components/Character/Character';
import './Homepage.scss';
import Search from '../../components/Search/Search';
import { Grid } from 'react-loader-spinner';
import Filter from '../../components/Filter/Filter';
import CharacterDetailsModal from '../../components/CharacterDetailsModal/CharacterDetailsModal';
import Pagination from '../../components/Pagination/Pagination';

const Homepage = () => {
    const [characters, setCharacters] = useState([]);
    const [species, setSpecies] = useState([]);
    const [films, setFilms] = useState([]);
    const [planets, setPlanets] = useState([]);
    const [filteredItem, setFilteredItem] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [characterData, setCharacterData] = useState([]);
    const [totalCharacters, setTotalCharacters] = useState(0);
    const [allSpeciesData, setAllSpeciesData] = useState([]);
    const [allFilmsData, setAllFilmsData] = useState([]);
    const [allHomeworldsData, setAllHomeworldsData] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [speciesPageNumber, setSpeciesPageNumber] = useState(1);
    const [filmsPageNumber, setFilmsPageNumber] = useState(1);
    const [planetsPageNumber, setPlanetsPageNumber] = useState(1);
    const [selectedPlanet, setSelectedPlanet] = useState("");
    const [selectedFilm, setSelectedFilm] = useState("");
    const [selectedSpecies, setSelectedSpecies] = useState("");

    const { data: charactersData } = useGetCharactersQuery({ page: pageNumber });
    const { data: speciesData } = useGetSpeciesQuery({ page: speciesPageNumber });
    const { data: filmsData } = useGetFilmsQuery({ page: filmsPageNumber });
    const { data: planetsData } = useGetPlanetsQuery({ page: planetsPageNumber });

    const charactersPerPage = 10;
    const totalPages = Math.ceil(totalCharacters / charactersPerPage);

    const goToPage = (targetPage) => {
        if (targetPage >= 1 && targetPage <= totalPages) {
            setPageNumber(targetPage);
        }
    };


    useEffect(() => {
        if (charactersData) {
            setCharacters(charactersData.results);
            setTotalCharacters(charactersData.count);
            setIsLoading(true);
        }
    }, [charactersData]);


    useEffect(() => {
        if (speciesData) {
            setAllSpeciesData((prevData) => [...prevData, ...speciesData.results]);
            if (speciesData.next) {
                setSpeciesPageNumber((prevPageNumber) => prevPageNumber + 1);
            } else {
                setIsLoading(true);
            }
        }
    }, [speciesData]);

    useEffect(() => {
        if (filmsData) {
            setAllFilmsData((prevData) => [...prevData, ...filmsData.results]);
            if (filmsData.next) {
                setFilmsPageNumber((prevPageNumber) => prevPageNumber + 1);
            } else {
                setIsLoading(true);
            }
        }
    }, [filmsData]);

    useEffect(() => {
        if (planetsData) {
            setAllHomeworldsData((prevData) => [...prevData, ...planetsData.results]);
            if (planetsData.next) {
                setPlanetsPageNumber((prevPageNumber) => prevPageNumber + 1);
            } else {
                setIsLoading(true);
            }
        }
    }, [planetsData]);

    const handleSearchedItem = (e) => {
        const searchedValue = e.target.value.toLowerCase();
        setFilteredItem(searchedValue);

        if (searchedValue === '') {
            setCharacters(charactersData.results);
            return;
        }

        const filteredArray = characters.filter((character) =>
            character.name.toLowerCase().includes(searchedValue)
        );

        setCharacters(filteredArray);
    };

    const openModal = (character) => {
        setCharacterData(character);
        setIsModalOpen(true);
    };


    const closeModal = () => {
        setIsModalOpen(false);
    };


    return (
        <div className="homepage__container">
            {isLoading ? (
                <>
                    <div className="flex">
                        <Search
                            filteredItem={filteredItem}
                            placeholder="Search character..."
                            handleSearchedItem={handleSearchedItem}
                        />
                        <div className="flex">
                            <Filter
                                selectedFilter={selectedPlanet}
                                handleFilterChange={(event) => setSelectedPlanet(event.target.value)}
                                data={allHomeworldsData}
                                filterName="Homeworlds"
                            />
                            <Filter
                                selectedFilter={selectedFilm}
                                handleFilterChange={(event) => setSelectedFilm(event.target.value)}
                                data={allFilmsData}
                                filterName="Films"
                            />
                            <Filter
                                selectedFilter={selectedSpecies}
                                handleFilterChange={(event) => setSelectedSpecies(event.target.value)}
                                data={allSpeciesData}
                                filterName="Species"
                            />

                        </div>
                    </div>
                    <div className="grid-container">
                        {console.log(selectedPlanet)}
                        {selectedPlanet || selectedFilm || selectedSpecies
                            ? characters
                                .filter((character) => character.homeworld === selectedPlanet || character.films.includes(selectedFilm) || character.species.includes(selectedSpecies))
                                .map((character, idx) => (
                                    <div className="grid" key={idx} onClick={() => openModal(character)}>
                                        <Character name={character.name} bgColor={character.skin_color} />
                                    </div>
                                ))
                            : characters.map((character, idx) => (
                                <div className="grid" key={idx} onClick={() => openModal(character)}>
                                    <Character name={character.name} bgColor={character.skin_color} />
                                </div>
                            ))
                        }
                    </div>

                    <Pagination
                        currentPage={pageNumber}
                        totalPages={totalPages}
                        goToPage={goToPage}
                    />

                    <CharacterDetailsModal
                        isOpen={isModalOpen}
                        characterData={characterData}
                        closeModal={closeModal}
                    />
                </>
            ) : (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '70vh',
                    }}
                >
                    <Grid
                        height="80"
                        width="80"
                        color="#484e55"
                        ariaLabel="grid-loading"
                        radius="12.5"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                    />
                </div>
            )
            }
        </div >
    );
};

export default Homepage;
