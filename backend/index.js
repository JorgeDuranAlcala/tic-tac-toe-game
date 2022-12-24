const Express = require("express")();

Express.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next()
})

Express.get('/hello', (req, res) => {
    res.send({ hello:'hello' })
})

const Http = require("http").Server(Express);

const io = require("socket.io")(Http, {

  cors: {

/*     origin: ['http://localhost:5173', 
              'http://192.168.0.103:5173', 
              'http://172.17.0.3:8080/', 
              'http://localhost:8080',
              'http://vue-app:8080'
            ], */
    origin: '*',
    methods: ['GET', 'POST']

  },

});

//inputting our position values 

let position = {
  row: 0,
  col: 0
};

let nextTurn = 'player-1'
let rooms = []

io.on('connection', socket => {
    console.log(socket.id, 'connected')
    socket.on('position', pos => {
      console.log('pos')
      io.emit('position', pos);
      socket.broadcast.emit('change-player');
    })

    socket.on('disconnect', () => {
      console.log(socket.id, 'disconnected')
    })

    socket.on('player-selected', player => {
        console.log('player-selected')
        io.emit('player-selected', player)
    })

    socket.on('create-room', roomName => {
        rooms.push(roomName)
    })

    io.emit('room-list', rooms)

    socket.on('EnterRoom', roomName => {
      socket.join(roomName)
      console.log(socket.id, `enter room ${roomName}`)
      io.to(roomName).emit('player-entered-room', `player ${socket.id} entered the room`)
    })

    
})




//listening to a PORT 

Http.listen(3000, () => {

  console.log("Server up and running...");

});
