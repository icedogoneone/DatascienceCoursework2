print("............................");
print("Query 1: How many unique user are there?");
var r1 = db.tweets.distinct("id_member").length;
print("The number of unique user is :" + (r1 - 1));


print("............................");
print("Query 2: How many tweets(%) did the top 10 users measured by the number of messages) publish?");
print("***** It\'s the screen which can display in MongoDB *****");
print('> db.tweets.aggregate([{$group:{_id:"$id_member", all:{$sum: 1}}}, {$sort:{all: -1}}, {$skip: 1},{$limit: 10}])');
print('{ "_id" : 1484740038, "sum" : 9594 }');
print('{ "_id" : 497145453, "sum" : 4792 }');
print('{ "_id" : 1266803563, "sum" : 4667 }');
print('{ "_id" : 37402072, "sum" : 2715 }');
print('{ "_id" : 1544159024, "sum" : 2321 }');
print('{ "_id" : 418909674, "sum" : 2011 }');
print('{ "_id" : 229045023, "sum" : 1810 }');
print('{ "_id" : 229940852, "sum" : 1640 }');
print('{ "_id" : 29035604, "sum" : 1437 }');
print('{ "_id" : 14525315, "sum" : 1339 }');
print("-*-*-*-*-*-*-*-");
print("So the percentage is " + ((9594 + 4792 + 4667 + 2715 + 2321 + 2011 + 1810 + 1640 + 1437 + 1339) / 1459861 * 100) + "%.");


print("............................");
print("Query 3: What was the earliest and lastet data (YYYY-MM-DD HH:MM:SS) that a message was published?");
db.tweets.ensureIndex({timestamp: -1})
var earliestDate = db.tweets.find().sort({timestamp: 1}).limit(1);
print( "EarliestDate: " + earliestDate[0]["timestamp"]);
var latestDate = db.tweets.find().sort({timestamp: -1}).limit(1);
print( "LatestDate: " + latestDate[0]["timestamp"]);


print("............................");
print("Query 4: What is the mean time delta between all messages?");
var r4 = db.tweets.find({}, {_id: 1, timestamp: 1}).sort({timestamp: -1});
var sumr4 = 0;
for(var i = 0; i < 1459861 - 1; i++){
sumr4 = sumr4 + (r4[i]["timestamp"][8] * 864000 + r4[i]["timestamp"][9] * 86400 + r4[i]["timestamp"][11] * 36000 + r4[i]["timestamp"][12] * 3600 + r4[i]["timestamp"][14] * 600 + r4[i]["timestamp"][15] * 60 + r4[i]["timestamp"][17] * 10 + 1 * r4[i]["timestamp"][18]) - (r4[i + 1]["timestamp"][8] * 864000 + r4[i + 1]["timestamp"][9] * 86400 + r4[i + 1]["timestamp"][11] * 36000 + r4[i + 1]["timestamp"][12] * 3600 + r4[i + 1]["timestamp"][14] * 600 + r4[i + 1]["timestamp"][15] * 60 + r4[i + 1]["timestamp"][17] * 10 + 1 * r4[i + 1]["timestamp"][18]);

}
print(sumr4 / (1459861 - 1));


print("............................");
print("Query 5: What is the mean length of a message?");
var sumr5 = 0;
db.tweets.find({}, {id: 1, text: 1}).forEach(function(o){sumr5 += o.text.length;})
print((sumr5 - 45) / (1459861 - 45));


print("............................");
print("Query 7: What is the average number of hashtags (#) used within a message?");
var sumr7 = 0;
var regularR7 = new RegExp("#", "g");
db.tweets.find({}, {_id: 1, text: 1}).forEach(function(o){
var haver7 = o.text.match(regularR7)
if(haver7 !== null){
sumr7 += haver7.length;
}
})
print("The average number of hashtags is " + (sumr7 / (1459861 - 45)) + " per message.");


print("............................");
print("Query 8: Which area within the UK contains the largest number of published messages? Hint, the geographic latitude and longitude coordinates can be aggregated.");
var England = 0;
var Scotland = 0;
var Welsh = 0;
var NorthernIreland = 0;
db.tweets.find({}, {geo_lat: 1, geo_lng: 1}).forEach(function(o){
if(o.geo_lat >= 49.931241 && o.geo_lat <= 55.808532 && o.geo_lng >= -5.718930 && o.geo_lng <= 1.751773){ England++; }
if(o.geo_lat >= 54.051242 && o.geo_lat <= 58.635431 && o.geo_lng >= -7.547467 && o.geo_lng <= -1.790632){ Scotland++; }
if(o.geo_lat >= 49.376834 && o.geo_lat <= 53.440542 && o.geo_lng >= -5.350202 && o.geo_lng <= -2.515729){ Welsh++; }
if(o.geo_lat >= 54.025435 && o.geo_lat <= 55.233640 && o.geo_lng >= -8.206647 && o.geo_lng <= -5.465558){ NorthernIreland++; }})

print("England have " + England + " tweets.");
print("Scotland have " + Scotland + " tweets.");
print("Welsh have " + Welsh + " tweets.");
print("NorthernIreland have " + NorthernIreland + " tweets.");
