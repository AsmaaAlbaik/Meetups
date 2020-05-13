<template>
  <v-col sm="2">
        <v-btn color="orange" text @click.stop="dialog = true">
          <v-icon left>mdi-arrow-right</v-icon>
          {{ userIsRegistered ? 'UnRegister' : 'Register'}}
        </v-btn>
        <v-dialog v-model="dialog" max-width="290">
          <v-card>
            <v-card-title class="headline" v-if="userIsRegistered">UnRegister for Meetup?</v-card-title>
            <v-card-title class="headline" v-else>Register for Meetup?</v-card-title>
            <v-card-text>
              You can always change your desision later on
            </v-card-text>
            <v-card-actions>
              <v-btn color="red darken-1" text @click="dialog = false">
                colse
              </v-btn>
              <v-btn color="green darken-1" text @click="onAgree">
                Confirm
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
  </v-col>
 
</template>

<script>
export default {
  props: ["meetupId"],
  data () {
    return {
      dialog: false,

    }
  },
  computed: {
      userIsRegistered () {
          return this.$store.getters.user.registeredMeetup.findIndex(meetupId => {
              return meetupId == this.meetupId
          }) >= 0
      }
  },
  methods: {
      onAgree () {
        if (this.userIsRegistered) {
          this.$store.dispatch('unregisterUserFormMeetup', this.meetupId)
        } else {
          this.$store.dispatch('registerUserForMeetup', this.meetupId)
        }
      }
  },
  created () {
    // this.editedDate = new Date(this.meetup.date)
  },
};
</script>
<style>
</style>
