import React from 'react';

function Card({name,population,region,capital,flag}) {
    return (
        <div className={"card"}>
            <img src={flag} alt={name+" flag"}/>
            <h2>{name}</h2>
            <p>Population: {population}</p>
            <p>Region: {region}</p>
            <p>Capital: {capital}</p>
        </div>
    );
}

export default Card;