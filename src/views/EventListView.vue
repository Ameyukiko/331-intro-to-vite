<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import EventCard from '@/components/EventCard.vue'
import EventService from '@/Services/EventService.ts'
import type { Event } from '@/types'
import router from '@/router'

const events = ref<Event[] | null>(null)
const totalEvents = ref(0)
const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / limit.value)
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
  // watchEffect(() => {
  //   EventService.getEvents(limit.value, page.value)
  //     // EventService.getEvents(3, page.value)
  //     .then((response) => {
  //       events.value = response.data
  //       totalEvents.value = response.headers['x-total-count']
  //     })
  //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //     .catch((error) => {
  //       router.push({ name: 'network-error-view' })
  //     })
  updateKeyword()
  })

const keyword = ref('')
function updateKeyword() {
  let queryFunction;
  if (keyword.value === '') {
    queryFunction = EventService.getEvents(3, page.value)
  } else {
    queryFunction = EventService.getEventsByKeyword(keyword.value, 3, page.value)
  }
  queryFunction.then((response) => {
    events.value = response.data
    console.log('events', events.value)
    totalEvents.value = response.headers['x-total-count']
    console.log('totalEvent', totalEvents.value)
  }).catch(() => {
    router.push({ name: 'NetworkError' })
  })
}
</script>

<template>
  <h1>Events For Good</h1>
  <div class="flex flex-col items-center">
    <div class="w-64">
      <!-- <BaseInput v-model="keyword" label="Search..." @input="updateKeyword" /> -->
      <input v-model="keyword" placeholder="Search..." @input="updateKeyword" />
    </div>
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
