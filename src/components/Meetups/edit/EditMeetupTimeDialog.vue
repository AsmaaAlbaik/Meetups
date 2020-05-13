<template>
      <v-col sm="2">
        <v-btn color="secondary" dark @click.stop="dialog = true">
          Edit Time
        </v-btn>
        <v-dialog v-model="dialog" max-width="290">
          <v-card>
            <v-card-title class="headline">Edit Meetup Time?</v-card-title>
            <v-card-text>
              <!-- asmaaaaaaaaaaaa ali -->
              <v-time-picker v-model="editedTime" actions></v-time-picker>
            </v-card-text>
            <v-card-actions>
              <v-btn color="green darken-1" text @click="dialog = false">
                colse
              </v-btn>
              <v-btn color="green darken-1" text @click="onSaveChanges">
                save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>

</template>

<script>
export default {
  props: ["meetup"],
  data() {
    return {
      dialog: false,
      editedTime: null,
    };
  },
  methods: {
    onSaveChanges() {
      this.dialog = false;
      const newDate = new Date(this.meetup.date);
      const hours = this.editedTime.match(/^(\d+)/)[1];
      const minutes = this.editedTime.match(/:(\d+)/)[1];
      newDate.setHours(hours);
      newDate.setMinutes(minutes);

      this.$store.dispatch("updateMeetupData", {
        id: this.meetup.id,
        date: newDate,
      });
    },
  },
  created() {
    // this.editedDate = new Date(this.meetup.date)
  },
};
</script>
<style>
.v-picker.v-card.v-picker--time {
  width: 100% !important;
}
</style>
