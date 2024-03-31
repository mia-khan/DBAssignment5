import { MongoClient } from 'mongodb';

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const client = await MongoClient.connect('mongodb://localhost:27017/');
const coll = client.db('ieeevisTweets').collection('tweet');

const pipeline = [
    {
        $group: { // // did group by instead of project because project had duplicate screen names 
            _id: "$user.screen_name", 
            followers_count: { $first: "$user.followers_count" }
        }
    },
    {
        $sort: { followers_count: -1 }
    },
    {
        $limit: 10
    }
];

const result = await coll.aggregate(pipeline).toArray();
console.log("Top 10 screen names by followers:", result);

await client.close();