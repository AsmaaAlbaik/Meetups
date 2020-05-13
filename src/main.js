import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as firebase from 'firebase'
import vuetify from './plugins/vuetify';
import DateFilter from './filters/date'
import AlertCom from './components/shared/Alert'
import EditMeetupDialog from './components/Meetups/edit/EditMeetupDialog'
import EditMeetupDateDialog from './components/Meetups/edit/EditMeetupDateDialog'
import EditMeetupTimeDialog from './components/Meetups/edit/EditMeetupTimeDialog'
import RegisterDialog from './components/Meetups/Regestration/RegisterDialog'

Vue.config.productionTip = false

Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertCom)
Vue.component('edit-meetup-dialog',EditMeetupDialog)
Vue.component('edit-meetup-date-dialog', EditMeetupDateDialog)
Vue.component('edit-meetup-time-dialog', EditMeetupTimeDialog)
Vue.component('register-dialog', RegisterDialog)
new Vue({
  router,
  store,
  vuetify,
  created () {
    firebase.initializeApp({
      apiKey: "AIzaSyCPcDOOC5NrvD5a3cbd-nsEfHQG-IwfIlY",
      authDomain: "meetup-app-74dea.firebaseapp.com",
      databaseURL: "https://meetup-app-74dea.firebaseio.com",
      projectId: "meetup-app-74dea",
      storageBucket: "meetup-app-74dea.appspot.com",
      messagingSenderId: "115797102624",
      appId: "1:115797102624:web:f83c79b8e7da6f92606c45",
      measurementId: "G-G3WFNFL97R"
    })
    // check if the user state token id change 
    firebase.auth().onAuthStateChanged( user => {
      if (user) {
        this.$store.dispatch('autoSignin', user)
        this.$store.dispatch('fetchUserData')
      }
    })
    this.$store.dispatch('loadedMeetups');
  },
  render: h => h(App)
}).$mount('#app')
