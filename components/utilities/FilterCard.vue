<template>
  <v-card
    class="d-flex py-7 pa-4 elevent-0 ma-2"
    :color="data.boxColor"
    outlined
  >
    <v-avatar dark :color="data.avatarColor" class="" size="64">
      <v-icon :color="`${data.iconColor} !important`">{{ data.icon }}</v-icon>
    </v-avatar>
    <div class="d-flex flex-column justify-center mr-4">
      <span class="font-weight-bold">{{
        data?.text?.toLocaleString('fa-IR')
      }}</span>
      <span>{{ data.title }}</span>
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'FilterCard',
  props: {
    data: { default: null },
  },
  data: () => ({}),

  created() {},
}
</script>
