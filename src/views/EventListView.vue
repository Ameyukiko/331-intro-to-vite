<script setup lang="ts">
import { ref } from 'vue'
import EventCard from '@/components/EventCard.vue'
import type { Event } from '@/types'


const events = ref<Event[]>([])

onMounted(() => {
  axios
    .get('https://my-json-server.typicode.com/Ameyukiko/331-intro-to-vite/events')
    .then((response) => {
      console.log(response.data)
    })
    .catch((error) => {
      console.error('There was an error!', error)
    })
})
</script>

<template>
  <h1>Events For Good</h1>
  <div class="events">
    <EventCard 
    v-for="event in events" 
    :key="event.id" 
    :event="event" />
  </div>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>

