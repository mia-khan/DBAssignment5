import { MongoClient } from 'mongodb';

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

async function executePipeline(pipeline) {
  const client = await MongoClient.connect('mongodb://localhost:27017/');
  try {
    const coll = client.db('ieeevisTweets').collection('tweet');
    await coll.aggregate(pipeline).toArray();
    console.log('Pipeline executed successfully.');
  } finally {
    await client.close();
  }
}

const userPipeline = [
  {
    $group: {
      _id: '$user._id',
      user: { $first: '$user' }
    }
  },
  {
    $replaceRoot: {
      newRoot: '$user'
    }
  },
  {
    $out: 'Users'
  }
];

const tweetsOnlyPipeline = [
  {
    $project: {
      _id: 0,
      text: 1,
      user_id: '$user._id'
    }
  },
  {
    $out: 'Tweets_Only'
  }
];

await executePipeline(userPipeline);

await executePipeline(tweetsOnlyPipeline);
