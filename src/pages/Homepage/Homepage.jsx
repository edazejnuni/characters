import React, { useEffect, useState } from 'react'
import { useGetCharactersQuery } from '../../redux/api/charactersApi'
import Character from '../../components/Character/Character'

const Homepage = () => {
    const [characters, setCharacters] = useState([])
    const { data } = useGetCharactersQuery()

    useEffect(() => {
        console.log(data.results)
        if (data) {
            setCharacters(data.results)
        }
    }, [data])
    return (
        <div className='homepage__container'>
            <div className="grid-container">
                {characters.map((character, idx) => (
                    <div className="grid">
                        <Character name={character.name} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Homepage