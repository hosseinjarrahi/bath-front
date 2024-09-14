<template>
  <DynamicTemplate>
    <template #actions="item">
      <v-btn
        :disabled="!item.has_residence"
        small
        text
        @click="_event('checkout.form', item)"
      >
        <v-icon small left>fal fa-check</v-icon>
        <span>تسویه</span>
      </v-btn>
    </template>
  </DynamicTemplate>
</template>

<script>
import fields from './fields'
import { DynamicForm, DynamicTemplate } from 'majra'

export default {
  components: { DynamicTemplate, DynamicForm },

  layout: 'dashboard',

  beforeCreate() {
    this.$majra.init({
      hiddenActions: ['edit', 'delete', 'create'],
      mainRoute: { route: '/passenger?_with=serviceItems', key: 'Passenger' },
      relations: ['/service'],
      fields: fields(this),
    })
  },
}
</script>
