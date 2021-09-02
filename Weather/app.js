const loadData=()=>{
    const id=document.getElementById('inputValue');
    const value=id.value;
    id.value='';
    if(value==''){
        window.alert("Enter a city name");
    }else{
        const url=`https://api.openweathermap.org/data/2.5/forecast?q=${value}&appid=${'414874a28f446fec564dd15b65aff1ee'}`;
        fetch(url)
        .then(res=>res.json())
        .then(data=>displayData(data))
        .catch(error=>console.log(error));
    }
}


const displayData=data=>{
    const cityName=data.city.name;
    const temp=data.list[0].main.temp;
    const realTemp=temp-273.15;
    
    const place=document.getElementById('place');
    place.innerText=`${cityName}`;

    const tempGet=document.getElementById('temps');
    tempGet.innerText=`${realTemp.toFixed(2)}`;

    const cloud=document.getElementById('cloud');
    cloud.innerText=`${data.list[0].weather[0].description}`;

    // weather icon
    const url=`http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`;
    const imgIcon=document.getElementById('weather-icon');
    imgIcon.setAttribute('src',url);
}