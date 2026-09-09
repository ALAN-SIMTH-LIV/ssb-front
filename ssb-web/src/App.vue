<script setup>
const test = () => {
  fetch('/api/test').then(res => {
    console.log(res)
  })
}
</script>

<template>
  <button @click="test">
    点击
  </button>
</template>

<style scoped></style>