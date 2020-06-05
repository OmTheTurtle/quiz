<script>
  import { questionScore, players, enableQuestionClick } from '../../stores.js'
  import { DEFAULT_QUESTION_TEXT } from '../../util/constants.js'

  import Countdown from './Countdown.svelte'
  import Player from './Player.svelte'
  import QuestionButton from './QuestionButton.svelte'

  import TOPICS from '../../mock/topics.mock'
  import QUESTIONS from '../../mock/questions.mock'

  let questionText = DEFAULT_QUESTION_TEXT
  let rapidQuestions = false
  let isGameOver = false
  let sortedPlayers = []

  const switchToRapidQuestions = () => {
    if (confirm('Villámkérdések?')) {
      rapidQuestions = true
      questionScore.set(3000)
      questionText = 'Villámkérdések'
    }
  }

  const updateQuestionScore = event => questionScore.set(+event.target.value)

  const onQuestionClick = event => questionText = event.detail.text

  const noAnswer = () => {
    questionText = DEFAULT_QUESTION_TEXT
    enableQuestionClick.set(true)
  }

  const gameOver = () => {
    if (confirm('Game over?')) {
      isGameOver = true
      sortedPlayers = $players.sort((a, b) => b.score - a.score)
    }
  }
</script>

<div class="flex">
  <section class="mx-4">
    {#if !rapidQuestions}
      <div class="questions">
        {#each TOPICS as topic}
          <div class="question-block">
            <div class="topic text-xl" title={topic}>
              {topic}
            </div>
            {#each QUESTIONS as { points, text }}
              <QuestionButton {points} {text} on:update={onQuestionClick} />
            {/each}
          </div>
        {/each}
      </div>
    {/if}
    <p class="question text-2xl p-2 border border-blue-500 rounded">
      {questionText}
    </p>
  </section>
  <aside>
    {#if rapidQuestions}
      <Countdown minutes={3} />
    {:else}
      <Countdown minutes={7} />
    {/if}

    {#each $players as {name, score}}
      <Player
        name={name}
        score={score}
        on:pointAdded={() => questionText = 'Válassz kérdést!'} />
    {/each}

    <div class="flex justify-between">
      <i class="fa fa-bolt text-blue-500 hover:text-blue-700 mb-1 pl-1"
        on:click={switchToRapidQuestions}
        title="Villámkérdések"></i>
      <i class="fa fa-ban text-blue-500 hover:text-blue-700 mb-1 pl-1"
        on:click={noAnswer}
        title="Nincs válasz"></i>
      <i class="fa fa-bars text-blue-500 hover:text-blue-700 mb-1 pl-1"
        on:click={gameOver}
        title="Game over"></i>
    </div>
    <input
      class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
      type="number"
      bind:value={$questionScore}
      on:change={updateQuestionScore} />
  </aside>
</div>
{#if isGameOver}
  <section>
    <ul>
      {#each $players as player, i}
        <li>
          <p>{i + 1}. {player.name}: {player.score}</p>
        </li>
      {/each}
    </ul>
  </section>
{/if}

<style>
  section {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .question-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    width: 9em;
  }

  .topic {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-align: center;
    min-height: 3em;
  }
  .questions {
    width: 100%;
    flex: 4;
    display: flex;
  }

  .question {
    flex: 1;
    text-align: center;
    width: 100%;
  }

  i.fa {
    font-size: 2rem;
    cursor: pointer;
  }
</style>