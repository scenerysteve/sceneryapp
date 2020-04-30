<template>
  <v-row>
    <v-col>
      <h1 class="d-inline-block font-weight-light">
        {{ $router.currentRoute.name }}
      </h1>
      <router-link to="/project">
        <v-tooltip bottom>
          <template #activator="{ on }">
            <v-btn class="float-right" color="primary" icon large v-on="on">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </template>
          <span>Return to Project View</span>
        </v-tooltip>
      </router-link>
    </v-col>
  </v-row>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "FormHeader"
});
</script>
