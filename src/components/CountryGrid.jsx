import React, {useEffect, useState} from 'react';
import Searchbar from "./searchbar.jsx";
import Filter from "./filter.jsx";
import Card from "./card.jsx";
import { Link } from 'react-router-dom';

function CountryGrid() {
    const [searching, setSearching] = useState("")
    const [filter, setFilter] = useState("")
    const [countriesData, setCountriesData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const fetchCountries = async (query = "", filterquery="") => {
        setIsLoading(true)
        let filtering = false
        try{
            let endpoint
            let data
            if (filterquery == ""){
                endpoint = query? `https://restcountries.com/v3.1/name/${encodeURIComponent(query)}`
                    :"https://restcountries.com/v3.1/all?fields=name,population,region,capital,tld,currencies,languages,borders,flags,cca3"
            }
            else{
                if (!query){
                    endpoint = `https://restcountries.com/v3.1/subregion/${filterquery}`
                }
                else{const searchResponse = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(query)}`)
                    if (!searchResponse.ok) {
                        if (searchResponse.status === 404) {
                            console.log("Country not found")
                            return
                        }
                        throw new Error(`HTTP error! status: ${searchResponse.status}`)
                    }
                    const searchData = await searchResponse.json()
                    const data = searchData.filter(country =>
                        country.region.toLowerCase() === filterquery.toLowerCase()
                    )
                    setCountriesData(data)
                    filtering = true}
            }

            const response = await fetch(endpoint)
            if (!response.ok) {
                if (response.status === 404) {
                    console.log("Country not found")
                    // Don't update countriesData, keep existing data
                    return
                }
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            if (!filtering){data = await response.json()
                setCountriesData(data)
                console.log(data)}
        }
        catch (error){
            console.log(error)
        }
        finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchCountries(searching,filter);
    }, [searching,filter]);


    return (
        <div>
            <div className={"search_filter"}>
                <Searchbar searching={searching} setSearching={setSearching}></Searchbar>
                <Filter setFilter={setFilter}></Filter>
            </div>
            {isLoading?(
                <p>Loading...</p>
            ): (
                <div className={"cardContainer"}>
                    {countriesData.map((countrie)=>(
                        <Link to={`/country/${countrie.cca3}`} key={countrie.cca3}>
                            <Card  name={countrie.name.common}
                                   capital={countrie.capital ? countrie.capital[0] : 'N/A'}
                                   region={countrie.region}
                                   flag={countrie.flags.png}
                                   population={countrie.population}
                            />
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CountryGrid;