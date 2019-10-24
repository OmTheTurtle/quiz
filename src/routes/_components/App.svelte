<script>
  import { questionScore } from '../../stores.js'

  import Countdown from './Countdown.svelte'
  import Player from './Player.svelte'
  import QuestionButton from './QuestionButton.svelte'

  import PLAYERS from '../../mock/players.mock.js'
  import QUESTIONS from '../../mock/questions.mock.js'

  let questionText = ''
  let rapidQuestions = false

  const switchToRapidQuestions = () => {
    if (confirm('Villámkérdések?')) {
      rapidQuestions = true
      questionScore.set(3000)
    }
  }

  const onQuestionClick = (event) => questionText = event.detail.text
</script>

{#if rapidQuestions}
   <Countdown minutes={3} />
{:else}
   <Countdown minutes={7} />
{/if}

<i class="fa fa-bolt" on:click={switchToRapidQuestions}></i>
<br>

{#each PLAYERS as player}
  <Player on:pointAdded={() => questionText = ''} name={player} />
{/each}

{#if !rapidQuestions}
  {#each QUESTIONS as { points, text }}
    <QuestionButton {points} {text} on:update={onQuestionClick} />
  {/each}
{/if}

<p>{questionText}</p>
