<template>
  <div class="d-flex">
    <v-btn small elevation="0" class="success py-1 px-2 ml-2" dark @click="dialog = true">
      <v-icon small>mdi mdi-camera</v-icon>
    </v-btn>

    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span>بررسی ژتون</span>
          <v-spacer></v-spacer>
          <v-btn icon color="error" @click="dialog = false">
            <v-icon>mdi mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <StreamBarcodeReader @decode="onDecode" @loaded="onLoaded" />
          <v-divider />
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { StreamBarcodeReader } from "vue-barcode-reader";
import { get as getSafe } from "lodash";

export default {
  components: { StreamBarcodeReader },

  data: () => ({
    dialog: false,
    lastScan: null
  }),

  methods: {
    getSafe,

    onDecode(a, b, c) {
      if (this.lastScan === a) return

      this.lastScan = a

      this.$emit('scan', a);
    },

    onLoaded() {
      console.log("load");
    },
  },
};
</script>

<style>
.laser {
  left: 0px !important;
}
</style>
