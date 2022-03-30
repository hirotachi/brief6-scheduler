<template>
  <div class="form">

    <label>
      <span>Your Personal key:</span>
      <input v-model="personalKey" type="text" placeholder="personal key">
    </label>
    <div class="btns">
      <button class="login" @click="login">sign in</button>
      <p class="create">don't have a key yet?
        <span
            @click="changeCurrentView"
            class="link">
          create one
        </span>
      </p>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue';

const personalKey = ref('');
function login() {
  console.log(personalKey.value);
}

defineProps(['changeCurrentView']);
</script>

<style scoped>

</style>