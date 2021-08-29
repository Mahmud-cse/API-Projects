const searchTeam=()=>{
    const field=document.getElementById('search-field');
    const fieldValue=field.value;
    const url=`https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${fieldValue}`;
    fetch(url)
    .then(res=>res.json())
    .then(data=>displayData(data.teams));
}

const displayData=(value)=>{
    console.log(value[0]);
    const searchResult=document.getElementById('search-result');
    searchResult.textContent='';
    value.forEach(team=>{
        const div=document.createElement('div');
        div.classList.add('col');
        div.innerHTML=`
        <div onclick="lookById(${team.idTeam})" class="card">
        <img src="${team.strTeamBadge}" class="card-img-top w-25 mx-auto" alt="...">
         <div class="card-body">
           <h5 class="card-title text-center">${team.strLeague}</h5>
           <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          </div>
        </div>
        `;
        searchResult.appendChild(div);
    })
}

const lookById=teamId=>{
    const url=`https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${teamId}`;
    fetch(url)
    .then(res=>res.json())
    .then(data=>teamDetail(data.teams[0]));
}

const teamDetail=value=>{
    const next=document.getElementById('team-detail');
    const div=document.createElement('div');
    div.classList.add('col');
    next.textContent='';
    div.innerHTML=`
    <div class="card">
    <img src="${value.strTeamBadge}" class="card-img-top w-25 mx-auto" alt="...">
     <div class="card-body">
       <h5 class="card-title text-center">${value.strLeague}</h5>
       <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      </div>
    </div>
    `;
    next.appendChild(div);
}