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
      hiddenActions: ['delete', 'show'],
      mainRoute: "/service-setting",
      relations: [],
      fields: fields(this),
    });
  },
};
</script>
