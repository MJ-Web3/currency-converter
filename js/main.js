
let selectFrom = document.querySelector('#selectFrom');
let selectTo = document.querySelector('#selectTo');
let totalDiv = document.querySelector('.totalDiv');
let amount = document.querySelector('#amount');
let btn = document.querySelector('.btn');
let api = 'https://v6.exchangerate-api.com/v6/5734f31022db695a3627582d/latest';    //USD

window.addEventListener('DOMContentLoaded',()=>{
    fetch('../data.json')
    .then(f => f.json())
    .then(data => {
        for(i=0;i<data.length;i++){
            let newElementFrom = document.createElement('option');
            let newElementTo = document.createElement('option');
            newElementFrom.setAttribute('value',data[i]);
            newElementFrom.text = data[i];
            newElementTo.setAttribute('value',data[i]);
            newElementTo.text = data[i];
            selectFrom.appendChild(newElementFrom);
            selectTo.appendChild(newElementTo);
        }
        
    })
})

btn.addEventListener('click', ()=>{
    fetch(`${api}/${selectFrom.value}`)
    .then(j => j.json())
    .then(apiData =>{
        if(amount.value == ""){
            totalDiv.innerHTML = `<h1 style="color:red; font-weight:bold;">You Have To Enter The Value</h1>`
        }else if(isNaN(amount.value)){
            totalDiv.innerHTML = `<h1 style="color:red; font-weight:bold;">The Value Has To Be Number Only</h1>`
        }else{
            for(let x in apiData.conversion_rates){
                if(selectTo.value == x){
                    totalDiv.innerHTML= `
                    <h1> 1 ${selectFrom.value} = ${apiData.conversion_rates[x]} ${selectTo.value}</h1>
                    <h1>Total = ${selectTo.value} ${eval(apiData.conversion_rates[x] * amount.value).toFixed(3)}</h1>
                    `
            }}
        }
    })
})



