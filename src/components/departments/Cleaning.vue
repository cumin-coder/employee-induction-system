<template>
  <department :NAME="{ name: '保洁组' }" />
</template>

<script lang="ts">
export default {
  name: "Cleaning",
};
</script>
<script lang="ts" setup>
import department from "../Department.vue";
</script>