<template>
  <div>
    <div
      v-if="testingProccess"
      class="testMain"
    >
      <div class="testForm">
        <div class="testQuestion">
          {{ currentQuestion }}
        </div>
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
      v-else-if="received.testingPhase === 'testInFemale'"
      class="testEnd"
    >
      <h1>Тест завершен.</h1> 
      Код с результатами тестирования: <h2>{{ femaleUserCode }}</h2>
      Для ознакомления с результатом введите код на главной странице.<br>
      Не забудьте предоставить код Вашему партнеру.
    </div>
    <div
      v-else
      class="testEnd"
    >
      Первый этап тестирования завершен, для продолжения тестирования предоставьте Вашему партнеру код для ввода на главной странице:<h1>{{ femaleUserCode }}</h1>
    </div>
  </div>
</template>

<script>
import {received} from '@/App.vue'
import { QUESTION_ITEMS } from './const/questions'
export default {
    data: () => ({
        selectedAnswer : null,
        selectedItems : [],
        femaleUserCode : '',
        received,
        testingProccess : true,
        items : QUESTION_ITEMS,
        step : 0
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
    }, methods : {
    handleSetNextStep (){
        if (this.step === 20){ 
            this.testingProccess = false
            if (received.testingPhase === ''){
            while (this.femaleUserCode.length<10) {
                if (this.femaleUserCode.length===1){
                    this.femaleUserCode+='7'
                }
                if (this.femaleUserCode.length===4){
                    this.femaleUserCode+='5'
                }
                this.femaleUserCode+=Math.random().toString()[3]
            }
            return
        } else if (received.testingPhase === 'testInFemale'){
            while (this.femaleUserCode.length<9) {
                if (this.femaleUserCode.length===1){
                    this.femaleUserCode+='1'
                }
                if (this.femaleUserCode.length===4){
                    this.femaleUserCode+='0'
                }
                this.femaleUserCode+=Math.random().toString()[3]
            }             
            this.femaleUserCode+=received.resultInReferalCodeForFemale
            received.resultInReferalCodeForFemale=''
            return
        }}
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
        localStorage.setItem('step', this.step)
        localStorage.setItem('selectedItems', JSON.stringify(this.selectedItems))
                this.step++
     },
    handleSetPrewStep (){
        this.step--
        this.selectedAnswer=this.selectedItems[this.step]
     },

     handleClickAnswer (x){
        this.selectedAnswer=x
    }
    }, mounted (){
        const step = localStorage.getItem('step')
        const selectedItems = localStorage.getItem('selectedItems')
        if (step){
            this.step=step
        }
        if (selectedItems) {
            this.selectedItems = JSON.parse(selectedItems)
        }
    }}
</script>

<style>
.testMain {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto 2%;
}
.testForm{
width: 75%;
margin: 3% 0;
}
.testQuestion {
    border: 2px solid #f88456;
    border-radius: 8px;
    background:linear-gradient(15deg, #FB6C1F 10%, #D2691E 74%);
    margin: 1% auto;
    align-items: center;
    justify-content: center;
    display: flex;
    color: rgb(255, 255, 255);
    }
.testAnswers {
    border: 2px solid #e97247;
    border-radius: 12px 0;
    text-align: center;
    background:linear-gradient(315deg, #F4A460 0%, #FF7F50 74%);
    color: black;
    margin: 1% auto;
}
.testAnswers:hover {
    border: 2px solid rgb(255, 69, 0);
    border-radius: 12px 0;
    text-align: center;
    background:linear-gradient(315deg, #FF8C00 0%, #FF4500 74%);
    color: rgb(247, 245, 245);
    margin: 1% auto;
}
.testQuote {
    border: 2px solid rgb(172, 135, 55, 0.37);
    border-radius: 12px 0;
    margin: 0 2%;
    width: 25%;
    color: rgb(71, 65, 65);
    background:linear-gradient(315deg, #FFDEAD 0%, #F4A460 74%);
}
.testAnswerSelected {
    border: 3px solid rgb(255, 218, 185);
    border-radius: 12px 0;
    text-align: center;
    background:linear-gradient(315deg, #EE82EE 0%, #f547f5 74%);
    color: rgb(0, 0, 0);
}
.testButtonsBlock {
    display: flex;
    justify-content: space-between;
}
.testBtn {
  color: #fff;
  border-radius: 5px;
  padding: 10px 25px;
  font-family: 'Lato', sans-serif;
  font-weight: 500;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
   box-shadow:inset 2px 2px 2px 0 rgba(255,255,255,.5),
   7px 7px 20px 0 rgba(0,0,0,.1),
   4px 4px 5px 0 rgba(0,0,0,.1);
  outline: none;
  z-index: 55;
  font-size: 1em;
}
.btnEffect {
  border: none;
  transition: all 0.3s ease;
  overflow: hidden;
}
.btnEffect:after {
  position: absolute;
  content: " ";
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
   background-color: #1fd1f9;
background-image: linear-gradient(315deg, #b621fe 0%, #D2691E 74%);
  transition: all 0.3s ease;
}
.btnEffect:hover {
  background: transparent;
  box-shadow:  4px 4px 6px 0 rgba(255,255,255,.5),
              -4px -4px 6px 0 rgba(116, 125, 136, .2), 
    inset -4px -4px 6px 0 rgba(255,255,255,.5),
    inset 4px 4px 6px 0 rgba(116, 125, 136, .3);
  color: #fff;
}
.btnEffect:hover:after {
  -webkit-transform: scale(2) rotate(180deg);
  transform: scale(2) rotate(180deg);
  box-shadow:  4px 4px 6px 0 rgba(255,255,255,.5),
              -4px -4px 6px 0 rgba(116, 125, 136, .2), 
    inset -4px -4px 6px 0 rgba(255,255,255,.5),
    inset 4px 4px 6px 0 rgba(116, 125, 136, .3);
}
.testEnd {
    font-size: 1.5em;
    text-align: center;
    margin-top: 10%;
    text-shadow: 1px 1px 1px rgb(0, 0, 0),
             2px 2px 1px rgb(197, 78, 187);
}
@media(max-width: 600px) {
.testMain {
    flex-direction: column;
    margin: auto 2%;
}
.testForm, .testQuote{
    width: 100%;
    margin: 1% 0;
}
.testAnswers {
   margin: 2.5% auto;
}
}
</style>