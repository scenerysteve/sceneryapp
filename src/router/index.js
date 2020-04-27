import Vue from "vue";
import VueRouter from "vue-router";
import AddScene from "@/components/AddScene.vue";
import AddActBreak from "@/components/AddActBreak.vue";
import Project from "@/components/Project.vue";
import Settings from "@/components/Settings.vue";

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
      component: Settings,
      name: "New Project",
      path: "/"
    },
    {
      component: Project,
      name: "Project",
      path: "/project"
    },
    {
      component: Settings,
      name: "Project Settings",
      path: "/settings"
    }
  ]
});
