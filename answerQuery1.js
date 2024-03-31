import { MongoClient } from 'mongodb';

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const filter = {'retweeted_status': {'$exists': false}, 'in_reply_to_status_id': null}

const client = await MongoClient.connect(
  'mongodb://localhost:27017/'
);
const coll = client.db('ieeevisTweets').collection('tweet');
const cursor = coll.find(filter);
const result = await cursor.toArray();

console.log("I've found", result.length, " tweets");
await client.close();