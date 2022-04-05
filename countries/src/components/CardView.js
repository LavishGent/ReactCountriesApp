import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';
import '../App.css'
import SearchBar from './SearchBar';

function CardView() {
    const allCountriesUrl = 'https://restcountries.com/v3.1/all'
    const [countries, setCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState(null);
    const [searchValue, setSearchValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const searchCountries = (searchValue) => {
        setSearchValue(searchValue)
        if (searchValue === "") {
            setFilteredCountries(countries)
        } else {
            const filteredCountries = countries.filter((country) => {
                return country.name.common.toLowerCase().includes(searchValue.toLowerCase())
            })
            setFilteredCountries(filteredCountries)
        }
    }

    const getRegionData = (region) => {
        if (region === undefined || region === "All") {
            axios.get('https://restcountries.com/v3.1/all')
                .then(response => {
                    setCountries(response.data)
                })
        }
        else {
            axios.get(`https://restcountries.com/v3.1/region/${region}`)
                .then(response => {
                    setCountries(response.data)
                })
        }

    }

    useEffect(() => {
        setIsLoading(true)
        axios.get(allCountriesUrl)
            .then(response => {
                setCountries(response.data)
                console.log(response.data, "response")
            })
            .catch(error => {
                console.log(error, 'errorHOOK');
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [])


    if (isLoading) {
        console.log('Loading...');
        return <div>Loading...</div>
    } else {
        console.log('Data received')
        return (
            <div>
                <SearchBar setCountries={searchCountries} getRegionData={getRegionData} searchCountries={searchCountries} />
                <section className='card-container'>
                    {searchValue.length > 0 ? filteredCountries.map((country) => {
                        const { name, population, region, capital, flags, ccn3, cca3 } = country

                        return (

                            <Card className='country-card' key={ccn3} style={{ width: '18rem', marginBottom: '50px' }}>
                                <Link to={`/country/${cca3}`}>
                                    <Card.Img variant="top" src={flags.png} alt={name.comon} style={{ height: '160px', width: '18rem', boxShadow: "0px 0px 7px 2px rgba(0, 0, 0, 0.294384)" }} />
                                </Link>
                                <Card.Body>
                                    <Card.Title>{name.common}</Card.Title>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item className='info-title'>Population: {population}</ListGroup.Item>
                                        <ListGroup.Item className='info-title'>Region: {region}</ListGroup.Item>
                                        <ListGroup.Item className='info-title'>Capital: {capital}</ListGroup.Item>
                                    </ListGroup>
                                </Card.Body>
                            </Card>

                        )
                    }) : countries.map((country) => {
                        const { name, population, region, capital, flags, ccn3, cca3 } = country

                        return (

                            <Card className='country-card' key={ccn3} style={{ width: '18rem', marginBottom: '50px' }}>
                                <Link to={`/country/${cca3}`}>
                                    <Card.Img variant="top" src={flags.png} alt={name.comon} style={{ height: '160px', width: '18rem', boxShadow: "0px 0px 7px 2px rgba(0, 0, 0, 0.294384)" }} />
                                </Link>
                                <Card.Body>
                                    <Card.Title>{name.common}</Card.Title>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item className='info-title'>Population: {population}</ListGroup.Item>
                                        <ListGroup.Item className='info-title'>Region: {region}</ListGroup.Item>
                                        <ListGroup.Item className='info-title'>Capital: {capital}</ListGroup.Item>
                                    </ListGroup>
                                </Card.Body>
                            </Card>

                        )
                    })

                    }
                </section>
            </div>
        )
    }


}

export default CardView