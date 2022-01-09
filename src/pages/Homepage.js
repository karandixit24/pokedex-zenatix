import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';

import Pokemon from '../components/Pokemon';
import Loader from '../components/Loader';

const Homepage = () => {

    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState('');
    const [filteredPokemon, setFilteredPokemon] = useState([]);

    const getPokemonList = async () => {
        let pokemonArr = [];
        for (let i = 1; i <= 151; i++) {
            pokemonArr.push(await getPokemonData(i));
        }
        console.log(pokemonArr);
        setPokemon(pokemonArr);
        setLoading(false);
    }

    const getPokemonData = async (id) => {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        return res;
    }

    useEffect(() => {
        getPokemonList();
    }, [])

    const filterPokemon = pokemon.filter( p => {
        return p.data.name.toLowerCase().includes(search.toLowerCase())
         })




    return (
        <>
            {loading ? (<Loader />) : (

                <Row>
                    <input type="text" placeholder="Search" onChange={e => setSearch(e.target.value)} />
                    

                    {filterPokemon.map(p => (
                        <Col key={p.data.name} xs={12} sm={12} md={4} lg={4} xl={4}>
                            <Pokemon pokemon={p.data} />
                        </Col>
                    ))}
                </Row>
            )}
        </>
    )
}

export default Homepage