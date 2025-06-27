import React, {useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function CardDetail() {
    const { countryCode } = useParams();
    const navigate = useNavigate();
    const [country, setCountry] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [borderCountries, setBorderCountries] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCountry = async () => {
            try {
                console.log('Fetching country with code:', countryCode); // Debug log

                // Try the alpha endpoint first
                let response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);

                console.log('Response status:', response.status); // Debug log
                console.log('Response URL:', response.url); // Debug log

                if (!response.ok) {
                    console.log('Alpha endpoint failed, trying name endpoint...');
                    // If alpha fails, try searching by name as fallback
                    response = await fetch(`https://restcountries.com/v3.1/name/${countryCode}`);
                }

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log('Raw API response:', data); // Debug log
                console.log('Data type:', typeof data); // Debug log
                console.log('Is data an array?', Array.isArray(data)); // Debug log

                // Handle both array and single object responses
                let countryData = null;
                if (Array.isArray(data) && data.length > 0) {
                    countryData = data[0];
                } else if (data && !Array.isArray(data)) {
                    countryData = data;
                }

                if (countryData) {
                    console.log('Setting country data:', countryData); // Debug log
                    setCountry(countryData);

                    // Fetch border countries if they exist
                    if (countryData.borders && countryData.borders.length > 0) {
                        console.log('Fetching border countries:', countryData.borders); // Debug log
                        const borderResponse = await fetch(`https://restcountries.com/v3.1/alpha?codes=${countryData.borders.join(',')}`);
                        if (borderResponse.ok) {
                            const borderData = await borderResponse.json();
                            console.log('Border countries data:', borderData); // Debug log
                            setBorderCountries(Array.isArray(borderData) ? borderData : [borderData]);
                        }
                    }
                } else {
                    console.log('No valid country data found in response');
                    setError('Country not found');
                }
            } catch (error) {
                console.error('Error fetching country:', error);
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        if (countryCode) {
            console.log('useEffect triggered with countryCode:', countryCode);
            setIsLoading(true);
            setError(null);
            setCountry(null);
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

    if (error) {
        return <div className="detail-error">Error: {error}</div>;
    }

    if (!country) {
        return <div className="detail-error">Country not found</div>;
    }

    return (
        <div className="country-detail">
            <button className="back-button" onClick={() => navigate('/')}>
                ← Back
            </button>

            <div className="detail-content">
                <div className="detail-flag">
                    <img src={country.flags?.png} alt={`${country.name?.common} flag`} />
                </div>

                <div className="detail-info">
                    <h1 className="country-title">{country.name?.common}</h1>

                    <div className="detail-grid">
                        <div className="detail-column">
                            <p><span className="detail-label">Native Name:</span> {country.name?.nativeName ? Object.values(country.name.nativeName)[0]?.common : country.name?.common}</p>
                            <p><span className="detail-label">Population:</span> {formatPopulation(country.population || 0)}</p>
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
                                        {borderCountry.name?.common}
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