<template>
  <table style="width: 100%" class="rounded-lg">
    <tr class="px-3">
      <td>تصویر</td>
      <td>نام و نام‌خانوادگی</td>
      <td>کد ملی</td>
    </tr>
    <tr>
      <td>
        <v-icon v-if="!passenger.img">fal fa-user</v-icon>
        <v-img v-else :src="url + passenger.img" width="100px" class="rounded-lg" />
      </td>
      <td>
        {{ passenger.full_name }}
      </td>
      <td>
        {{ passenger.code_meli }}
      </td>
    </tr>
  </table>
</template>

<script>
import { get as getSafe } from "lodash";
import { persianDate } from "~/helpers/helpers";

export default {
  props: { passenger: {} },

  computed: {
    url() {
      return process.env.baseURL;
    },
  },

  methods: {
    getSafe,
    persianDate,
  },
};
</script>

<style scoped>
td {
  padding: 5px !important;
  border-radius: 5px;
}

table {
  border: 1px solid rgba(0, 0, 0, 0.2);
}
</style>
