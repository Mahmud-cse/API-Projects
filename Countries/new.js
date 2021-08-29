const loadCountries=()=>{
    fetch('https://restcountries.eu/rest/v2/all')
    .then(res=>res.json())
    .then(data=>displayCountries(data))
}

loadCountries();

const displayCountries=countries=>{
    const value=document.getElementById('countries');
    countries.forEach(country=>{
        // const h3=document.createElement('h3');
        // h3.classList.add('value');
        // h3.innerText=`${country.name}  ,Region: ${country.region} ,currencies: ${country.currencies[0].name} ${country.currencies[0].symbol}`;
        // value.appendChild(h3);
        const div=document.createElement('div');
        div.classList.add('value');
        div.innerHTML=`
            <h3>${country.name}  ,Region: ${country.region} ,currencies: ${country.currencies[0].name} ${country.currencies[0].symbol}</h3>
            <button onclick="loadCountryDetail('${country.name}')">Details</button>
        `;
        value.appendChild(div);
    })


}

loadCountryDetail=(data)=>{
    const url=`https://restcountries.eu/rest/v2/name/${data}`;
    fetch(url)
    .then(res=>res.json())
    .then(data=>countryInfo(data[0]));
}

const countryInfo=country=>{
    const countryDiv=document.getElementById('country-detail');
    countryDiv.innerHTML=`
        <h5>${country.name}</h5>
        <p>population:${country.population}</p>
        <img  width="400" height="200" src="${country.flag}">
    `;
}