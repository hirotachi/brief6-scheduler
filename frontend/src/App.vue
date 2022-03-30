


<template>
  <div>book a meeting with Jhon smith</div>
  <button @click="setCurrentView('booking')">booking view</button>
  <button @click="setCurrentView('home')">home view</button>
  <component :is="currentComponent"/>
</template>

<script setup>
import Home from './views/Home';

import { computed, ref } from 'vue';
import Booking from '@/views/Booking';

const views = {home: Home, booking: Booking}

const currentView = ref("home");




const currentComponent = computed(() => {
  return views[currentView.value];
})

function setCurrentView(name) {
  currentView.value = name
}


</script>


<style>

</style>
