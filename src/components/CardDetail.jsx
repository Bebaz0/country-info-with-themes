import React, {useEffect, useState} from 'react';

function CardDetail() {
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
        </div>
    );
}

export default CardDetail;