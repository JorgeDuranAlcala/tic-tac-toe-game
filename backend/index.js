const Express = require("express")();

const Http = require("http").Server(Express);

const Socketio = require("socket.io")(Http, {

  cors: {

    origin: "*",

  },

});

//inputting our position values 

let position = {
  row: 0,
  col: 0
};

let nextTurn = 'player-1'
let rooms = []

Socketio.on('connection', socket => {
    console.log(socket.id, 'connected')
    socket.on('position', pos => {
      console.log('pos')
      Socketio.emit('position', pos);
      socket.broadcast.emit('change-player');
    })

    socket.on('player-selected', player => {
        console.log('player-selected')
        Socketio.emit('player-selected', player)
    })

    
})


//listening to a PORT 

Http.listen(3000, () => {

  console.log("Server up and running...");

});
