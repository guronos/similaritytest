<template>
  <div class="main">
    <div>
      <h1>Контакт для обратной связи</h1>
    </div>
    <div>
      <div class="contactDeveloper">
        <img
          class="iconTelegram"
          src="./telegram.svg"
        >&nbsp; Telegram: &nbsp;<a href="https://t.me/ichschlafe">@ichschlafe</a>
      </div>
    </div>
  </div>
</template>
<style scoped>
.main {
display: flex;
flex-direction: column;
align-items: center;
text-align: center;
}
.iconTelegram {
  width: 1em;
  height: 1em;
  margin-right: 1%;
}
.contactDeveloper {
  display: flex;
  font-size: 20px;
}
</style>