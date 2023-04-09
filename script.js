function getData(location) {
  fetch("https://api.weatherapi.com/v1/current.json?key=108a5d096e554fa9a31124008230604&q=" + location)
  .then(function (response) {
    return response.json();
  })
  .then(function(response){
    //console.log(response);
    processData(response);
  });
}

function processData(data){
  let text = data.current.condition.text;
  let tempC = data.current.temp_c;
  let tempF = data.current.temp_f;
  let precip = data.current.precip_mm;
  let wind = data.current.wind_kph;
  let humidity = data.current.humidity;

  let dataObj = new DataObj(text, tempC, tempF, precip, wind, humidity);
}

function displayData(obj, loc){
  const dataDiv = document.querySelector('.data');
  dataDiv.textContent = loc;
}


function DataObj(txt, tc, tf, pr, w, h){
  this.txt = txt;
  this.tc = tc;
  this.tf = tf;
  this.pr = pr;
  this.w = w;
  this.h = h;
}


const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  let input = document.querySelector('#location');
  let dataObj = getData(input.value);
  displayData(dataObj, input.value);
})

