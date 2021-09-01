document.getElementById('error').style.display='none';
document.getElementById('spinner').style.display='none';

const toggleSpinner=value=>{
    document.getElementById('spinner').style.display=value;
}
const toggleSearch=value=>{
    document.getElementById('card').style.display=value;
}

const searchCocktail=()=>{
    const search=document.getElementById('search');
    const searchText=search.value;
    search.value='';
    document.getElementById('error').style.display='none';

    if(searchText==''){
        document.getElementById('error').style.display='block';
    }else{
        toggleSpinner('block');
        toggleSearch('none');
        const url=`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchText}`;
        fetch(url)
        .then(res=>res.json())
        .then(data=>displayData(data.drinks));
    }
}


const displayData=(value)=>{
    const card=document.getElementById('card');
    card.textContent='';
    value?.forEach(data=>{
        console.log(data);
        const div=document.createElement('div');
        div.classList.add('col');
        div.innerHTML=`
        <div onclick=loadData(${data.idDrink}) class="card h-100">
            <img src="${data.strDrinkThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${data.strDrink}</h5>
                <p class="card-text">${data.strInstructions.slice(0,100)}</p>
            </div>
        </div>
        `;
        card.appendChild(div)
    });
    toggleSpinner('none');
    toggleSearch('flex');
}

const loadData=(value)=>{
    const url=`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${value}`;
    fetch(url)
    .then(res=>res.json())
    .then(data=>displaySingle(data.drinks[0]));
}

const displaySingle=(data)=>{
    const value=document.getElementById('single');
    value.textContent='';
    const div=document.createElement('div');
    div.classList.add('col');
    div.innerHTML=`
    <div onclick=loadData(${data.idDrink}) class="card h-100">
    <img src="${data.strDrinkThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${data.strDrink}</h5>
            <p class="card-text">${data.strInstructions.slice(0,100)}</p>
        </div>
    </div>
    `
    value.appendChild(div);
}