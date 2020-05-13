<template>
  <v-col sm="2" class="pt-6">
    <v-btn color="orange" dark @click.stop="dialog = true">
      <v-icon>mdi-square-edit-outline</v-icon>
    </v-btn>

    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Edit Meetup Details?</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="editedTitle"
            label="Title"
            name="title"
            id="title"
            required
          ></v-text-field>

          <v-text-field
            v-model="editedDescription"
            label="Description"
            name="description"
            id="description"
            multi-line
            required
          ></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

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
      editedTitle: this.meetup.title,
      editedDescription: this.meetup.description,
    };
  },
  methods: {
    onSaveChanges() {
      if (
        this.editedTitle.trim() === "" ||
        this.editedDescription.trim() === ""
      ) {
        return;
      }
      this.dialog = false;
      this.$store.dispatch("updateMeetupData", {
        id: this.meetup.id,
        title: this.editedTitle,
        description: this.editedDescription,
      });
    },
  },
};
</script>
