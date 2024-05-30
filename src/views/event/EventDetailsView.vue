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
    <p>{{ event.description }}</p>
    <span>@{{ event.time }} on {{ event.date }} @ {{ event.location }}</span>
  </div>

  <div v-if="_error !== null">
    <p style="color: red;">{{ _error }}</p>
  </div>
</template>

