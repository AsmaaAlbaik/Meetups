<template>
  <div class="home">
    <v-container>
      <v-row>
        <v-col  
        lg="6"
        md="6"
        xs="12" 
        class="text-sm-right text-center">
          <v-btn link to="/meetups" color="secondary" dark large>meetups</v-btn>
        </v-col>
        <v-col
        lg="6"
        md="6"
        xs="12" 
         class="text-sm-left text-center">
          <v-btn link to="/meetup/new" color="secondary" dark large>Create Meetups</v-btn>
        </v-col>
      </v-row>
      <v-row class="text-center mt-6 mb-9">
        <v-col>
           <v-progress-circular
           v-if="loading"
            indeterminate
            :size="100"
            :width="5"
            color="red"
          ></v-progress-circular>
        </v-col>
      </v-row>
      <v-carousel class="mt-2 mb-2" v-if="!loading">
        <v-carousel-item
          v-for="meetup in featuredMeetups"
          :key="meetup.id"
          :src="meetup.imageUrl"
          @click="onLoadMeetup(meetup.id)"
          reverse-transition="fade-transition"
          transition="fade-transition"
        >
          <div class="title">{{ meetup.title }}</div>
        </v-carousel-item>
      </v-carousel>
        <v-row no-gutters>
        <v-col>
          <p class="text-center">Welcome Meetups Application</p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
// import Home from '@/components/Home.vue'
import { mapGetters } from 'vuex';
export default {
  computed: {
       ...mapGetters ([
      'featuredMeetups', 'loading'

    ]),
  },
  methods: {
    onLoadMeetup (id) {
      this.$router.push(`/meetups/${id}`)
    },
  },
};
</script>

<style scoped>
  .title {
    position: absolute;
    bottom: 55px;
    left: 50%;
    transform: translateX(-50%);
    color: #fff;
    font-size: 2em;
    background: rgba(0, 0, 0, 0.5);
    padding: 10px;
  }
</style>
