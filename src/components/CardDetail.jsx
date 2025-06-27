import React, {useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function CardDetail() {
    const { countryCode } = useParams();
    const navigate = useNavigate();
    const [country, setCountry] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [borderCountries, setBorderCountries] = useState([]);

    useEffect(() => {
        const fetchCountry = async () => {
            try {
                const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}?fields=name,population,region,subregion,capital,tld,currencies,languages,borders,flags`);
                const data = await response.json();

                if (data && data.length > 0) {
                    setCountry(data[0]);

                    // Fetch border countries if they exist
                    if (data[0].borders && data[0].borders.length > 0) {
                        const borderResponse = await fetch(`https://restcountries.com/v3.1/alpha?${data[0].borders.join(',')}&fields=name,cca3`);
                        const borderData = await borderResponse.json();
                        setBorderCountries(borderData);
                    }
                }
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };

        if (countryCode) {
            fetchCountry();
        }
    }, [countryCode]);

    const formatPopulation = (population) => {
        return population.toLocaleString();
    };

    const handleBorderClick = (borderCode) => {
        navigate(`/country/${borderCode}`);
    };

    if (isLoading) {
        return <div className="detail-loading">Loading...</div>;
    }

    return (
        <div className="country-detail">
            <button className="back-button" onClick={() => navigate('/')}>
                ← Back
            </button>

            <div className="detail-content">
                <div className="detail-flag">
                    <img src={country.flags.png} alt={`${country.name.common} flag`} />
                </div>

                <div className="detail-info">
                    <h1 className="country-title">{country.name.common}</h1>

                    <div className="detail-grid">
                        <div className="detail-column">
                            <p><span className="detail-label">Native Name:</span> {country.name.nativeName ? Object.values(country.name.nativeName)[0].common : country.name.common}</p>
                            <p><span className="detail-label">Population:</span> {formatPopulation(country.population)}</p>
                            <p><span className="detail-label">Region:</span> {country.region}</p>
                            <p><span className="detail-label">Sub Region:</span> {country.subregion || 'N/A'}</p>
                            <p><span className="detail-label">Capital:</span> {country.capital ? country.capital.join(', ') : 'N/A'}</p>
                        </div>

                        <div className="detail-column">
                            <p><span className="detail-label">Top Level Domain:</span> {country.tld ? country.tld.join(', ') : 'N/A'}</p>
                            <p><span className="detail-label">Currencies:</span> {country.currencies ? Object.values(country.currencies).map(c => c.name).join(', ') : 'N/A'}</p>
                            <p><span className="detail-label">Languages:</span> {country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</p>
                        </div>
                    </div>

                    {borderCountries.length > 0 && (
                        <div className="border-countries">
                            <span className="border-label">Border Countries:</span>
                            <div className="border-buttons">
                                {borderCountries.map((borderCountry) => (
                                    <button
                                        key={borderCountry.cca3}
                                        className="border-button"
                                        onClick={() => handleBorderClick(borderCountry.cca3)}
                                    >
                                        {borderCountry.name.common}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CardDetail;