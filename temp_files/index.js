import express from 'express';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import { Server } from 'socket.io';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const client = new MongoClient(process.env.MONGODB_CONNECTION_STRING);

const app = express();
const server = http.createServer(app);

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (request, response) => {
    response.sendFile(__dirname + '/index.html');
});

server.listen(PORT, () => {
    console.log("Server listening on PORT:", PORT);
});

const io = new Server(server);

async function run() {

  try {

    await client.connect();
    const database = client.db('chat');
    const messages = database.collection('messages');

    // Open a Change Stream on the "messages" collection
    const changeStream = messages.watch();

    // Set up a listener when change events are emitted
    changeStream.on("change", next => {
      // Process any change event
      switch (next.operationType) {
        case 'insert':
          io.emit('chat message', next.fullDocument.message);
          console.log(next.fullDocument.message);
          break;
        case 'update':
          io.emit('chat message', next.updateDescription.updatedFields.message);
          console.log(next.updateDescription.updatedFields.message);
      }
    });

  } catch {

    // Ensures that the client will close when you error
    await client.close();
  }
}

run().catch(console.dir);
