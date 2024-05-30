<script setup>
// const props = defineProps(['event'])
const props = defineProps({
  event: {
    type: Object,
    required: true
  }
})

</script>

<template>
  <div class="event-details">
    <p>{{ event.description }}</p>
    <span>@{{ event.time }} on {{ event.date }} @ {{ event.location }}</span>
  </div>
</template>

