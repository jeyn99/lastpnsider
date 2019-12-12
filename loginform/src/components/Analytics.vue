<template>
  <div>
    <SideBar />
    <br />
    <br />
    <br />
    <div class="table">
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="date"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <!-- For picking the date on the calendar -->
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="date"
            label="Pick a Date"
            prepend-icon="mdi-calendar"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="date" no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
          <v-btn text color="primary" @click="getDataBy(date)">OK</v-btn>
        </v-date-picker>
      </v-menu>
      <div v-for="(ans , index) in answers" :key="index">
        <Props :score="ans" :questionLabel="questions[index]"></Props>
      </div>
      <!-- <Props :score="answers" :question="2"/> -->
    </div>
  </div>
</template>

<script>
import SideBar from "@/components/SideBar"
import Props from "@/components/AnalyticsProps.vue";
import axios from "axios";
export default {
    name: "Analytics",
    data() {
        return {
            questions: [
                "How do you feel in the center?",
                "How was your relationship to your co-scholar?",
                "How was your relationship with PN Staff?",
                "How was your overall performance and collaboration of the tasking team?",
                "What PN core values did you experience this week?",
                "What soft skill or behavior that you want to improve?", //Academic
                "Which educational activities do you prefer?",
                "What subject do you find difficult?",
                "How do you deal with your difficulties?",
                "How was your relationship with your teacher?",
                "What academic skill that you want to improve?",
                "What challenges have you encounter during class?"
            ],
             date: new Date().toISOString().substr(0, 10),
            menu: false,
            answers: [],
            total: []
        };
    },
    components: {
        Props,
        SideBar
    },
    mounted() {
        var i = 1;
        for (i; i < 13; i++) {
            axios
                .post("http://localhost:8081/admin/report/summary/" + i)
                .then(res => {
                    this.total.push(res.data.data.length)
                    this.answers.push(res.data.data);
                })
                .catch(err => {
                    console.log("Ni error", err);
                });
        }
    },
    methods: {
        getDataBy(date) {
          this.menu = false;
            console.log(date)
            this.answers = [],
            this.total = [],
            axios
                .post("http://localhost:8081/admin/report/date",{date: date})
                .then(res => {
                    this.total.push(res.data.data.length)
                    this.answers.push(res.data.data);   
                    console.log(res.data)
                })
                .catch(err => {
                    console.log("Ni error", err);
                })
        }
    }
};
</script>
