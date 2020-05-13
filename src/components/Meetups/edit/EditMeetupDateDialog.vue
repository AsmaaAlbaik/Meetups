<template>
  <v-col sm="2">
       <v-btn color="secondary" dark @click.stop="dialog = true">
          Edit Date
        </v-btn>
        <v-dialog v-model="dialog" max-width="290">
          <v-card>
            <v-card-title class="headline">Edit Meetup Date?</v-card-title>
            <v-card-text>
              <v-date-picker v-model="editedDate" actions></v-date-picker>
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
  data () {
    return {
      dialog: false,
      editedDate: null,
    }
  },
  methods: {
    onSaveChanges() {
      this.dialog = false;
      const newDate = new Date(this.meetup.date);
      const newDay = new Date(this.editedDate).getUTCDate();
      const newMonth = new Date(this.editedDate).getUTCMonth();
      const newYear = new Date(this.editedDate).getUTCFullYear();
      newDate.setUTCDate(newDay);
      newDate.setUTCMonth(newMonth);
      newDate.setFullYear(newYear);

      this.$store.dispatch("updateMeetupData", {
        id: this.meetup.id,
        date: newDate,
      });
    },
  },
  created () {
    // this.editedDate = new Date(this.meetup.date)
  },
};
</script>
<style>
.v-picker__body {
  width: 100% !important;
}
</style>
