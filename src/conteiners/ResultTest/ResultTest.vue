<template>
  <div class="main">
    <div>
      <h1>Результаты вашего тестирования:</h1>
      <h2>Совместимость пары - <span class="importantText">Высокая</span></h2>
    </div>
    <div class="resultTest">
      {{ items[3].answers[received.resultVariable-1].label }} 
    </div>
  </div>
</template>
<script>
import {received} from '@/App.vue'
import { QUASI_QUESTIONS } from '../QuasiTest/const/quasiquestions';
export default {
    data : () => ({
        resultCode : 0,
        received,
        items:QUASI_QUESTIONS
    })
}
</script>
<style scoped>
.main {
    text-align: center;
    margin-top: 10%;
    text-shadow: 1px 1px 1px rgb(0, 0, 0),
             2px 2px 1px rgb(0, 0, 0);
}
.resultTest{
    font-size: 1.5em;
    margin: 5% 2%;
}
.importantText{
  color: rgb(98, 252, 98);
}
</style>