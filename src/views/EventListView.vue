<script setup lang="ts">
import { ref, onMounted, computed, watchEffect } from 'vue'
import EventCard from '@/components/EventCard.vue'
import EventService from '@/Services/EventService.ts'
import type { Event } from '@/types'

// import nProgress from 'nprogress'

const events = ref<Event[] | null>([])
const totalEvents = ref(0)
const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / 3)
  return page.value < totalPages
})
const maxEventsReach = computed(() => {
  return limit.value >= totalEvents.value
})
const props = defineProps({
  limit: {
    type: Number,
    required: true,
  },
  page: {
    type: Number,
    required: true,
  },
})
const limit = computed(() => props.limit)
const page = computed(() => props.page)

onMounted(() => {
  watchEffect(() => {
    // events.value = null
    // nProgress.start()
 EventService.getEvents(3, page.value)
      .then((response) => {
        events.value = response.data
        totalEvents.value = response.headers['x-total-count']
      })
      .catch((error) => {
        console.error('There was an error!', error)
      })
      // .finally(() => {
      //   nProgress.done()
      // })
  })
})
</script>

<template>
  <h1>Events For Good</h1>
  <div class="flex flex-col items-center">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <div class="flex w-[290px]">
      <RouterLink
        id="page-prev" class="flex-1 no-underline text-[#2c3e50] text-left"
        :to="{ name: 'event-list-view', query: { limit, page: page - 1 } }"
        rel="prev"
        v-if="page != 1"
        >&#60; Prev Page</RouterLink
      >
      <RouterLink
        id="page-next" class="flex-1 no-underline text-[#2c3e50] text-right"
        :to="{ name: 'event-list-view', query: { limit, page: page + 1 } }"
        rel="next"
        v-if="hasNextPage"
        >Next Page &#62;</RouterLink
      >
    </div>
     <div class="flex w-[290px]">
      <RouterLink
        id="decrease-limit" class="flex-1 no-underline text-[#2c3e50] text-right"
        :to="{ name: 'event-list-view', query: { limit: limit - 1, page } }"
        rel="decrease"
        v-if="limit != 1"
        >&#60; Decrease Limit</RouterLink
      >
      <RouterLink
        id="incrase-limit" class="flex-1 no-underline text-[#2c3e50] text-right"
        :to="{ name: 'event-list-view', query: { limit: limit + 1, page } }"
        rel="incrase"
        v-if="!maxEventsReach"
        >Incrase Limit &#62;</RouterLink
      >
    </div>
  </div>
</template>

