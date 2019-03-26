const path = require('path');
const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');

const app = express(feathers());

const userList = [
  {
    name: "John",
    age: 28
  },
  {
    name: "Jack",
    age: 28
  },
  {
    name: "Andrew",
    age: 17
  },
  {
    name: "Cristian",
    age: 22
  }
]
const messages = [
  {
    text: "kek"
  },
  {
    text: "kek"
  },
  {
    text: "kek"
  },
  {
    text: "kek"
  },
  {
    text: "kek"
  },
  {
    text: "kek"
  },
  {
    text: "kek"
  },
  {
    text: "kek"
  }
]

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.use('/', express.static('public'));

app.configure(express.rest());
app.configure(socketio());

app.use('users', {
  find(params) {
    return Promise.resolve(userList);
  },

  create(data, params) {
    userList.push(data);

    return Promise.resolve(data);
  }
});

app.use('messages', {
  find(params) {
    return Promise.resolve(messages);
  },

  create(data, params) {
    console.log("POST MESSAGES");
    messages.push(data);
    return Promise.resolve(data);
  }
});


app.on('connection', (connection) => {
  console.log('Connected', connection);
  if (connection) {
    app.channel('everyone').join(connection);
  }
  app.publish((data, hook) => {
    return app.channel('everyone');
  });
});




app.use(express.errorHandler());
app.listen(3030);

