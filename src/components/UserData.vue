<template>
  <department :isShowSearch="true"/>
</template>

<script lang="ts">
export default {
  name: "UserData",
};
</script>
<script lang="ts" setup>
import department from "./Department.vue";
</script>