<template>
  <v-card-title>
    <div class="info info-set" style=""></div>
    <slot></slot>
  </v-card-title>
</template>

<script>
export default {
  name: 'CardTitle',
}
</script>

<style>
.set-avenir .info-set {
  height: 40px;
  padding: 2px;
  border-radius: 0 10px 10px 0;
  position: absolute;
  left: 0;
}
.set-iransas .info-set {
  height: 40px;
  padding: 2px;
  border-radius: 10px 0 0 10px;
  position: absolute;
  right: 0;
}
</style>
