<template>
  <v-dialog v-model="dialog" width="600">
    <v-card>
      <v-card-title class="pl-0 headline white--text py-1 secondary">
        <h6>حذف</h6>
        <v-spacer />
        <v-btn dark text @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="mt-5">
        <h2 class="font-weight-bold">{{ data.text }}</h2>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="px-6" color="success" small @click="dialog = false">
          <span>لغو</span>
        </v-btn>
        <v-btn class="px-6" color="error" small @click="ans()">
          <span>تایید</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'DialogAlert',

  data: () => ({
    dialog: false,
    alert: false,
    data: { text: '', color: '' },
    confirm: () => {},
  }),

  created() {
    this._listen(
      'DialogAlert',
      (payload) => {
        this.dialog = true
        this.data = payload
        this.alert = true
        this.confirm = payload.confirm
      },
      true
    )
  },
  methods: {
    ans() {
      this.dialog = false
      this.confirm()
      this.confirm = () => {}
      this._event('DialogAlertAns', {
        ans: true,
      })
    },
  },
}
</script>
