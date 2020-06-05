<script>
  import { playerCount, players } from '../../stores.js'

  // this is a bit shitty right now
  // hopefully things will improve
  const onSubmit = (event) => {
    let newPlayers = []
    for (let i = 0; i < $playerCount; i++) {
      newPlayers.push({
        name: event.target[i].value || `Játekos${i + 1}`,
        score: $players[i].score
      })
    }
    players.set(newPlayers)
  }
const clearScores = () => players.update(prev => prev.map(it => ({ name: it.name, score: 0 })))
</script>

<form on:submit|preventDefault={onSubmit}
  class="users flex bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
  {#each $players as player, i}
    <input
      id={i}
      type="text"
      value={player.name}
      class="player shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
    <span>{player.score}</span>
  {/each}

  <div class="flex justify-between">
    <button type="button"
      on:cick={clearScores}
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
      Clear scores
    </button>
    <button
      type="submit"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
      Save
    </button>
  </div>
</form>

<style>
  .users {
    flex-direction: column;
    justify-content: space-evenly;
    height: 400px;
  }
  .player {
    padding-left: .75rem;
  }

</style>