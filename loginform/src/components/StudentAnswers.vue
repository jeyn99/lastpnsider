<template>
  <div class="card">
    <v-card max-width="80%">
      <v-card-text>
        <div class="text--primary">
          <v-card-text>
            <div>{{questions[0]}} {{centerLife.Q1}}</div>
            <div>{{questions[1]}} {{centerLife.Q2}}</div>
            <div>{{questions[2]}} {{centerLife.Q3}}</div>
            <div>{{questions[3]}} {{centerLife.Q4}}</div>
            <div>{{questions[4]}} {{centerLife.Q5}}</div>
            <div>{{questions[5]}} {{centerLife.Q6}}</div>
            <div>{{questions[6]}} {{academicLife.Q7}}</div>
            <div>{{questions[7]}} {{academicLife.Q8}}</div>
            <div>{{questions[8]}} {{academicLife.Q9}}</div>
            <div>{{questions[9]}} {{academicLife.Q10}}</div>
            <div>{{questions[10]}} {{academicLife.Q11}}</div>
            <div>{{questions[11]}} {{academicLife.Q12}}</div>
          </v-card-text>
        </div>
        <h2 class="time">{{ timestamp }}</h2>
        <br>
      </v-card-text>
    </v-card>
    <br />
  </div>
</template>

<script>
export default {
  props: {
    academicLife: {
      type: Object,
      required: true
    },
    centerLife: {
      type: Object,
      required: true
    },
    timestamp: {
      type: Date,
      required: true
    },
    questionLabel: String
  },
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
      ]
    };
  },
};
</script>

<style>
.card {
  margin-left: 15%;
  margin-top: 5%;
}
.time {
  float: right;
}
</style>