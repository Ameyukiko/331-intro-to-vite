<script setup lang="ts">
import { toRefs } from 'vue'
import type { Event } from '@/types'
const props = defineProps<{
  event: Event
  id: string
}>()
const { event } = toRefs(props)

</script>

<template>
 <p>Edit event here</p>
</template>
