import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function SingleCountry() {
  console.log('SingleCountry')
  const [country, setCountry] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { ccn3 } = useParams();
  const countryURL = `https://restcountries.com/v3.1/alpha/${ccn3}`;
  const navigate = useNavigate();

  const getSingleCountry = () => {
    axios.get(countryURL)
      .then(response => {
        setCountry(response.data);
        setIsLoading(false);
      })
  }

  useEffect(() => {
    getSingleCountry();
  }, [ccn3])


  if (isLoading) {
    <div>Loading...</div>
  } else {
    return (
      <div>
        <button onClick={() => { navigate('/') }}>Back</button>
        {country.map((country) => {
          let { name, population, region, capital, tld, cca3, currencies, languages, borders, flags, subregion } = country;
          if (borders === undefined) {
            borders = ["No Borders"];
          }
          languages = Object.values(languages).map((language) => {
            console.log(language, 'language')
            return language;
          })
          currencies = Object.keys(currencies).map((currency) => {
            console.log(currency, 'currency')
            return currency;
          })
          return (
            <section key={cca3} className='country-detail'>
              <div>
                <img src={flags.png} alt='Country Flag' />
              </div>
              <article>
                <div>
                  <h1>{name.common}</h1>
                  <p>Native Name: {name.official}</p>
                  <p>Population: {population}</p>
                  <p>Region: {region}</p>
                  <p>Sub Region: {subregion}</p>
                  <p>Capital: {capital}</p>
                  <p>Top Level Domain: {tld}</p>
                  <p>Currencies: {currencies.join(', ')}</p>
                  <p>Languages: {languages.join(', ')}</p>
                </div>
                <div>
                  <h2>Border Countries:</h2>
                  <ul className='borders'>
                    {borders.map((border) => {
                      return (

                        <li key={border}>
                          <button onClick={() => { navigate(`/country/${border}`) }} >{border}</button>
                        </li>

                      )
                    })
                    }
                  </ul>
                </div>
              </article>
            </section>
          )
        })}

      </div>
    )
  }
}


export default SingleCountry