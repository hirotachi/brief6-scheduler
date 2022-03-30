<template>
<div>register button <p>already have a personal key <span @click="changeCurrentView">login</span></p></div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps(["changeCurrentView"]);
</script>

<style scoped>

</style>