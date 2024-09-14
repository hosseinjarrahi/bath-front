<template>
  <div
    id="contextmenu"
    class="text-center justify-center flex-column"
    style="position: absolute; z-index: 1000"
    :style="posStyle"
  >
    <div
      class="white-panel rounded elevation-5 iransans"
      style="position: relative"
      @click="posStyle.display = 'none'"
    >
      <v-btn
        icon
        small
        color="error"
        class="pa-1 white-panel"
        :style="{ display: posStyle.display }"
        style="position: absolute; right: -13px; top: -13px"
        @click="posStyle.display = 'none'"
      >
        <v-icon small>fal fa-times</v-icon>
      </v-btn>
      <div class="d-flex flex-column">
        <div
          v-for="(item, index) in items"
          :key="index"
          class="d-flex rounded align-center w-100 px-5 py-2 pointer hoverable"
          @click="item.event ? _event(item.event, extra) : item.fn(extra)"
        >
          <i :class="['fal', 'fa-' + item.icon, 'ml-3']"></i>
          <div class="py-0">{{ item.text }}</div>
        </div>
        <v-divider />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    posStyle: {
      top: "5px",
      left: "5px",
      display: "none",
    },
    items: [],
    extra: {},
  }),

  created() {
    this._listen("contextMenu", ({ event, items, extra }) => {
      if (items !== this.items) this.items = items;

      if (event.x) {
        this.posStyle.left = event.layerX + "px";
        this.posStyle.top = event.layerY + "px";
      } else {
        this.posStyle.left = event.containerPoint.x + "px";
        this.posStyle.top = event.containerPoint.y + "px";
      }
      this.posStyle.display = "flex";
      this.extra = extra;
    });
    this._listen("hideRightMenu", () => {
      this.posStyle.display = "none";
    });
  },
};
</script>

<style scoped>
.white-panel {
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(2px);
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
