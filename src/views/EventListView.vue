<script setup lang="ts">
import { ref, onMounted, computed, watchEffect } from 'vue'
import EventCard from '@/components/EventCard.vue'
import EventService from '@/Services/EventService.ts'
import type { Event } from '@/types'

const events = ref<Event[] | null >([])

const props = defineProps({
  page: {
    type: Number,
    required: true
  }
})
const page = computed(() => props.page)

onMounted(() => {
  watchEffect(() => {
    events.value = null
    EventService.getEvents(2, page.value)
      .then((response) => {
        events.value = response.data
      })
      .catch((error) => {
        console.error('There was an error!', error)
      })
  })
})

</script>

<template>
  <h1>Events For Good</h1>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div>
  <RouterLink :to="{name: 'event-list-view', query: { page:page - 1}}"
  rel="prev"
  v-if="page != 1"
  >Prev Page</RouterLink> 
  <RouterLink :to="{name:'event-list-view',query:{page:page + 1 }}" rel="next"
  >   Next Page</RouterLink>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
