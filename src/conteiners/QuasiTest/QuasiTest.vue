<template>
  <div>
    <div
      v-if="quasiTestingProccess"
      class="testMain"
    >
      <div class="testForm">
        <div class="testQuestion">
          {{ currentQuestion }}
        </div>
        <div>
          <div
            v-for="answer in currentAnswers"
            :key="answer.value"
            class="testAnswers"
          >
            <div>
              <div
                :class="answer.value===selectedAnswer ? 'testAnswerSelected' : ''"
                @click="handleClickAnswer(answer.value)"
              >
                {{ answer.label }}
              </div>
            </div>
          </div>
        </div>
        <div class="testButtonsBlock">
          <button
            class="testBtn btnEffect"
            @click="handleSetPrewStep"
          >
            Назад
          </button>
          <button
            class="testBtn btnEffect"
            @click="handleSetNextStep"
          >
            Ответить
          </button>
        </div>
      </div>
      <div class="testQuote">
        Интересная цитата:<br>{{ currentQuote }}
      </div>
    </div>
    <div
      v-else
      class="testEnd"
    >
      Тест завершен, предоставьте вашему партнеру код для ввода на главной странице: <h1>{{ maleUserCode }}</h1>
    </div>
  </div>
</template>

<script>
import { QUASI_QUESTIONS } from './const/quasiquestions'
import {received} from '@/App.vue'
export default {
    data: () => ({
        selectedAnswer : null,
        selectedItems : [],
        maleUserCode : '',
        quasiTestingProccess : true,
        items : QUASI_QUESTIONS,
        step : 0,
        received
    }), 
    computed : {
    currentItem () {
        return this.items[this.step]
    },
    currentQuestion () {
        return this.currentItem.question
    },
    currentQuote () {
        return this.currentItem.quote
    },
    currentAnswers () {
        return this.currentItem.answers
    },
    },
    methods : {
    handleSetNextStep (){
        if (this.step === 3){
            this.quasiTestingProccess = false
            if (received.testingPhase === ''){
            while (this.maleUserCode.length<9) {
                if (this.maleUserCode.length===1){
                    this.maleUserCode+='2'
                }
                if (this.maleUserCode.length===4){
                    this.maleUserCode+='8'
                }
                this.maleUserCode+=Math.random().toString()[3]
            }
            this.maleUserCode+=this.selectedAnswer
            return
        } else if (received.testingPhase === 'testInMale'){
            while (this.maleUserCode.length<9) {
                if (this.maleUserCode.length===1){
                    this.maleUserCode+='1'
                }
                if (this.maleUserCode.length===4){
                    this.maleUserCode+='0'
                }
                this.maleUserCode+=Math.random().toString()[3]
            }
            this.maleUserCode+=this.selectedAnswer
            return
        }
        }
        if (this.selectedAnswer===null || this.selectedAnswer===undefined){
            return
        }
        if (this.selectedItems[this.step]===undefined){
            this.selectedItems[this.step]=this.selectedAnswer
            this.selectedAnswer=null
        } else {
            if (this.selectedAnswer!==this.selectedItems[this.step]) {
                this.selectedItems[this.step]=this.selectedAnswer
            }
            this.selectedAnswer=this.selectedItems[this.step+1]
        }
        this.step++
     },
    handleSetPrewStep (){
        this.step--
        this.selectedAnswer=this.selectedItems[this.step]
     },

     handleClickAnswer (x){
        this.selectedAnswer=x
    }
    }}
</script>