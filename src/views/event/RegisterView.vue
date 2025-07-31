<script setup lang="ts">
import { toRefs } from 'vue'
import { useMessageStore } from '@/stores/message'
import type { Event } from '@/types'
import { useRouter } from 'vue-router'

const props = defineProps<{
  event: Event
    id: String
}>()

const { event } = toRefs(props) // event is now a ref
const router = useRouter()
const store = useMessageStore()

const register = () => {
  // Access the value of the 'event' ref
  store.updateMessage('You are successfully registered for ' + event.value.title)
  setTimeout(() => {
    store.resetMessage()
  }, 3000)
  // Also use event.value for the router push
  router.push({ name: 'event-detail-view', params: { id: event.value.id } })
}
</script>

<template>
  <p>Register event here</p>
  <button @click="register">Register</button>
</template>