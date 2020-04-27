<template>
  <v-app>
    <v-navigation-drawer app id="drawer" v-model="drawer">
      <v-list nav>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="title">
              <router-link to="project">Home</router-link>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list dense nav subheader>
        <v-subheader>File</v-subheader>
        <v-divider></v-divider>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-file-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              <router-link to="/">New Project</router-link>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-file-document</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              <div @click.stop="openProject">Open Project</div>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-file-document-edit</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              <div @click.stop="saveProject">Save Project</div>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list dense nav subheader>
        <v-subheader>Edit</v-subheader>
        <v-divider></v-divider>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-credit-card-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              <router-link to="addScene">Add Scene</router-link>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-credit-card-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              <router-link to="addActBreak">Add Act Break</router-link>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list dense nav subheader>
        <v-subheader>Settings</v-subheader>
        <v-divider></v-divider>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-settings</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              <router-link to="settings">Project Settings</router-link>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
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
import Vue from "vue";
import { mapState } from "vuex";

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
    getFilename() {
      // TODO make this strip out any unusable characters
      return this.project.title + ".json";
    },
    hasFocus(element) {
      return element === document.activeElement;
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
              this.project = JSON.parse(data);
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
      document
        .getElementById("open-project")
        .addEventListener("change", this.openFile)
        .click();
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
    }
  },

  name: "App"
});
</script>
