<script setup>
import { ref, onMounted } from 'vue'
import EventService from '@/services/EventService.js'
import EventCard from '@/components/EventCard.vue'

const events = ref(null)
const _error = ref(null)



onMounted(async () => {
  try {
    const response = await EventService.getEvents()
    events.value = response.data
  } catch (error) {
    console.error('error', error.message)
    _error.value = error.message
  }

})

</script>

<template>
  <h1>Event For Good</h1>

  <div class="events" v-if="_error===null">
    <EventCard
      v-for="event in events"
      :key="event.id"
      :event="event"/>
  </div>

  <div v-if="_error !== null">
    <p style="color: red;">{{ _error }}</p>
  </div>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>