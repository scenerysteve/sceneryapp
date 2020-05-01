<template>
  <v-app>
    <v-navigation-drawer app id="drawer" v-model="drawer">
      <v-list nav>
        <router-link to="/project">
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="title">
                Home
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
      </v-list>
      <v-list dense nav subheader>
        <v-subheader>File</v-subheader>
        <v-divider></v-divider>
        <router-link to="/">
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-file-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                New Project
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <v-list-item @click="openProject" link>
          <v-list-item-icon>
            <v-icon>mdi-file-document</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              Open Project
              <input id="open-project" style="display: none;" type="file" />
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="saveProject" link>
          <v-list-item-icon>
            <v-icon>mdi-file-document-edit</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              Save Project
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list dense nav subheader>
        <v-subheader>Edit</v-subheader>
        <v-divider></v-divider>
        <router-link to="addScene">
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-credit-card-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                Add Scene
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link to="addActBreak">
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-credit-card-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                Add Act Break
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
      </v-list>
      <v-list dense nav subheader>
        <v-subheader>Settings</v-subheader>
        <v-divider></v-divider>
        <router-link to="settings">
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-settings</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                Project Settings
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app dense flat>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        Scene<span class="font-weight-light">ry</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn href="" small text>View on Github</v-btn>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import * as _ from "lodash";
import { Project } from "./classes/Project";
import Vue from "vue";
import { mapMutations, mapState } from "vuex";

export default Vue.extend({
  computed: {
    ...mapState(["project"])
  },

  data() {
    return {
      drawer: null // Null makes the drawer show on page load on desktop
    };
  },

  methods: {
    ...mapMutations(["MODIFY_PROJECT"]),
    getFilename() {
      // TODO make this strip out any unusable characters
      return this.project.settings.title + ".json";
    },
    modifyProject(fileContents) {
      if (this.validFile(fileContents)) {
        this.MODIFY_PROJECT(new Project(fileContents));
      }
    },
    openFile(event) {
      const target = event.target;
      const files = target.files;
      if (files) {
        const file = files[0];
        const reader = new FileReader();
        reader.onload = event => {
          if (event.target) {
            const target = event.target;
            const data = target.result;
            try {
              this.modifyProject(JSON.parse(data));
            } catch (exception) {
              // TODO handle invalid file contents
              console.log(exception);
            }
          }
        };
        reader.readAsText(file);
      }
    },
    openProject() {
      const input = document.getElementById("open-project");
      input.addEventListener("change", this.openFile);
      input.click();
    },
    saveProject() {
      const anchor = document.createElement("a");
      const file = new Blob([JSON.stringify(this.project)], { type: "json" });
      anchor.href = URL.createObjectURL(file);
      anchor.download = this.getFilename();
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      URL.revokeObjectURL(anchor.href);
    },
    validFile(fileContents) {
      // TODO validate contents
      return (
        typeof fileContents === "object" &&
        _.has(fileContents, "cards") &&
        _.has(fileContents, "settings")
      );
    }
  },

  name: "App"
});
</script>
