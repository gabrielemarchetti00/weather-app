function getData(location) {
  fetch("https://api.weatherapi.com/v1/current.json?key=108a5d096e554fa9a31124008230604&q=" + location)
  .then(function (response) {
    return response.json();
  })
  .then(function(response){
    processData(response, location);
  });
}

function processData(data, loc){
  let text = data.current.condition.text;
  let temp = [];
  temp[0] = data.current.temp_c;
  temp[1] = data.current.temp_f;
  let precip = data.current.precip_mm;
  let wind = data.current.wind_kph;
  let humidity = data.current.humidity;

  let dataObj = new DataObj(text, temp, precip, wind, humidity);

  displayData(dataObj, loc);
}

function displayData(obj, loc){
  const contentDiv = document.querySelector('.content');
  contentDiv.innerHTML = '';
  const titleDiv = document.querySelector('.title');
  titleDiv.textContent = loc;

  const detailsDiv = document.createElement('div');

  for (const prop in obj) {
    const detailDiv = document.createElement('div');
    detailDiv.className = 'detail';
    const cDiv = document.createElement('div');
    const tDiv = document.createElement('div');
    const btn = document.createElement('button');
    btn.id = 'toggle';
    switch(prop){
      case 'txt':
        tDiv.textContent = 'General: ' 
        cDiv.textContent = obj[prop];
        break;
      case 'temp':
        let degree = obj[prop][0];
        tDiv.textContent = 'Temperature [C]: ';
        cDiv.textContent = degree;
        btn.textContent = 'Change to F';
        btn.addEventListener('click', () => {
          if(degree == obj[prop][0]) {
            tDiv.textContent = 'Temperature [F]: ';
            cDiv.textContent = obj[prop][1];
            degree = obj[prop][1];
            btn.textContent = 'Change to C';
          }
          else if(degree == obj[prop][1]){
            tDiv.textContent = 'Temperature [C]: ';
            cDiv.textContent = obj[prop][0];
            degree = obj[prop][0];
            btn.textContent = 'Change to F';
          }
        });
        break;
      case 'pr':
        tDiv.textContent = 'Precipitations [mm]: ';
        cDiv.textContent = obj[prop];
        break;
      case 'w':
        tDiv.textContent = 'Wind [kph]: ';
        cDiv.textContent = obj[prop];
        break;
      case 'h':
        tDiv.textContent = 'Humidity [%]: ';
        cDiv.textContent = obj[prop];
        break;
    }
    detailDiv.appendChild(tDiv);
    detailDiv.appendChild(cDiv);
    if(prop == 'temp'){
      detailDiv.appendChild(btn);
    }
    detailsDiv.appendChild(detailDiv);
  }
  contentDiv.appendChild(detailsDiv);

  changeBackground(obj);
}

function changeBackground(obj){
  for(prop in obj){
    if(prop == 'txt'){
      if(obj[prop].includes('Clear')){
        document.body.style.backgroundImage = 'url(./images/sunny.jpg)';
      }
      else if(obj[prop].includes('cloudy')){
        document.body.style.backgroundImage = 'url(./images/cloud.jpg)';
      }
      else if(obj[prop].includes('rain')){
        document.body.style.backgroundImage = 'url(./images/rain.jpg)';
      }
    }
  }
}


function DataObj(txt, temp, pr, w, h){
  this.txt = txt;
  this.temp = temp;
  this.pr = pr;
  this.w = w;
  this.h = h;
}


const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  let input = document.querySelector('#location');
  getData(input.value);
})

