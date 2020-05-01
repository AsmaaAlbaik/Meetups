<template>
  <v-container>
    <v-row>
      <v-col xs="12" sm="6" offset-sm="3">
        <v-card>
          <v-container>
            <app-alert
              v-if="error"
              @dismissible="onDismissible"
              :text="error.message"
            ></app-alert>
            <v-card-title>Register new Account</v-card-title>
            <form @submit.prevent="onSignup">
              <v-text-field
                v-model="email"
                label="Email"
                name="Email"
                id="email"
                type="email"
                required
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                name="password"
                id="password"
                type="password"
                required
              ></v-text-field>
              <v-text-field
                v-model="confirmPassword"
                label="Confirm Password"
                name="confirmPassword"
                id="confirmPassword"
                type="password"
                :rules="[comparePasswords]"
              ></v-text-field>

              <v-btn
                class="mr-4"
                type="submit"
                :loading="loading"
                :disabled="loading"
                >signup
                <template v-slot:loader>
                  <span class="custom-loader">
                    <v-icon light>mdi-cached</v-icon>
                  </span>
                </template>
              </v-btn>
            </form>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
    };
  },
  computed: {
    comparePasswords() {
      return this.password !== this.confirmPassword
        ? "Passwords do not match"
        : "";
    },
    ...mapGetters(["user", "error", "loading"]),
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.$router.push("/");
      }
    },
  },
  methods: {
    onSignup() {
      this.$store.dispatch("signUserUp", {
        email: this.email,
        password: this.password,
      });
      //   console.log(user);
    },
    onDismissible() {
      this.$store.dispatch("clearError");
    },
  },
};
</script>
<style lang="scss" scoped>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
