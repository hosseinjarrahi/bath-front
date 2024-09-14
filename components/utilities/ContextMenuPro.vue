<template>
  <context-menu id="context-menu" ref="ctxMenu" class.native="pa-0">
    <li v-for="(item, index) in items" :key="index" class="d-flex rounded align-center w-100 px-5 py-2 pointer hoverable"
      @click="item.event ? _event(item.event, extra) : item.fn(extra)">
      <i :class="['fal', 'fa-' + item.icon, 'ml-3']"></i>
      <span>{{ item.text }}</span>
    </li>
  </context-menu>
</template>

<script>
import contextMenu from 'vue-context-menu'

export default {
  components: { contextMenu },

  data: () => ({
    items: [],
    extra: {},
  }),

  created() {
    this._listen('contextMenu', ({ event, items, extra }) => {
      if (items !== this.items) this.items = items
      this.extra = extra
      this.$refs.ctxMenu.open()
    }, true)
    this._listen('hideRightMenu', () => {
      this.posStyle.display = 'none'
    }, true)
  },
}
</script>

<style>
.ctx-menu.ctx-menu-left {
  padding: 0 !important;
}

.pointer {
  cursor: pointer;
}

.hoverable {
  transition: all 0.3s;
  background-color: rgba(0, 0, 0, 0);
}

.hoverable:hover {
  background-color: darkgrey;
  color: white;
}
</style>
