<script setup>
import { ref, onMounted, computed, watchEffect } from 'vue'
import EventService from '@/services/EventService.js'
import EventCard from '@/components/EventCard.vue'

const props = defineProps(['page'])

const events = ref(null)
const totalEvents = ref(0)
const _error = ref(null)

const page = computed(() => props.page)
const eventsPerPage = 2
const hasNextPage = computed(() => {
  return totalEvents.value > page.value * eventsPerPage
})

onMounted( () => {
  watchEffect(async () => {
    try {
      events.value = null
      const response = await EventService.getEvents(eventsPerPage, page.value) // events per page, page number we are on
      events.value = response.data
      totalEvents.value = response.headers['x-total-count']
    } catch (error) {
      console.error('error', error.message)
      _error.value = error.message
    }
  })

})

</script>

<template>
  <h1>Event For Good</h1>

  <div class="events" v-if="_error===null">
    <EventCard
      v-for="event in events"
      :key="event.id"
      :event="event"
    />

    <div class="pagination">
      <RouterLink
        id="page-prev"
        :to="{ name: 'event-list', query: { page: page - 1 } }"
        rel="prev"
        v-if="page !== 1"
      >
        &#60; Previous
      </RouterLink>

      <RouterLink
        id="page-next"
        :to="{ name: 'event-list', query: { page: page + 1 } }"
        rel="next"
        v-if="hasNextPage"
      >
        Next &#62;
      </RouterLink>
    </div>
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

.pagination {
  display: flex;
  width: 290px;
}

.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>