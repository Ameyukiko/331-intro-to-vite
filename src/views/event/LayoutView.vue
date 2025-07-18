<script setup lang="ts">
import { ref, onMounted,defineProps } from 'vue'
import type { Event } from '@/types'
import EventService from '@/Services/EventService'
import { useRouter } from 'vue-router'
import router from '@/router'
const props = defineProps ({
  id: {
    type: String,
    required: true
  }
})


const event = ref<Event | null>(null)

onMounted(() => {
  EventService.getEvent(parseInt(props.id))
    .then((response) => {
      event.value = response.data  
    })
    .catch((error) => {
      router.push({
        name: '404-resource-view',
        params: { resource: 'event' }
      })
    })
})
</script>

<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <nav>
      <router-link :to="{name: 'event-detail-view'}"> Details </router-link> |
      <router-link :to="{name: 'event-register-view'}"> Register </router-link> |
      <router-link :to="{name: 'event-edit-view'}"> Edits </router-link> 
    </nav>
    <router-view :event="event" />
  </div>
</template>
