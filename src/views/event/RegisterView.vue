<script setup lang="ts">
import { toRefs } from 'vue'
import { useRouter } from 'vue-router'
import type { Event } from '@/types'
const router = useRouter()
const props = defineProps<{
  event: Event
  id: string
}>()
const { event } = toRefs(props)
const register = () => {
  router.push({ name: 'event-detail-view' })
}
</script>

<template>
  <p>Register event here</p>
  <button @click="register">Register</button>
</template>
