print("............................");
print("Find incorrect id_member and modify them to zero.");
var regular = /^[0-9]*$/;
db.tweets.find({}, {_id: 1, id_member: 1}).forEach(function(o){
if(!regular.test(o.id_member) || o.id_member < 0){
db.tweets.update({_id: o._id}, {$set: {id_member: 0}}, true, true);
}
})
print("Done");


print("............................");
print("Find incorrect text and modify them to zero.");
var step2 = 0;
db.tweets.find({}, {_id: 1, text: 1}).forEach(function(o){
if(!regular.test(o.text.length)){
step2++;
db.tweets.update({_id: o._id}, {$set: {text: "0"}}, true, true);}})
print("The collection has " + step2 + " incorrect Text.");
print("Done");


print("............................");
print("Find incorrect timestamp and modify them.");
var timeRe = /^2014-06-(2[0-9]|30)\s(([0-1][0-9])|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
db.tweets.find({}, {_id: 1, timestamp: 1}).forEach(function(o){
if(!timeRe.test(o.timestamp)){
db.tweets.update({_id: o._id}, {$set: {timestamp: '2000-00-00 00:00:00'}}, true, true);
print(o.timestamp);}})
print("Done");


print("............................");
print("Find incorrect geo_lat and modify them to zero.");
db.tweets.find({}, {_id: 1, geo_lat: 1}).forEach(function(o){
if(!(o.geo_lat <= 180 && o.geo_lat >= -180)){
db.tweets.update({_id: o._id}, {$set: {geo_lat: '0'}}, true, true);
print(o.geo_lat);
}
})
print("Done");


print("............................");
print("Find incorrect geo_lng and modify them to zero.");
db.tweets.find({}, {_id: 1, geo_lng: 1}).forEach(function(o){
if(!(o.geo_lng <= 90 && o.geo_lng >= -90)){
db.tweets.update({_id: o._id}, {$set: {geo_lng: '0'}}, true, true);
print(o.geo_lng);
}
})
print("Done");

print("............................");