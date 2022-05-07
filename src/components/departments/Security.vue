<template>
  <department :NAME="{ name: '保安组' }" />
</template>

<script lang="ts">
export default {
  name: "Security",
};
</script>
<script lang="ts" setup>
import department from "../Department.vue";
</script>