
const request=require('request');
const forecast=(lat,lon,callback)=>{
    //API:weatherstack
    const url='http://api.weatherstack.com/current?access_key='+process.env.WEATHERSTACK_ACCESS_KEY+'&query='+String(lat)+','+String(lon)
    request({url:url, json: true},(error,{body}={})=>{
       if(error){
          callback('Unable to connect to weather service!',undefined);
       }
       else if(body.error){
          callback('Unable to find location!',undefined);
    
       }
       else{
          
          callback(undefined,
            "'" +body.current.weather_descriptions[0]+"' .It is currently "+body.current.temperature + " degrees and it feels like "+body.current.feelslike+ " degrees outside. Humidity is "+body.current.humidity+'%.'
          );  
       }  
    });
 }

module.exports=forecast