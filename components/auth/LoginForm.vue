<template>
  <v-form v-model="isValid" class="mt-5 mx-auto">
    <v-text-field
      v-model="form.username"
      outlined
      dense
      append-icon="fas fa-user"
      label="نام کاربری"
      :rules="phoneRules"
    />

    <v-text-field
      v-model="form.password"
      outlined
      dense
      label="رمز عبور"
      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
      :type="show1 ? 'text' : 'password'"
      :rules="passwordRules"
      @click:append="show1 = !show1"
    />

    <v-autocomplete
      v-model="bath"
      outlined
      dense
      :items="[
        { text: 'حمام غربی', value: 'east' },
        { text: 'حمام شرقی', value: 'west' },
      ]"
      label="حمام"
      append-icon="fal fa-building"
      :rules="passwordRules"
    />

    <v-img :src="image" class="rounded-lg" />

    <v-text-field
      v-model="form.captcha"
      class="mt-3"
      dense
      label="کد اعتبار سنجی"
      outlined
      @keyup.enter="login"
    />

    <v-btn
      :loading="loading"
      class="rounded-lg success"
      dark
      block
      @click.prevent="login"
    >
      <span>ورود</span>
      <v-icon right small>fal fa-arrow-left</v-icon>
    </v-btn>
  </v-form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import validations from '@/helpers/validations'
import toEnglishDigits from '@/helpers/toEnglishDigits'

export default {
  name: 'LoginForm',

  data() {
    return {
      form: {
        username: '',
        password: '',
        key: '',
        captcha: '',
      },
      bath: 'west',
      image: '',
      show1: false,
      isValid: false,
      phoneRules: [validations.required()],
      passwordRules: [validations.required()],
    }
  },

  computed: {
    ...mapGetters({
      errors: 'authenticate/errors',
      loading: 'authenticate/loading',
    }),
  },

  watch: {
    bath(val) {
      this.$axios.defaults.headers.common['X-Database-Connection'] = val
      localStorage.setItem('bath', val)
    },
  },

  created() {
    this.getCaptcha()
    this._listen('captcha', () => {
      this.getCaptcha()
    })
  },

  methods: {
    toEnglishDigits,
    ...mapActions({
      LOGIN: 'authenticate/login',
    }),
    login() {
      this.isValid && this.LOGIN(this.form)
    },
    getCaptcha() {
      this.$axios.$get('/captcha').then((res) => {
        this.form.key = res[0].key
        this.image = res[0].img
      })
    },
  },
}
</script>

<style>
body {
  height: 100vh;
  background-size: cover;
}
</style>
