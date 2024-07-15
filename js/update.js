const sunshower = document.getElementById("sunshower");
const stadtshower =  document.getElementById("stadtshower");
const submitbtn = document.getElementById("submit");
const input  = document.getElementById("inp");
let city = [];
let celcius = 0;
pressed = false;
let dis = 0
async function getcelcius(citydata){
    const url = "https://api.open-meteo.com/v1/forecast?latitude="+citydata[7]+"&current=temperature_2m&longitude="+citydata[8]+"&timezone=Europe%2FBerlin";
    return fetch(url)
    .then(res => res.json())
    .then(data =>  data.current.temperature_2m);

}
function randomcity(){
    let rand = csvData[Math.round(Math.random()*csvData.length)];
    while(parseInt(rand[7]) > 90 || parseInt(rand[8]) > 90){
        rand = csvData[Math.round(Math.random()*csvData.length)];
    }
    return rand;
}
async function start(){
    pressed = false;
    document.body.style.height = "120vh";
    city = randomcity();
    stadtshower.innerHTML = city[0];
    input.value = "0";
    celcius =Math.round(await getcelcius(city));
    console.log(celcius)
}

function final(yournum){
    endsage = ""
    dis =  Math.abs(celcius -  yournum);
    const div = document.createElement("div");
    div.className = "c"
    div.id = "finaldiv";
    document.body.appendChild(div);
    const h11 = document.createElement("h1");
    h11.innerHTML = "Wahre Temperatur:   " + celcius;
    const h12 = document.createElement("h1");
    h12.innerHTML = "Deine temperatur:   " + yournum;
    const h13 = document.createElement("h1");
    h13.innerHTML = "Distanz:    " + dis;

    document.getElementById("finaldiv").append(h11);
    document.getElementById("finaldiv").append(h12);
    document.getElementById("finaldiv").append(h13);
    document.body.style.height ="200vh"
    setTimeout(() => {
        document.getElementById("finaldiv").remove()
        start();
    }, 3000);

}
var request = new XMLHttpRequest();  
request.open("GET","../data/All Countries.csv", false);   
request.send(null);  

var csvData = new Array();
var jsonObject = request.responseText.split(/\r?\n|\r/);
for (var i = 0; i < jsonObject.length; i++) {
  csvData.push(jsonObject[i].split(','));
}

submitbtn.onclick = () =>{
    const input =  document.getElementById("inp");
    console.log()
    if(!pressed && !isNaN(parseInt(input.value))){
        pressed = true;
        final(parseInt(input.value))
    }
    
}
const valchecker = window.setInterval(() =>{
    const input  = document.getElementById("inp");
    console.log(input.value)
    if(parseInt(input.value) <= 10 || input.value == ""){
        sunshower.src = "../img/snowflake.png"
    }else{
        sunshower.src = "../img/cloudy.png"
    }
},0.5)

start()

