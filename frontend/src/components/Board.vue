<script >
  import socket from 'socket.io-client';
  export default {
    inject: ['confetti'],
    props: {
      rows: {
        required: true
      }
    },
    data() {
      return {
        //colors: {1: 'red', 0: 'blue'},
        player: '',
        currentPlayer: 'player-1',
        winner: '',
        socket: {},
        roomCreated: false,
        roomName: '',
        playerOneSelected: false,
        playerTwoSelected: false,
      }
    },
    computed: {
      colors() {
        return {1: this.currentPlayer === 'player-1' ? 'red' : 'green', 0: 'blue'};
      },
      gameShouldStart() {
        return this.playerOneSelected && this.playerTwoSelected
      },
      shouldSelectCell() {
        return this.currentPlayer === this.player;
      }
    },
    created() {
      this.socket = socket('http://localhost:3000')
    },
    mounted() {
      this.socket.on('position', ({ row, col }) => {
        this.selectCell(row, col)
      })
      //console.log(this.socket)
      this.socket.on('player-selected', (player) => {
        if(player === 'player-1') this.playerOneSelected = true;
        if(player === 'player-2') this.playerTwoSelected = true;
      })
      
      this.socket.on('change-player', () => {
          this.changePlayer()  
      })
    },
    unmounted() {
      this.socket.close()
      this.socket = {}
    },
    methods: {
      sendPositionEvent(row, col) {
        this.socket.emit('position', { row, col })
      },
      changePlayerEvent() {
        this.socket.emit('change-player')
      },
      selectPlayer(player) {
        this.player = player;
        this.socket.emit('player-selected', player)
      },
      selectCell(row, col) {
        //alert('row: ' + row + '-' + 'col: ' + col)
        //console.log(this.currentPlayer, this.player)
        if(this.rows[row][col].value === 0) {
          this.rows[row][col].value = 1;
          this.rows[row][col].mark = this.currentPlayer === 'player-1' ? 'x' : 'o';
          this.rows[row][col].color = this.currentPlayer === 'player-1' ? 'red' : 'green';
          this.sendPositionEvent(row, col)
          //this.changePlayer()
          //this.changePlayerEvent()
        }
        setTimeout(() => {
          this.checkIfSomeoneWon()
        }, 200)
      },
      reset() {
        for (let row = 0; row < this.rows.length; row++) {
          for (let col = 0; col < this.rows[row].length; col++) {
            this.rows[row][col].value = 0;
            this.rows[row][col].mark = '';
            this.rows[row][col].color = 'blue';
          }
        }
      },
      changePlayer() {
       // this.socket.emit('change-player')
        this.currentPlayer = this.currentPlayer !== 'player-1' ? 'player-1' : 'player-2';
      },
      checkIfPlayerOneWon(elements) {
        return elements.every(el => el.mark === 'x')
      },
      checkIfPlayerTwoWon(elements) {
        return elements.every(el => el.mark === 'o')
      },
      checkCols(rows) {
          for (let i = 0; i < 3; i++) {
            const elements = [rows[0][i], rows[1][i], rows[2][i]]
            const n = elements.map(e => e.value).reduce((a,b) => a + b, 0)
            if(n === 3 && this.checkIfPlayerOneWon(elements)) {
              this.winner = 'player-1'
              return true
            }
            else if (n === 3 && this.checkIfPlayerTwoWon(elements)) {
              this.winner = 'player-2'
              return true
            }
          }
          return false
        },
      checkRows(rows) {
          for (let i = 0; i < 3; i++) {
            const elements = [rows[i][0], rows[i][1], rows[i][2]]
            const n = elements.map(e => e.value).reduce((a,b) => a + b, 0)
            if(n === 3 && this.checkIfPlayerOneWon(elements)) {
              this.winner = 'player-1'
              return true
            }
            else if (n === 3 && this.checkIfPlayerTwoWon(elements)) {
              this.winner = 'player-2'
              return true
            }
          }
          return false
        },
        firstCondition(rows) {
          let total = 0
          let count = 2
          const elements = []
          for (let i = 0; i < rows.length; i++) {
            total += this.rows[i][count].value;
            elements.push(this.rows[i][count])
            count--
          }
            if(total === 3 && this.checkIfPlayerOneWon(elements)) {
              this.winner = 'player-1'
              return true
            }
            else if (total === 3 && this.checkIfPlayerTwoWon(elements)) {
              this.winner = 'player-2'
              return true
            }
          return false
        },
        secondCondition(rows) {
          let total = 0
          let count = 0
          const elements = []
          for (let i = 0; i < rows.length; i++) {
            const element = this.rows[i][count]
            total += element.value;
            elements.push(element)
            count++
          }
            if(total === 3 && this.checkIfPlayerOneWon(elements)) {
              this.winner = 'player-1'
              return true
            }
            else if (total === 3 && this.checkIfPlayerTwoWon(elements)) {
              this.winner = 'player-2'
              return true
            }
          return false
        },
      checkIfSomeoneWon() {
        //const firstCondition = this.firstCondition(this.rows);
        //const secondCondition = [this.rows[0][0].value, this.rows[1][1].value, this.rows[2][2].value].every(n => n === 1);
        //const thirdCondition = [this.rows[0][0].value, this.rows[1][0].value, this.rows[2][0].value].every(n => n === 1);
  
      
        if (
            this.firstCondition(this.rows) || 
            this.secondCondition(this.rows) || 
            this.checkRows(this.rows) || 
            this.checkCols(this.rows)
          ) {
            //this.confetti.start()
            this.confetti.start()
            alert(`${this.winner} won, congrats `)
            this.reset()
        }
      }
    }
  }
   
</script>
<template>

<div class="container">
      <div v-if="!gameShouldStart">
         <button :disabled="playerOneSelected" @click="selectPlayer('player-1')" >Select player 1</button>
        <button :disabled="playerTwoSelected" @click="selectPlayer('player-2')" >Select player 2</button>
      </div>
     <div v-else >
         <table>
        <tbody>
          <tr v-for="(row, rowindex) in rows" :key="rowindex">
            
            <td v-if="shouldSelectCell" @click="selectCell(rowindex, colindex)" v-for="(col, colindex) in row" class="square" :class="col.color" :key="rowindex-colindex">{{ col.mark }}</td>
            <td v-else v-for="(col, colindex) in row" class="square" :class="col.color" :key="rowindex-colindex">{{ col.mark }}</td>
          </tr>
        </tbody>
      </table>
     </div>

    <br>
    <div class="player-turn">
      <div class="flex justify-content-sb">
        <h2>Next turn: {{ currentPlayer }}</h2>
        <div :class="currentPlayer === 'player-1' ? 'red' : 'green'" class="mini-square"></div>
      </div>
    </div>
    <div>
      <button class="btn" @click="reset">Reset game</button>
    </div>
</div>

</template>

<style>
  .container {
    width: 100%;
    height: 100vh;
  }

  .btn {
    padding: 1rem;
    border: none;
    border-radius: 10px;
    margin-top: 10px;
    background-color: cyan;
    color: black;
  }

  .flex {
    display: flex;
  }

  .justify-content-sb {
    justify-content: space-between;
  }

  .player-turn {
    padding: 2rem;
    background-color: rgb(3, 3, 49);
    color: white
  }

  .red {
    background-color: red;
  }

  .blue {
    background-color: blue;
  }

  .green {
    background-color: green;
  }

  .mini-square {
    padding: 1rem;
  }

  .square {
    padding: 2rem;
    margin: 1rem;
    transition: all ease .5s;
  }

</style>
