
# Frontend Mentor - REST Countries API with color theme switcher solution

This is a solution to the [REST Countries API with color theme switcher challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- See all countries from the API on the homepage
- Search for a country using an `input` field
- Filter countries by region
- Click on a country to see more detailed information on a separate page
- Click through to the border countries on the detail page
- Toggle the color scheme between light and dark mode *(optional)*

## My process

### Built with

- Semantic HTML5
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/)
- [React Router](https://reactrouter.com/)

### What I learned

This project was a great opportunity to consolidate my skills in React, but the most valuable part for me was properly learning how to use **React Router** for client-side navigation between pages. Setting up dynamic routes, passing parameters, and handling navigation programmatically are now much clearer to me.

I also improved how I handle **API fetch requests** in React — organizing the fetch logic, managing loading and error states, and keeping the data flow clean and predictable across components.

A small example of a fetch handling approach I adopted:

```js
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
```

And using React Router for dynamic routing:

```js
<Route path="/country/:name" element={<CountryDetails />} />
```

These patterns will definitely stick with me for future React projects.

## Author

- GitHub - [@Bebaz0](https://github.com/Bebaz0)
- Frontend Mentor - [@Bebaz0](https://www.frontendmentor.io/profile/bebaz0)
