const request=require('request');
const geocode=(address,callback)=>{
    //API:Mapbox
    const geo='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token='+process.env.MAPBOX_ACCESS_TOKEN
    request({url:geo, json: true},(error,{body}={})=>{
       if(error){
          callback('Geocoding faied. Check your internet connection!',undefined);
       }
       else if(body.features.length == 0){
          callback('Unable to locate. Please try a different location!',undefined);
    
       }
       else{
          callback(undefined,{
             latitude:body.features[0].center[1],
             longitude:body.features[0].center[0],
             location:body.features[0].place_name
          });  
       }  
    });
 }

module.exports=geocode