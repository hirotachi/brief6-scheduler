<script setup>
import Home from "./views/Home";

import { computed, ref } from "vue";
import Booking from "@/views/Booking";

const views = { home: Home, booking: Booking };

const currentView = ref("home");

const currentComponent = computed(() => {
  return views[currentView.value];
});

function setCurrentView(name) {
  currentView.value = name;
}
</script>

<template>
  <div class="app">
    <div class="intro">
      <div class="avatar">
        <img
          src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80"
          alt="jhon smith"
        />
      </div>
      <p>Book a meeting with John Smith</p>
    </div>
    <button @click="setCurrentView('booking')">booking view</button>
    <button @click="setCurrentView('home')">home view</button>
    <component :is="currentComponent" />
  </div>
</template>

<style lang="scss">
@use "@/styles/shared.scss" as *;
.app {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.intro {
  background-color: green;
  display: flex;
  flex-direction: column;

  .avatar {
    border-radius: 50%;
    overflow: hidden;
    width: 5rem;
    height: 5rem;
    img {
      object-fit: cover;
      @include size(100%);
    }
  }
}
</style>
