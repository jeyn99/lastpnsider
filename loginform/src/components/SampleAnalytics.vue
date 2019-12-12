<template>
<div id="chart">
    <apexchart width="500" type="bar" :options="options" :series="series"></apexchart>
</div>
</template>

<script>
import axios from "axios"

export default {
    data: function() {
    return {
      options: {
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          categories: ["comfortable"]
        }
      },
      series: [{
        name: 'series-1',
        data: []
      }]
    }
  },
   mounted() {
        var i = 1;
        for (i; i < 13; i++) {
            axios
                .post("http://localhost:8081/admin/report/summary/" + i)
                .then(res => {
                    this.series[0].data.push(res.data.data.length)
                    // this.answers.push(res.data.data);
                })
                .catch(err => {
                    console.log("Ni error", err);
                });
        }
    }
}
</script>

<style>

</style>
