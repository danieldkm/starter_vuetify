<template>
  <div class="text-center ma-2">
    <v-snackbar
      v-model="snackbar"
    >
      {{ message }}
      <v-btn
        color="pink"
        text
        @click="close"
      >
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
  export default {
    props: {
        message: {type: String, required: true},
        snackbar: {type: Boolean, required: true},
    },
    methods: {
        close() {
            this.$emit("update-snackbar", false);
        }
    }
  }
</script>