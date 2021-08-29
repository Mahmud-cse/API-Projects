document.getElementById('error-message').style.display='none';
const searchFood=async()=>{
    const searchField=document.getElementById('search-field');
    const searchText=searchField.value;
    searchText.value='';
    document.getElementById('error-message').style.display='none';

    if(searchText==''){
        window.alert("Please Enter food name");
    }else{ 
    const url=`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
     
    try{
        
    const res=await fetch(url);
    const data=await res.json();
    displaySearch(data.meals);
    }catch(error){
        console.log(error);
    }
    
    
    // fetch(url)
    // .then(res=>res.json())
    // .then(data=>displaySearch(data.meals));
    }
}

const displaySearch=data=>{
    const searchResult=document.getElementById('search-result');
    searchResult.textContent='';
    data.forEach(meal=>{
        const div=document.createElement('div');
        div.classList.add('col');
        div.innerHTML=`
        <div onclick=loadMealDetail(${meal.idMeal}) class="card">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">${meal.strInstructions.slice(0,200)}</p>
            </div>
        </div>
    `;
    searchResult.appendChild(div);
    })
}

const loadMealDetail=mealId=>{
    console.log(mealId);
    const url=`https://www.themealdb.com/api/json/v19/1/lookup.php?i=${mealId}`;
    fetch(url)
    .then(res=>res.json())
    .then(data=>mealDetail(data.meals[0]))
    .catch(error=>displayError(error));
}

const displayError=error=>{
    document.getElementById('error-message').style.display='block';
    console.log(console.error());
}

const mealDetail=meal=>{
    const searchResult=document.getElementById('meal-details');
    const div=document.createElement('div');
    div.classList.add('col');
    searchResult.textContent='';
    console.log(`${meal.strMealThumb}`);
    div.innerHTML=`
    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">${meal.strMeal}</h5>
        <p class="card-text">${meal.strInstructions.slice(0,200)}</p>
        <a target="_blank" href="${meal.strYoutube}" class="btn btn-primary">Go somewhere</a>
    </div>
    `;
    searchResult.appendChild(div);
} 