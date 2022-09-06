let weather =    {          // weather object is defined
    "apiKey": "46dfa432dc18508dcd2280f8c9fc8980",           //apiKey field is defined
    fetchWeather: function(city){
        fetch(
            "http://api.openweathermap.org/data/2.5/weather?q=" 
            + city 
            + "&units=metric&appid=" 
            + this.apiKey
        )
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
            /* response is the output give when we make a call to weather api 
                this response is converted to json format(which is readable by JS)*/
    },  
    displayWeather: function(data){  /*This data input is nothing but the json output from teh api*/
        const { name } = data;  // 
        const { icon, description } = data.weather[0]; //[0] is put because weather is an array
        /* icon and description variables will be automatically 
         taken from weather field and stored in this const variables*/ 
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerText = "Weather in " + name; //.class values are put according to our html doc
        document.querySelector(".icon").src = "http://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind Speed: " + speed + "km/h";
        document.querySelector(".weather").classList.remove("loading");
    },
    search: function(){ // this is to aid the search button click listenen
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

document.querySelector(".search button").addEventListener("click", function (){
    weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function(event){
    if(event.key == "Enter"){
        weather.search();
    }
})

weather.fetchWeather("Kharagpur");  // to display weather of kgp when site is loaded