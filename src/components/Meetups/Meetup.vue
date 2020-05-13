<template>
  <v-container>
    <v-row class="text-center mt-6 mb-9" v-if="loading">
      <v-col>
        <v-progress-circular
          indeterminate
          :size="100"
          :width="5"
          color="red"
        ></v-progress-circular>
      </v-col>
    </v-row>
    <v-card class="mx-auto" v-else>
      <v-row>
        <v-col sm="10">
          <v-card-title>{{ meetup.title }} </v-card-title>
        </v-col>
        <template v-if="userIscreator">
          <!-- <v-spacer></v-spacer> -->
          <edit-meetup-dialog
            :meetup="meetup"
            v-if="userIsAuthenticated && !userIscreator"
          ></edit-meetup-dialog>
        </template>
      </v-row>

      <v-img
        class="white--text align-end"
        height="400px"
        :src="meetup.imageUrl"
      >
        <v-card-title>{{ meetup.title }} </v-card-title>
      </v-img>

      <v-card-subtitle class="pb-0"
        >{{ meetup.date | date }} - {{ meetup.location }}</v-card-subtitle
      >
      <v-card-text class="text--primary">
        <div>
          {{ meetup.description }}
        </div>
      </v-card-text>
      <v-container>
        <v-row>
          <edit-meetup-date-dialog
            :meetup="meetup"
            v-if="userIscreator"
          ></edit-meetup-date-dialog>
          <edit-meetup-time-dialog
            :meetup="meetup"
            v-if="userIscreator"
          ></edit-meetup-time-dialog>
        </v-row>
      </v-container>

      <v-card-actions>
        <register-dialog :meetupId="meetup.id"></register-dialog>
        <!-- <v-btn color="orange" text>
          <v-icon left>mdi-arrow-right</v-icon>
          Register
        </v-btn> -->
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  props: ["id"],
  computed: {
    ...mapGetters(["loading"]),
    meetup() {
      return this.$store.getters.loadedMeetup(this.id);
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
    userIscreator() {
      if (!this.userIsAuthenticated) {
        return false;
      }
      return this.$store.getters.user.id === this.meetup.creatorId;
    },
  },
};
</script>
