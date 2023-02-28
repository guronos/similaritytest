<template>
  <div>
    <div
      v-show="received.showWelcomeBlock"
    >
      <div class="main">
        <div class="greetings">
          <h1>Добро пожаловать на SimilarityTest!</h1>
          <h4>Наш сервис позволяет определить совместимость пары.</h4>
          Обращаем внимание, для участия в тестировании потребуется поочередное прохождение теста обоими партнерами.<br>
          Ответы на вопросы остаются анонимными, Вашему партнеру будет предоставлен только результат тестирования.
        </div>
        <div class="buttonsBlock">
          <button
            class="btn btnEffect"
            type="button"
            @click="handleClickBeginTesting(1)"
          >
            Начать тестирование
          </button>
          <button
            class="btn btnEffect"
            type="button"
            @click="handleClickInputReferalCode"
          >
            Ввести код партнера
          </button>  
        </div>        
      </div>
    </div>
    <div
      v-show="received.clickInputCode"
      class="main"
    >
      <div>
        <h1>Введите код предоставленный Вам второй половинкой</h1>
      </div>
      <div>
        <input
          v-model="securityCode"
          class="inputCode"
          type="text"
          placeholder="Введите код"
        >
        <div>
          <button
            v-show="!received.testingPhase"
            class="btn btnEffect"
            @click="handleValidation"
          >
            Проверить
          </button>
          <router-link to="/mtest">
            <button
              v-show="received.testingPhase==='testInMale'"
              class="btn btnEffect"
            >
              Пройти тестирование
            </button>
          </router-link>
          <router-link to="/test">
            <button
              v-show="received.testingPhase==='testInFemale'"
              class="btn btnEffect"
            >
              Пройти тестирование
            </button>
          </router-link>
          <router-link to="/result">
            <button
              v-show="received.testingPhase==='testResult'"
              class="btn btnEffect"
            >
              Получить результат тестирования
            </button>
          </router-link>
        </div>
        <div class="error">
          {{ errorCode }}
        </div>
      </div>
    </div>
    <div
      v-show="received.clickBeginTesting"
      class="main"
    >
      <div>
        <h1>Выберите Ваш пол</h1>
      </div>
      <div class="buttonsBlock">
        <router-link to="/test">
          <button
            class="btn btnEffect"
            @click="handleClickBeginTesting(7)"
          >
            Женский
          </button>
        </router-link>
        <router-link to="/mtest">
          <button
            class="btn btnEffect"
            @click="handleClickBeginTesting(2)"
          >
            Мужской
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import {received} from '@/App.vue'
export default {
    data : () => ({
        securityCode : '',
        errorCode : '',
        received

    }),
    methods : {
        handleClickInputReferalCode () {
            received.showWelcomeBlock = false
            received.clickInputCode = true
            return 
        },
        handleValidation () {
            if (this.securityCode===''){
                this.errorCode = 'Введите код!'
            return
            }
            if (this.securityCode.length===10){
                if (this.securityCode[1]==7 && this.securityCode[4]==5){// 7 и 5 - код для мужчины от женщины, прошедшей входное тестирование
                    this.errorCode = ''
                    received.testingPhase = 'testInMale'
                    return
                }
                if (this.securityCode[1]==2 && this.securityCode[4]==8){// 2 и 8 - код для женщины от мужчины, прошедшего входное тестирование
                    this.errorCode = ''
                    received.testingPhase = 'testInFemale'
                    received.resultInReferalCodeForFemale = this.securityCode[9]
                    return
                }
                if (this.securityCode[1]==='1' && this.securityCode[4]==='0'){// 1 и 0 - код с результатом тестирования
                    this.errorCode = ''
                    received.testingPhase = 'testResult'
                    received.resultVariable = this.securityCode[9]
                    return
                } else {
                    this.errorCode = 'Введенный код не найден, проверте введенные данные или уточните код у Вашей второй половинки.'
                }
            } else {
                    this.errorCode = 'Введенный код не найден, проверьте введенные данные или уточните код у Вашей второй половинки.'
                }
        },
        handleClickBeginTesting (n){
            received.showWelcomeBlock = false
            if (n===1){
                received.clickBeginTesting = `${n}`
            } else if (n===7 || n===2) {
                received.clickBeginTesting += n
            }
        }
    }
}
</script>
<style scoped>
.main {
    margin: 10% 2%;
    display: flex;
    flex-direction:column;
    text-align: center;
    text-shadow: 1px 1px 1px rgb(0, 0, 0),
             2px 2px 1px rgb(197, 78, 187);
    padding-bottom: 10%;
}
.greetings {
    text-align: center;
    text-shadow: 1px 1px 1px rgb(0, 0, 0),
             2px 2px 1px rgb(197, 78, 187);
    margin-bottom: 5%;
}
.inputCode{
height: 2em;
text-align: center;
margin: 1em 0;
border: 2px solid rgb(255, 136, 0);
border-radius: 30px; 
}
.inputCode:hover{
height: 2em;
text-align: center;
margin-bottom: 1em;
border: 2px solid rgb(225, 0, 255);
border-radius: 30px; 
}
.buttonsBlock{
  display: flex;
    justify-content: space-evenly;
}
.btn {
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
  font-size: 1em;
  margin: 1%;
}
.error {
    color: #d900ec;
    font-weight: bold;
    font-size: 2em;
    text-shadow: 1px 1px 1px rgb(0, 0, 0),
             2px 2px 1px rgb(0, 0, 0);
}
</style>