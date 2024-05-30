<script setup>
import { ref, onMounted } from 'vue'
import EventService from '@/services/EventService';

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})


const event = ref(null)
const _error = ref(null)


onMounted(async () => {
  try {
    const response = await EventService.getEvent(props.id)
    event.value = response.data
  } catch (error) {
    console.error('error', error.message)
    _error.value = error.message
  }

})
</script>

<template>
  <div class="event-details" v-if="_error === null && event">
    <h1>{{ event.title }}</h1>
    <div id="nav">
      <router-link :to="{ name: 'event-details', params: { id } }"
        >Details</router-link
      >
      |
      <router-link :to="{ name: 'event-register', params: { id } }"
        >Register</router-link
      >
      |
      <router-link :to="{ name: 'event-edit', params: { id } }"
        >Edit</router-link
      >
    </div>
    <router-view :event="event"></router-view>
  </div>

  <div v-if="_error !== null">
    <p style="color: red;">{{ _error }}</p>
  </div>
</template>

