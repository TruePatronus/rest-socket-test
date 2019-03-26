const app = feathers();
const socket = io();

app.configure(feathers.socketio(socket));


app.service('messages').on('created', (message) => {
  console.log('Created a new message locally', message);
});

async function createAndList() {
  await app.service('messages').create({
    text: 'Hello from a browser'
  });

  const messages = await app.service('messages').find();
  const users = await app.service('users').find();
  console.log('Messages', messages);
  console.log('Users', users);
  
}

const button = document.getElementById('btn');

button.addEventListener('click', (e) => {
  console.log(e.target);
  const users = fetch('http://localhost:3030/users')
    .then((res) => {
      res.json().then((result) => {
        console.log(result);
      })
    })
    .catch((err) => {
      console.log(err);
    })
})

app.service('users').on('created', (data) => {
  console.log("User created", data);
})

createAndList();