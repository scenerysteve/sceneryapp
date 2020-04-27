<template>
  <v-container>
    <v-row>
      <v-col>
        <v-form @submit.prevent="submit">
          <div>
            <h1 class="d-inline-block font-weight-light">{{ $route.name }}</h1>
            <router-link to="project">
              <v-tooltip bottom>
                <template #activator="{ on }">
                  <v-btn
                    class="float-right"
                    color="primary"
                    icon
                    large
                    v-on="on"
                  >
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </template>
                <span>Return to Project View</span>
              </v-tooltip>
            </router-link>
          </div>
          <v-text-field
            autofocus
            label="Title"
            v-model="settings.title"
          ></v-text-field>
          <h2 class="font-weight-light mb-4">Statuses</h2>
          <div
            class="d-flex justify-space-between"
            :key="status.id"
            v-for="status in settings.statuses"
          >
            <v-tooltip top>
              <template #activator="{ on }">
                <v-btn
                  @click.prevent="colorInputClick(status.id)"
                  elevation="3"
                  icon
                  large
                  :style="{ 'background-color': status.color }"
                  v-on="on"
                >
                  <v-icon>mdi-format-color-fill</v-icon>
                </v-btn>
              </template>
              <span>Color {{ status.color }}</span>
            </v-tooltip>
            <input
              :id="'color-input-' + status.id"
              style="visibility: hidden;"
              type="color"
              v-model="status.color"
            />
            <v-text-field label="Name" v-model="status.name"></v-text-field>
            <v-tooltip top>
              <template #activator="{ on }">
                <v-btn
                  @click.prevent="removeStatus(status)"
                  icon
                  large
                  v-on="on"
                >
                  <v-icon>mdi-trash-can</v-icon>
                </v-btn>
              </template>
              <span>Remove Status</span>
            </v-tooltip>
          </div>
          <v-btn color="primary" type="submit">Save</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Vue from "vue";
import * as _ from "lodash";
import { mapMutations, mapState } from "vuex";

export default Vue.extend({
  computed: {
    ...mapState(["project", "statuses"])
  },
  created() {
    this.settings.statuses = this.getStatuses();
    this.settings.title = this.project.getTitle();
  },
  data() {
    return {
      settings: {
        statuses: [],
        title: ""
      }
    };
  },
  methods: {
    ...mapMutations(["SET_STATUSES", "SET_TITLE"]),
    colorInputClick(statusId) {
      document.getElementById("color-input-" + statusId).click();
    },
    getStatuses() {
      const statuses = [];
      for (let i = 0; i < this.statuses.length; i++) {
        statuses.push({
          color: this.statuses[i].getColor(),
          id: this.statuses[i].id,
          name: this.statuses[i].getName()
        });
      }
      return statuses;
    },
    // getStatusObjects() {
    //   const objects = [];
    //   for (let i = 0; i < this.statuses.length; i++) {
    //     objects.push(
    //       new Status(this.statuses[i].getColor(), this.statuses[i].getName())
    //     );
    //   }
    //   return objects;
    // },
    removeStatus(status) {
      // TODO ask for confirmation first
      Vue.set(
        this.settings,
        "statuses",
        _.pull(this.settings.statuses, status)
      );
      this.$forceUpdate();
    },
    submit() {
      this.SET_STATUSES(this.settings.statuses);
      this.SET_TITLE(this.settings.title);
      this.$router.push("project");
    }
  },
  name: "Settings"
});
</script>
