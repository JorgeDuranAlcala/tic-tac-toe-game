<script >

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
        currentPlayer: 'player-1',
        winner: ''
      }
    },
    computed: {
      colors() {
        return {1: this.currentPlayer === 'player-1' ? 'red' : 'green', 0: 'blue'};
      }
    },
    methods: {
      selectCell(row, col) {
        //alert('row: ' + row + '-' + 'col: ' + col)
        if(this.rows[row][col].value === 0) {
          this.rows[row][col].value = 1;
          this.rows[row][col].mark = this.currentPlayer === 'player-1' ? 'x' : 'o';
          this.rows[row][col].color = this.currentPlayer === 'player-1' ? 'red' : 'green';
          this.changePlayer()
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
            console.log(element)
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
    <table>
      <tbody>
        <tr v-for="(row, rowindex) in rows" :key="rowindex">
          <td @click="selectCell(rowindex, colindex)" v-for="(col, colindex) in row" class="square" :class="col.color" :key="rowindex-colindex">{{ col.mark }}</td>
        </tr>
      </tbody>
    </table>
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