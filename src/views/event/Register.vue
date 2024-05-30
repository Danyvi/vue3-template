<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

// const props = defineProps(['event'])
const props = defineProps({
  event: {
    type: Object,
    required: true
  }
})

const register = () => {
  console.log('Registering for the event')
  // if registration API call is successful
  // redirect to event-details
  router.push({
    name: 'event-details'
  })
}

</script>

<template>
  <div class="event-details">
    <p>Register for the event here</p>
    <button @click="register">Register me</button>
  </div>
</template>

