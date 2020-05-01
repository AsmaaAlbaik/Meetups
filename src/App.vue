<template>
  <v-app>
    <v-navigation-drawer v-model="sideNav" absolute temporary>
      <v-list-item
        v-for="item in menuItems"
        :key="item.title"
        link
        :to="item.link"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-if="userIsAuthonticated" @click="logout">
        <v-list-item-icon>
          <v-icon>mdi-logout</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>log out</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-navigation-drawer>
    <v-card flat tile>
      <v-toolbar class="orange darken-1">
        <v-app-bar-nav-icon
          @click.stop="sideNav = !sideNav"
          class="d-md-none"
        ></v-app-bar-nav-icon>
        <v-toolbar-title>
          <router-link tag="span" to="/" style="cursor: pointer;"
            >Meetups</router-link
          >
        </v-toolbar-title>

        <v-spacer></v-spacer>
        <v-list-item-group class="d-none d-md-flex d-lg-flex d-xl-flex">
          <v-btn
            text
            v-for="item in menuItems"
            :key="item.title"
            link
            :to="item.link"
          >
            <v-icon left>{{ item.icon }}</v-icon>
            {{ item.title }}
          </v-btn>
          <v-btn v-if="userIsAuthonticated" @click="logout" text>
            <v-icon left>mdi-logout</v-icon>
            Logout
          </v-btn>
        </v-list-item-group>
      </v-toolbar>
    </v-card>
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
// import Home from "./components/Home";

export default {
  name: "App",

  components: {
    // Home
  },

  data: () => ({
    sideNav: false,
  }),
  computed: {
    menuItems() {
      let menuItems = [
        { title: "Sign up", icon: "mdi-face", link: "/signup" },
        { title: "Sign in", icon: "mdi-lock-open", link: "/signin" },
      ];
      if (this.userIsAuthonticated) {
        menuItems = [
          {
            title: "View Meetups",
            icon: "mdi-view-dashboard",
            link: "/meetups",
          },
          { title: "Organize Meetup", icon: "mdi-home", link: "/meetup/new" },
          { title: "Person", icon: "mdi-help-box", link: "/profile" },
        ];
      }
      return menuItems;
    },
    userIsAuthonticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>
