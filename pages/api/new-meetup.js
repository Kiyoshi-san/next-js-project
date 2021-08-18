import { MongoClient } from "mongodb"; // THIS MongoClient IS THE OBJECT WHICH WILL ALLOWS US TO CONNECT TO THE CLUSTER

//  /api/new-meetup
// POST /api/new-meetup

async function handler(req, res) {
  if (req.method === "POST") {
      try {
          const data = req.body;
      
          // Connecting to the cluster
          const client = await MongoClient.connect(
             "mongodb+srv://kiyoshi:Teste123@cluster0.ibfql.mongodb.net/base_de_dados_meetups?retryWrites=true&w=majority"
          );
          const db = client.db();
      
          // Collection is similar to the tables in SQL - I am calling meetups, it will generate this collection if it still doesn't exists; The documents is the same as register (registro) in SQL
          const meetupsCollection = db.collection('meetups');
      
          // Will insert one new document in the collection, it accepts a js object
          const result = await meetupsCollection.insertOne(data);

          console.log(result);

          client.close();

          res.status(201).json({ message: 'Meetup inserted succesfully!' }); // 201 response - Inserted successfully
      } catch(error) {
          console.log(error);
      }
  }
}

export default handler;
