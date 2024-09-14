<template>
  <DynamicTemplate> </DynamicTemplate>
</template>

<script>
import { DynamicTemplate } from "majra";
import fields from "./fields";

export default {
  components: { DynamicTemplate },
  layout: "dashboard",

  beforeCreate() {
    this.$majra.init({
      mainRoute: "/service",
      relations: [],
      fields: fields(this),
    });
  },
};
</script>
