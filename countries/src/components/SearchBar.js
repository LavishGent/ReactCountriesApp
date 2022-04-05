import React, {useEffect} from 'react'

export default function SearchBar(props) {
    const { searchCountries, searchValue, getRegionData } = props

    useEffect(() => {
        getRegionData()
    }, [])

    return (
        <section className='search-bar'>
            <form>
                <input className='search-input' type="search" name='search' placeholder="Search for a country..." value={searchValue} 
                onChange={(e) => {
                    searchCountries(e.target.value)}} 
                />
            </form>
            <div>
                <select name='select' id='select' onChange={(e) =>{
                    getRegionData(e.target.value)
                }}>
                    <option value='All'>All</option>
                    <option value='Africa'>Africa</option>
                    <option value='Americas'>Americas</option>
                    <option value='Asia'>Asia</option>
                    <option value='Europe'>Europe</option>
                    <option value='Oceania'>Oceania</option>
                </select>
            </div>
        </section>
    )
}
