<template>
  <div class="w-100 d-flex flex-row flex-wrap justify-center">
    <div
      v-for="(image, key) in images"
      :key="'_' + key"
      class="col-12 mb-3 mx-1"
      :class="'col-md-' + col"
      style="max-width: 350px"
    >
      <div v-show="label" class="col-12 info white--text mb-2 rounded-lg">
        <v-icon dark right>fal fa-cctv</v-icon>
        <b>دوربین شماره {{ image.camera_id }}</b>
      </div>

      <v-card style="position: relative">
        <div
          v-if="!image.frame"
          class="pa-3 text-center rounded-lg"
          style="
            min-height: 186px;
            background-image: url(/img/x.jpg);
            color: #ffffff;
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: bold;
          "
        >
          <div class="fa-3x">
            <i class="fas fa-spinner fa-spin"></i>
          </div>
          <!-- دوربین بدون تصویر -->
        </div>
        <v-img :src="'data:image/png;base64, ' + getSafe(image, 'frame')" />
      </v-card>
    </div>
  </div>
</template>

<script>
import { get as getSafe } from 'lodash'

let socket

export default {
  props: {
    gate: { default: 1 },
    col: { default: 12 },
    label: { default: true },
    plate: { default: false },
  },

  data() {
    return {
      images: {},
    }
  },

  computed: {
    cameras() {
      const plates = [1, 5, 6, 7, 8]

      const gates = {
        1: [1, 2, 3],
        // 1: [1, 2, 3, 4],
        2: [5],
        3: [6],
        4: [7],
        5: [8, 9],
      }

      if (this.plate)
        return gates[this.gate].filter((item) => plates.includes(item))

      return gates[this.gate]
    },
  },

  mounted() {
    for (const camera of this.cameras) {
      this.connectToCamera(camera)
    }
  },

  methods: {
    getSafe,
    connectToCamera(cameraId) {
      socket = new WebSocket(
        process.env.websocketDomain + '?camera_id=' + cameraId
      )
      socket.addEventListener('message', (data) => {
        const frame = JSON.parse(data.data)

        this.images[cameraId] = frame

        this.$forceUpdate()
      })
    },
  },
}
</script>
