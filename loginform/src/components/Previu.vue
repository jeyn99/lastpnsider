<template>
  <div>
    <!-- <v-btn @click="showanswers">Preview Answers</v-btn> -->
    <!-- <v-form v-for="(ans , index) in centerLife" :key="index">
            <StudentAnswers :answers="ans[index]"/>
    </v-form>-->
    <StudentAnswers
      v-for="(item , i) in centerLife"
      :key="i"
      :centerLife="item"
      :academicLife="academicLife[i]"
      :timestamp="timestamp[0]"
    />
  </div>
</template>

<script>
import { showAnswers } from "@/axios/axios";
import StudentAnswers from "@/components/StudentAnswers.vue";
export default {
  components: {
    StudentAnswers
  },
  data() {
    return {
      preview: [],
      timestamp: [],
      centerLife: [],
      academicLife: []
    };
  },
  mounted() {
    showAnswers()
      .then(data => {
        for (let i = 0; i < data.length; i++) {
          // window.console.log(data[i].categories.centerLife)
          this.timestamp.push(new Date(data[i].timestamp).toUTCString());
          this.centerLife.push(data[i].categories.centerLife);
          this.academicLife.push(data[i].categories.academicLife);
        }
      })
      .catch(err => alert(err));
  }
};
</script>

<style>

</style>
