<template>
  <v-container>
    <v-row class="mb-2" v-for="meetup in loadedMeetups" :key="meetup.id">
      <v-col xs="12" sm="10" md="8" offset-md="2" offset-sm="1">
        <v-card class="mx-auto">
          <v-container fluid>
            <v-row>
              <v-col xs="5" sm="4" md="3">
                <v-img
                  class="white--text align-end"
                  height="150px"
                  :src="meetup.imageUrl"
                >
                </v-img>
              </v-col>
              <v-col xs="7" sm="8" md="9">
                <v-card-title>{{meetup.title}}</v-card-title>
                <v-card-subtitle class="pb-0">{{ meetup.date | date }}</v-card-subtitle>
                <v-card-actions class="mt-11">
                  <v-btn color="orange" text
                  :to="'/meetups/'+ meetup.id">
                    <v-icon left>mdi-arrow-right</v-icon>
                    View Meetup
                  </v-btn>
                </v-card-actions>
           
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    computed: {
        ...mapGetters ([
            'loadedMeetups'
        ]),
    }
}
</script>