import React, {useEffect, useState} from 'react';
import Searchbar from "./searchbar.jsx";
import Filter from "./filter.jsx";
import Card from "./card.jsx";

function CountryGrid() {
    const [searching, setSearching] = useState("")
    const [filter, setFilter] = useState("")
    const [countriesData, setCountriesData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchCountries = async () => {
            try{
                const response = await fetch("https://restcountries.com/v3.1/all?fields=name,population,region,subregion,capital,tld,currencies,languages,borders,flags")
                const data = await response.json()
                setCountriesData(data)
                console.log(data)
            }
            catch (error){
                console.log(error)
            }
            finally {
                setIsLoading(false)
            }
        }
        fetchCountries();
    }, []);


    return (
        <div>
            <div className={"search_filter"}>
                <Searchbar searching={searching} setSearching={setSearching}></Searchbar>
                <Filter setFilter={setFilter}></Filter>
            </div>
            {isLoading ? (
                <p>Loading...</p>
            ): (
                <div className={"cardContainer"}>
                    {countriesData.map((countrie)=>(
                        <Card key={countrie.cca3} name={countrie.name.common} capital={countrie.capital} region={countrie.region}
                              flag={countrie.flags.png} population={countrie.population}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default CountryGrid;