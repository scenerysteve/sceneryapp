import AddActBreak from "../components/AddActBreak.vue";
import AddScene from "../components/AddScene.vue";
import EditActBreak from "../components/EditActBreak";
import EditScene from "../components/EditScene.vue";
import EditSettings from "../components/EditSettings.vue";
import NewProject from "../components/NewProject";
import Project from "../components/Project.vue";
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      component: AddActBreak,
      name: "Add Act Break",
      path: "/addActBreak"
    },
    {
      component: AddScene,
      name: "Add Scene",
      path: "/addScene"
    },
    {
      component: EditActBreak,
      name: "Edit Act Break",
      path: "/editActBreak/:id",
      props: true
    },
    {
      component: EditScene,
      name: "Edit Scene",
      path: "/editScene/:id",
      props: true
    },
    {
      component: NewProject,
      name: "New Project",
      path: "/"
    },
    {
      component: Project,
      name: "Project",
      path: "/project"
    },
    {
      component: EditSettings,
      name: "Project Settings",
      path: "/settings"
    }
  ]
});
