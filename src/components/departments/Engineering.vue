<template>
  <department :NAME="{ name: '工程组' }" />
</template>

<script lang="ts">
export default {
  name: "Engineering",
};
</script>
<script lang="ts" setup>
import department from "../Department.vue";
</script>