import Vue from "vue";
import Vuex from "vuex";
import * as firebase from "firebase";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loadedMeetups: [
      {
        id: "00",
        title: "Hello 1",
        imageUrl: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
        location: "Los Angalus",
        date: "10/10/2020",
        description:
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati animi similique quibusdam alias debitis soluta, ipsam excepturi assumenda aperiam? Quibusdam voluptas animi nesciunt corrupti corporis dolores amet fugit, numquam qui. ",
      },
      {
        id: "02",
        title: "Hello 3",
        imageUrl: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg",
        location: "Los Angalus",
        date: "25/10/2020",
        description:
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati animi similique quibusdam alias debitis soluta, ipsam excepturi assumenda aperiam? Quibusdam voluptas animi nesciunt corrupti corporis dolores amet fugit, numquam qui. ",
      },
      {
        id: "03",
        title: "Hello 3",
        imageUrl: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg",
        location: "Los Angalus",
        date: "12/10/2020",
        description:
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati animi similique quibusdam alias debitis soluta, ipsam excepturi assumenda aperiam? Quibusdam voluptas animi nesciunt corrupti corporis dolores amet fugit, numquam qui. ",
      },
      {
        id: "04",
        title: "Hello 4",
        imageUrl: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg",
        location: "Los Angalus",
        date: "5/10/2020",
        description:
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati animi similique quibusdam alias debitis soluta, ipsam excepturi assumenda aperiam? Quibusdam voluptas animi nesciunt corrupti corporis dolores amet fugit, numquam qui. ",
      },
    ],
    user: null,
    loading: false,
    error: null,
  },
  mutations: {
    loadedMeetups(state, payload) {
      state.loadedMeetups = payload;
    },
    createMeetup(state, payload) {
      state.loadedMeetups.push(payload);
    },
    setNewUser(state, payload) {
      state.user = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
  actions: {
    loadedMeetups({ commit }) {
      commit("setLoading", true);
      firebase
        .database()
        .ref("meetups")
        .once("value")
        .then((data) => {
          const meetups = [];
          const obj = data.val();
          console.log(obj);
          for (let key in obj) {
            meetups.push({
              id: key,
              title: obj[key].title,
              description: obj[key].description,
              imageUrl: obj[key].imageUrl,
              date: obj[key].date,
              creatorId: obj[key].creatorId,
            });
          }
          commit("setLoading", false);
          commit("loadedMeetups", meetups);
        })
        .catch((error) => {
          commit("setLoading", false);
          console.log(error);
        });
    },
    createMeetup({ commit, getters }, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        date: payload.date.toISOString(),
        creatorId: getters.user.id,
      };
      let key;
      let imageUrl;
      // Reach out firebase and store it
      firebase
        .database()
        .ref("meetups")
        .push(meetup)
        .then((data) => {
          // console.log(data)
          return (key = data.key);
        })
        .then((key) => {
          const filename = payload.image.name;
          // slice the extention of the image
          const ext = filename.slice(filename.lastIndexOf("."));
          // create a folder name in the storage with it's extention and key
          return firebase
            .storage()
            .ref("meetups/" + key + ext)
            .put(payload.image);
        })
        .then((fileData) => {
          // console.log(fileData)
          // get the image url from storage
          fileData.ref.getDownloadURL().then((downloadURL) => {
            // update my database with this imageUrl with specfic key
            // if the imageUrl object dose not exist it will create new one
            firebase
              .database()
              .ref("meetups")
              .child(key)
              .update({ imageUrl: downloadURL })
              .then(() => {
                commit("createMeetup", {
                  ...meetup,
                  imageUrl: downloadURL,
                  id: key,
                });
              })
              .catch((error) => {
                console.log(error);
              });
          });
        });
    },
    signUserUp({ commit }, payload) {
      commit("setLoading", true);
      commit("clearError");
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then((user) => {
          commit("setLoading", false);

          const newUser = {
            id: user.user.uid,
            registeredMeetup: [],
          };
          console.log(newUser);
          commit("setNewUser", newUser);
        })
        .catch((err) => {
          commit("setLoading", false);
          commit("setError", err);
          console.log(err);
        });
    },
    signUserIn({ commit }, payload) {
      commit("setLoading", true);
      commit("clearError");
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then((user) => {
          const newUser = {
            id: user.user.uid,
            registeredMeetup: [],
          };
          commit("setLoading", false);
          // console.log(newUser);
          commit("setNewUser", newUser);
        })
        .catch((err) => {
          commit("setLoading", false);
          commit("setError", err);
          console.log(err);
        });
    },
    autoSignin({ commit }, payload) {
      commit("setNewUser", { id: payload.uid, registeredMeetup: [] });
    },
    logout({ commit }) {
      // to remove the token from local storage
      firebase.auth().signOut();
      commit("setNewUser", null);
    },
    clearError({ commit }) {
      commit("clearError");
    },
  },
  getters: {
    loadedMeetups(state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date;
      });
    },
    featuredMeetups(state, getters) {
      return getters.loadedMeetups.slice(0, 5);
    },
    loadedMeetup(state) {
      return (meetupId) => {
        return state.loadedMeetups.find((meetup) => {
          return meetup.id === meetupId;
        });
      };
    },
    user(state) {
      return state.user;
    },
    error(state) {
      return state.error;
    },
    loading(state) {
      return state.loading;
    },
  },
  modules: {},
});
