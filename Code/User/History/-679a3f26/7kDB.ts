export default function getDistanceBetweenPoints(latitude1, longitude1, latitude2, longitude2){
    const theta = longitude1 - longitude2; 
    let distance = (Math.sin(deg2rad(latitude1)) * Math.sin(deg2rad(latitude2))) + (Math.cos(deg2rad(latitude1)) * Math.cos(deg2rad(latitude2)) * Math.cos(deg2rad(theta))); 
    distance = Math.acos(distance); 
    distance = rad2deg(distance); 
    distance = distance * 60 * 1.1515;
    distance = distance * 1.609344;
    return distance * 1000 
}
function deg2rad(degrees){
    var pi = Math.PI;
    return degrees * (pi/180);
  }
  function rad2deg(radians){
    var pi = Math.PI;
    return radians * (180/pi);
  }