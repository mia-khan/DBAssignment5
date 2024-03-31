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
            tweet_count: { $sum: 1 },
            average_retweets: { $avg: "$retweet_count" } 
        }
    },
    {
        $match: {
            tweet_count: { $gt: 3 } 
        }
    },
    {
        $sort: { average_retweets: -1 } 
    },
    {
        $limit: 10
    }
];

const result = await coll.aggregate(pipeline).toArray();
console.log("Top 10 users by average retweets:", result);

await client.close();
