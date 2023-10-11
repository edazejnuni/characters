import React, { useEffect, useState } from 'react';
import { useGetCharactersQuery } from '../../redux/api/charactersApi';
import Character from '../../components/Character/Character';
import './Homepage.scss';
import Search from '../../components/Search/Search';
import { Grid } from 'react-loader-spinner';
import Filter from '../../components/Filter/Filter';
import CharacterDetailsModal from '../../components/CharacterDetailsModal/CharacterDetailsModal';
import Pagination from '../../components/Pagination/Pagination';

const Homepage = () => {
    const [characters, setCharacters] = useState([]);
    const [filteredItem, setFilteredItem] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [characterData, setCharacterData] = useState([]);
    const [totalCharacters, setTotalCharacters] = useState(0);
    const [nextPageUrl, setNextPageUrl] = useState(null);

    const { data } = useGetCharactersQuery({ page: pageNumber });

    const fetchData = () => {
        if (data) {
            setCharacters(data.results);
            setTotalCharacters(data.count);
            setNextPageUrl(data.next);
            setIsLoading(true);
        }
    };

    useEffect(() => {
        fetchData();
    }, [data]);

    const handleFilteredItem = (e) => {
        const searchedValue = e.target.value.toLowerCase();
        setFilteredItem(searchedValue);

        if (searchedValue === '') {
            setCharacters(data.results);
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
    const charactersPerPage = 10;

    const totalPages = Math.ceil(totalCharacters / charactersPerPage);

    const goToPage = (targetPage) => {
        if (targetPage >= 1 && targetPage <= totalPages) {
            setPageNumber(targetPage);
        }
    };

    return (
        <div className="homepage__container">
            {isLoading ? (
                <>
                    <Search
                        filteredItem={filteredItem}
                        placeholder="Search character..."
                        handleFilteredItem={handleFilteredItem}
                    />
                    <Filter />
                    <div className="grid-container">
                        {characters.map((character, idx) => (
                            <div className="grid" key={idx} onClick={() => openModal(character)}>
                                <Character name={character.name} bgColor={character.skin_color} />
                            </div>
                        ))}
                    </div>

                    <Pagination
                        currentPage={pageNumber}
                        totalPages={totalPages}
                        goToPage={goToPage}
                    />


                    <CharacterDetailsModal isOpen={isModalOpen} characterData={characterData} closeModal={closeModal} />
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
            )}
        </div>
    );
};

export default Homepage;
