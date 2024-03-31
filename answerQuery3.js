import { MongoClient } from 'mongodb';

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const client = await MongoClient.connect('mongodb://localhost:27017/');
const coll = client.db('ieeevisTweets').collection('tweet');

const pipeline = [
    {
        $group: {
            _id: "$user.screen_name", 
            total_tweets: { $sum: 1 } 
        }
    },
    {
        $sort: { total_tweets: -1 } 
    },
    {
        $limit: 1 
    }
];

const result = await coll.aggregate(pipeline).toArray();
console.log("User with most tweets:", result);

await client.close();

