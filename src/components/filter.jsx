import React from 'react';

function Filter({setFilter}) {

    return (
        <div className="dropdown-container">
            <select id="region-filter" name="region"
            onChange={event => setFilter(event.target.value)}>
                <option value="">Filter by region</option>
                <option value="africa">Africa</option>
                <option value="america">America</option>
                <option value="asia">Asia</option>
                <option value="europe">Europe</option>
                <option value="oceania">Oceania</option>
            </select>
        </div>
    );
}

export default Filter;