const request=require("request");

const callWeatherAPI=({latitude,longitude},callback) => {
    const url=`https://api.darksky.net/forecast/5483ea6ab29d4b6078b62ef5692d5d3a/${latitude},${longitude}?units=si&lang=ar`;
    request({url, json: true}, (error, response)=>{
        if(error){
            callback("Connection error there not able to connect to API",undefined);
        }
        else if(response.body.error){
            callback(response.body.error,undefined);
        }
        else{
            callback(undefined,`The temperature forecast for today is ${response.body.currently.temperature} degrees currently and there is a ${response.body.currently.precipProbability} percentage chance of precipitation`);
        }
    });
}


module.exports={
    callWeatherAPI
}