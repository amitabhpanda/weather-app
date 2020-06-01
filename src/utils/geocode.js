const request=require("request");


const geoCode = (address, callback) => {
    console.log("address",address);
    const url=`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiY29kZXBhbmRhIiwiYSI6ImNrNmRuamgzaTFvcG0zZXBqYXFpbDBieW4ifQ.t_Xz_wA3me4oxNavn_3SWg&limit=1`;
    request({url, json: true}, (error,response) => {
        if(error){
            callback("Connection error there not able to connect to API",undefined);
        }
        else if(!response.body.features.length){
            callback("Location not found!! Please enter a valid address",undefined);
        }
        else{
            const {center: coordinates, place_name: location}= response.body.features[0]
            const latitude=coordinates[1];
            const longitude=coordinates[0];
            // const latitude=response.body.features[0].center[1];
            // const longitude=response.body.features[0].center[0];
            // const location=response.body.features[0].place_name;
            console.log(latitude,longitude);
            callback(undefined,{
                latitude,
                longitude,
                location
            })
        }
    })
}


module.exports={geoCode}