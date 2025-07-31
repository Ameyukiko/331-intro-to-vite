<script setup lang="ts">
import { useEventStore } from '@/stores/event';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { RouterView } from 'vue-router';

const store = useEventStore();
const { event } = storeToRefs(store);

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
