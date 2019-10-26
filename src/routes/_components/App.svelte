<script>
  import { questionScore } from '../../stores.js'

  import Countdown from './Countdown.svelte'
  import Player from './Player.svelte'
  import QuestionButton from './QuestionButton.svelte'

  import PLAYERS from '../../mock/players.mock'
  import TOPICS from '../../mock/topics.mock'
  import QUESTIONS from '../../mock/questions.mock'

  let questionText = 'Válassz kérdést!'
  let rapidQuestions = false

  const switchToRapidQuestions = () => {
    if (confirm('Villámkérdések?')) {
      rapidQuestions = true
      questionScore.set(3000)
      questionText = 'Villámkérdések'
    }
  }

  const onQuestionClick = (event) => questionText = event.detail.text
</script>

<div class="flex">
  <section class="mx-4">
    {#if !rapidQuestions}
      <div class="questions">
        {#each TOPICS as topic, i}
          <div class="question-block">
            <span class="topic text-xl" title={topic}>
              {topic}
            </span>
            {#each QUESTIONS as { points, text }}
              <QuestionButton {points} {text} on:update={onQuestionClick} />
            {/each}
          </div>
        {/each}
      </div>
    {/if}
    <p class="question text-2xl p-4 m-8 mb-0 border border-blue-500 rounded">
      {questionText}
    </p>
  </section>
  <aside>
    {#if rapidQuestions}
      <Countdown minutes={3} />
    {:else}
      <Countdown minutes={7} />
    {/if}

    {#each PLAYERS as player}
      <Player on:pointAdded={() => questionText = 'Válassz kérdést!'} name={player} />
    {/each}

    <i class="fa fa-bolt" on:click={switchToRapidQuestions}></i>
    <input
      class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
      type="number"
      bind:value={$questionScore} />
  </aside>
</div>

<style>
  section {
    flex: 5;
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

  span.topic {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-align: center;
    min-height: 3em;
    vertical-align: middle;
  }
  .questions {
    width: 100%;
    flex: 4;
    display: flex;
    justify-content: space-around;
  }

  aside {
    flex: 1;
  }

  p.question {
    flex: 1;
    text-align: center;
    width: 100%;
  }
</style>