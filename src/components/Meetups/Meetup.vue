<template>
  <v-container>
    <v-card class="mx-auto">
      <v-img
        class="white--text align-end"
        height="400px"
        :src="meetup.imageUrl"
      >
        <v-card-title>{{meetup.title}}</v-card-title>
      </v-img>

      <v-card-subtitle class="pb-0">{{meetup.date | date}} - {{meetup.location}}</v-card-subtitle>

      <v-card-text class="text--primary">
        <div>
          {{meetup.description}}
        </div>
      </v-card-text>

      <v-card-actions>
        <v-btn color="orange" text>
          <v-icon left>mdi-arrow-right</v-icon>
          Register
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
export default {
    props: ['id'],
    computed: {
        meetup () {
            return this.$store.getters.loadedMeetup(this.id);
        }
    }
}
</script>