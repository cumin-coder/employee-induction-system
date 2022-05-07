<template>
  <department :NAME="{ name: '客服组' }" />
</template>

<script lang="ts">
export default {
  name: "Serive",
};
</script>
<script lang="ts" setup>
import department from "../Department.vue";
</script>