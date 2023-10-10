import React, { useEffect, useState } from 'react'
import { useGetCharactersQuery } from '../../redux/api/charactersApi'
import Character from '../../components/Character/Character'
import './Homepage.scss'
import Search from '../../components/Search/Search'
import { Grid } from 'react-loader-spinner'
import Pagination from '../../components/Pagination/Pagination'
import Filter from '../../components/Filter/Filter'

const Homepage = () => {
    const [characters, setCharacters] = useState([]);
    const [filteredItem, setFilteredItem] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [pageNumber, setPageNumber] = useState(1)
    const [totalPages, setTotalPages] = useState()
    const [currentPage, setCurrentPage] = useState()
    const [nextPage, setNextPage] = useState()
    const [prevPage, setPrevPage] = useState()


    const { data } = useGetCharactersQuery({ page: pageNumber });
    const fetchData = () => {
        if (data) {
            setCharacters(data.results);
            setIsLoading(true)
            setTotalPages(Math.ceil(data.count / 10))
            console.log(data.results)
        }
    }

    useEffect(() => {
        fetchData()
    }, [data])

    const handleFilteredItem = (e) => {
        const searchedValue = e.target.value.toLowerCase();
        setFilteredItem(searchedValue)

        if (searchedValue === '') {
            setCharacters(data.results)
            return;
        }

        const filteredArray = characters.filter((character) => (
            character.name.toLowerCase().includes(searchedValue)
        ))

        setCharacters(filteredArray)
    }

    return (
        <div className='homepage__container'>
            {isLoading ?
                <>
                    <Search filteredItem={filteredItem} placeholder="Search character..." handleFilteredItem={handleFilteredItem} />
                    <Filter />
                    <div className="grid-container">
                        {characters.map((character, idx) => (
                            <div className="grid" key={idx}>
                                <Character name={character.name} />
                            </div>
                        ))}
                    </div>

                </> :
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "70vh"
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
                </div>}

        </div>
    )
}

export default Homepage