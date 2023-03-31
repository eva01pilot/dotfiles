import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import axios from 'axios'
const marshallOptions = {
  // Whether to automatically convert empty strings, blobs, and sets to `null`.
  convertEmptyValues: false, // false, by default.
  // Whether to remove undefined values while marshalling.
  removeUndefinedValues: true, // false, by default.
  // Whether to convert typeof object to map attribute.
  convertClassInstanceToMap: false, // false, by default.
};

const unmarshallOptions = {
  // Whether to return numbers as a string instead of converting them to native JavaScript numbers.
  wrapNumbers: false, // false, by default.
};
function deg2rad(degrees){
  var pi = Math.PI;
  return degrees * (pi/180);
}
function rad2deg(radians){
  var pi = Math.PI;
  return radians * (180/pi);
}
function getDistanceBetweenPoints(latitude1, longitude1, latitude2, longitude2){
    const theta = longitude1 - longitude2; 
    let distance = (Math.sin(deg2rad(latitude1)) * Math.sin(deg2rad(latitude2))) + (Math.cos(deg2rad(latitude1)) * Math.cos(deg2rad(latitude2)) * Math.cos(deg2rad(theta))); 
    distance = Math.acos(distance); 
    distance = rad2deg(distance); 
    distance = distance * 60 * 1.1515;
    distance = distance * 1.609344;
    return distance * 1000 
}

export const handler = async(event, context) => {
    const method = event.requestContext.http.method
    const ddb = new DynamoDBClient({region:"eu-central-1"});
    const ddbDocClient = DynamoDBDocumentClient.from(ddb, {
      marshallOptions,
      unmarshallOptions,
    });
    let result = {}
    switch(method){
        case 'GET': {
            const date = event.queryStringParameters.date
            const member_id = event.queryStringParameters.member_id
            const access_token = event.queryStringParameters.access_token
            const domain = event.queryStringParameters.domain
            const userRes = await axios.post(`${domain}/rest/user.current?auth=${access_token}`)
            const isAdminRes = await axios.post(`${domain}/rest/profile?access_token=${access_token}`)
            const isAdmin = isAdminRes.data.result['ADMIN']
            const structure = userRes.data.result['UF_DEPARTMENT'][0]
            if(date){
            const timeStart = '00:00:00'
            const timeEnd = '23:59:59'
            const dateTimeStart = date + ' ' + timeStart
            const dateTimeEnd = date + ' ' + timeEnd
            const date1 = (new Date(dateTimeStart).valueOf()/1000).toString()
            const date2 = (new Date(dateTimeEnd).valueOf()/1000).toString()
            const input = {
                "ExpressionAttributeValues": {
                    ":date1":{
                        "N": date1,
                    },
                    ":date2":{
                        "N": date2
                    },
                    ":member_id":{
                        "S": member_id
                    },
                },
                "ConsistentRead": true,
                
                "ExpressionAttributeNames": { "#date": "time", "#member": "member_id" },
                "FilterExpression": "#date BETWEEN :date1 and :date2 AND #member = :member_id",
                "TableName": "Coordinates-cwagkzfuzja6xlxezsuh2v3ufi-develop"
            }
            const command = new ScanCommand(input)
            let pointsRes, userIDs
            try{
                pointsRes = await ddb.send(command)
                const points = pointsRes.Items
                const users = {}
                userIDs = Array.from(new Set(points.map((p)=>p.crm_id.S)))
                const userRess = isAdminRes ? await axios.post(`${domain}/rest/user.get?access_token=${access_token}`, {
                    FILTER:{
                        ID: userIDs,
                    }
                }) : await axios.post(`${domain}/rest/user.get?access_token=${access_token}`, {
                    FILTER:{
                        ID: userIDs,
                        UF_DEPARTMENT: [structure]
                    }
                })
                const us = Array.isArray(userRess.data.result) ? userRess.data.result.map((u)=>u.ID) : userRess.data.result['ID']
                us.forEach((id)=>{
                    users[id] = {}
                })
                points.forEach((point, i)=>{
                    const latitude1 = points[i].lat.N
                    const longitude1 = points[i].long.N
                    const latitude2 = points[i+1].lat.N
                    const longitude2 = points[i+1].long.N
                    const accuracy = point[i+1].horizontal_accuracy.N
                    const range = getDistanceBetweenPoints(latitude1, longitude1, latitude2, longitude2)
                    if(range<accuracy){
                        delete point[i+1]
                    }
                })
                points.forEach((point)=>{
                    if(!us.includes(point.crm_id.S)) return
                    users[point.crm_id.S][point.time.N] = {
                    msg_id: point.message_id.S,
                    coordinates: [point.lat.N, point.long.N]
                } 
                })
                result = users

            }
            catch(e){
                result = e
            }
            }
            break;
        }
        case 'POST':{
            const { lat, long, time, horizontal_accuracy, message_id, tg_id } = JSON.parse(event.body)
            const input = {
                "ExpressionAttributeValues": {
                    ":tg_id":{
                        "S": tg_id,
                    },
                },
                "ConsistentRead": true,
                
                "ExpressionAttributeNames": { "#tgid": "tg_id" },
                "FilterExpression": "#tgid = :tg_id",
                "TableName": "GeoClients-cwagkzfuzja6xlxezsuh2v3ufi-develop"
            }
            const getClient = new ScanCommand(input)
            
            const clientRes = await ddb.send(getClient)
            const client = clientRes.Items[0]
            result = client
            const items = {
                "Item": {
                    "id": message_id,
                    "lat": lat,
                    "long":long,
                    "time":  +time, 
                    "horizontal_accuracy": horizontal_accuracy,
                    "crm_id": client.crm_id.S,
                    "member_id": client.member_id.S,
                    "message_id":message_id,
                },
                "TableName": "Coordinates-cwagkzfuzja6xlxezsuh2v3ufi-develop"
            };
            const command = new PutCommand(items);
            try{
                result = await ddbDocClient.send(command)
                
            }catch(e){
                result = e
            }
           
            break;
        }
        case 'PUT': {
            const { settingsObj, tg_id, crm_id, member_id, structure } = JSON.parse(event.body)
            const input = {
                "Item": {
                    "id": tg_id,
                    "settings":  JSON.stringify(settingsObj),
                    "member_id": member_id,
                    "tg_id": tg_id,
                    "crm_id": crm_id,
                },
                "ReturnConsumedCapacity": "TOTAL",
                "TableName": "GeoClients-cwagkzfuzja6xlxezsuh2v3ufi-develop"
            }
            const command = new PutCommand(input);
            try{
                result = await ddbDocClient.send(command);
            } catch(e){
                result = e
            }
            break;
        }
    }
    const response = {
        statusCode: 200,
        headers:{
            "Access-Control-Allow-Origin": "*",  
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT"
        },
        body: JSON.stringify(result),
    };
    return response;
};
