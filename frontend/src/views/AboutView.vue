
<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

<script>
  import Board from "../components/Board.vue";
  export default {
    components: {Board},
    data() {
      return {
        roomName: '',
        board: [
          [{value: 0, mark: '', color: 'blue'}, {value: 0, mark: '', color: 'blue'}, {value: 0, mark: '', color: 'blue'}],
          [{value: 0, mark: '', color: 'blue'}, {value: 0, mark: '', color: 'blue'}, {value: 0, mark: '', color: 'blue'}],
          [{value: 0, mark: '', color: 'blue'}, {value: 0, mark: '', color: 'blue'}, {value: 0, mark: '', color: 'blue'}],
        ],
        socket: {}
      }
    },
  }
</script>

<template>
  <div class="about">
   <Board :rows="board" />
  </div>
</template>
