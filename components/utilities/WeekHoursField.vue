<template>
  <div class="d-flex flex-column" style="width: 100%;overflow: auto">
    {{ getFromField('title') }}
    <table class="text-center table" style="width: 100%">
      <thead>
      <tr>
        <td v-for="day in days" :key="day.value" class="px-4 py-2 info rounded-lg white--text mx-5">
          <span>{{ day.text }}</span>
        </td>
      </tr>
      </thead>
      <tbody>
      <tr v-for="time in times" :key="time.value">
        <td
          v-for="day in days"
          :key="time.value + day.text"
          class="cursor-pointer py-2 rounded-lg"
          :class="{'primary white--text':isSelected(time.text,day.value)}"
          @click="choose(time.text,day.value)"
        >
          {{ time.text }}
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {get as getSafe} from 'lodash';
import {AbstractField} from 'majra';
import {getDays} from "~/helpers/helpers";

export default {
  name: "WeekHoursField",

  extends: AbstractField,

  data: () => ({
    days: getDays(),
  }),

  computed: {
    times() {
      const times = [];
      const step = 2;
      for (let i = 0; i < 24; i += step) {
        times.push({
          text: `${i} - ${i + step}`,
          value: i
        });
      }
      return times;
    }
  },

  methods: {
    choose(time, day) {
      if (!this.value || typeof this.value === "undefined") {
        this.value = {};
      }
      if (!this.value[day]) {
        this.value[day] = [];
        this.updateField(this.value);
      }
      if (this.isSelected(time, day)) {
        return this.remove(time, day);
      }
      this.value[day].push(time);
      this.updateField(this.value);
      this.$forceUpdate()
    },
    remove(time, day) {
      this.value[day] = this.value[day].filter(t => t !== time)
      this.updateField(this.value);
      this.$forceUpdate()
    },
    isSelected(time, day) {
      return !!(getSafe(this.value, day, false) && getSafe(this.value, day, []).includes(time));
    }
  }
}
</script>
