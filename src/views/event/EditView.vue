<script setup lang="ts">
import type { Event } from '@/types'
import { toRefs } from 'vue'
import { useMessageStore } from '@/stores/message'
import { useRouter } from 'vue-router'
const props = defineProps<{
  event: Event
  id: string
}>()
const { event } = toRefs(props)
const router = useRouter()
const storeEdit = useMessageStore()
const edit = () => {
    storeEdit.updateMessage('You are succesfully update the data for ' + props.event.title)
    setTimeout(() => {
        storeEdit.resetMessage()
    }, 3000)
    router.push({ name: 'event-detail-view', params: { id: props.event.id } })
}

</script>

<template>
 <p>Edit event here</p>
  <button @click="edit">Edit</button>
</template>
