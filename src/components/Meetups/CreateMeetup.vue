<template>
  <v-container>
    <v-row>
      <v-col xs="12" sm="6" offset-sm="3">
        <h4>Create a new Meetup</h4>
      </v-col>
    </v-row>
    <v-row>
      <v-col xs="12" sm="6" offset-sm="3">
        <form @submit.prevent="createNewMeetup" ref="form">
          <v-text-field
            v-model="title"
            label="Title"
            name="title"
            id="title"
            required
          ></v-text-field>
          <v-text-field
            v-model="location"
            label="Location"
            name="location"
            id="location"
            required
          ></v-text-field>
          <!-- <v-text-field
            v-model="imageUrl"
            label="Image URL"
            name="imageUrl"
            id="imageUrl"
            required
          ></v-text-field> -->
          <v-btn class="orange mb-5" raised @click="onPickFile">Upload Image</v-btn>
          <input type="file" ref="inputFile" accept="image/*" class="d-none"  @change="pickedFile">
          <img :src="imageUrl" style="width:100%; height:250px"/>
          <h4>Choose Date and Time</h4>
          <v-row>
            <!--  -->
            <v-col lg="6">
              <v-date-picker v-model="date"></v-date-picker>
            </v-col>
            <v-col lg="6">
              <v-time-picker v-model="time" format="24hr"></v-time-picker>
            </v-col>
          </v-row>
          <v-text-field
            v-model="description"
            label="Description"
            name="description"
            id="description"
            multi-line
            required
          ></v-text-field>
          <v-btn class="mr-4" :disabled="!formIsValid"
            type="submit"
            >submit</v-btn
          >    
          <v-btn @click="clear">clear</v-btn>
        </form>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    title: "",
    location: "",
    imageUrl: "",
    description: "",
    date: new Date ().toISOString().substr(0, 10),
    time: new Date (),
    image: null
    
  }),

  computed: {
    formIsValid() {
      return (
        this.title !== "" &&
        this.location !== "" &&
        this.imageUrl !== "" &&
        this.description !== ""
      );
    },
    submittedDateTime (){
      const date = new Date (this.date)
      if (typeof this.time === 'string') {
        let hours = this.time.match(/^(\d+)/)[1]
        const minutes = this.time.match(/:(\d+)/)[1]
          date.setHours(hours)
          date.setMinutes(minutes)
      } else {
        date.setHours(this.time.getHours())
        date.setMinutes(this.time.getMinutes())
      }
      return date
    }
  },

  methods: {
    createNewMeetup () {
      // check if the form not valid return from method and prevent the submit
        if (!this.formIsValid) {
            return
        }
      // check if the iamge is null return from method and prevent the submit
        if (!this.image) {
          return
        } 
        const meetupDate = {
            title: this.title,
            location: this.location,
            image: this.image,
            description: this.description,
            date: this.submittedDateTime,
        }
        this.$store.dispatch('createMeetup', meetupDate)
        this.$router.push('/meetups')

        this.title = "";
        this.location = "";
        this.imageUrl = "";
        this.description = "";
    },
    onPickFile () {
      this.$refs.inputFile.click()
    },
    pickedFile (event) {
      const files = event.target.files
      let filename = files[0].name 
      // check if the uploaded file dose have a valid extention
      if (filename.lastIndexOf('.') <= 0) {
        return alert ('Please add a valid file !')
      }
      // translate a bainary file to string which I can uploaded
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result
        // console.log(this.imageUrl)
      })
      fileReader.readAsDataURL(files[0])
      this.image = files[0]

    },
    clear() {
     this.$refs.form.reset()
      this.title = "";
      this.location = "";
      this.imageUrl = "";
      this.description = "";
    },
  },
};
</script>
