import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { MongoClient } from 'mongodb';

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));

const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'abdul';

app.get('/', (req, res) => {
  res.end('hello from nodejs');
});

app.get('/users', async (req, res) => {
  const username = req.query.username;
  const client = new MongoClient(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('tasks');

    const result = await collection.find({ username }).toArray();

    let text = '';
    let count = 1;
    result.forEach((task) => {
      text += `${count}.${task.task}\n`;
      count += 1;
    });

    const index = text.lastIndexOf('\n');
    text = text.substring(0, index);
    res.send(text);
  } finally {
    await client.close();
  }
});

app.post('/login', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const client = new MongoClient(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('users');

    const result = await collection.findOne({ username });

    if (result && password === result.password) {
      res.redirect(`http://localhost:3000/users?username=${username}`);
    } else {
      res.redirect('http://localhost:3000/invalid');
    }
  } finally {
    await client.close();
  }
});

app.post('/createtask', async (req, res) => {
  const task = req.body.newtask;
  const username = req.body.username;

  const client = new MongoClient(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('tasks');

    await collection.insertOne({ username, task });
  } finally {
    await client.close();
  }

  res.redirect(`http://localhost:3000/users?username=${username}`);
});

app.post('/createacc', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const confirmPassword = req.body.confirmpassword;

  if (password === confirmPassword) {
    const client = new MongoClient(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection('users');

      await collection.insertOne({ username, password });
      console.log('inserted');
      res.redirect('http://localhost:3000/acccreated');
    } finally {
      await client.close();
    }
  }
});

app.post('/deletetask', async (req, res) => {
  const task = req.body.task.substring(2);
  const username = req.body.username;

  const client = new MongoClient(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('tasks');

    await collection.deleteOne({ username, task });
    console.log('deleted');
  } finally {
    await client.close();
  }

  res.redirect(`http://localhost:3000/users?username=${username}`);
});

app.listen(9000, () => {
  console.log('server is running on port 9000');
});
