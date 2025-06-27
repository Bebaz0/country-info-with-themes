import React from 'react';


function Searchbar({searching,setSearching}) {

    return (
        <div className={"search-container"}>
            <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input className={"search-input"}
            placeholder={"Search for a country..."}
            type={"text"}
            value={searching}
            onChange={event => setSearching(event.target.value)}
            />
        </div>
    );
}

export default Searchbar;