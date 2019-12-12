<template>
<div id="table" class="spacer">
    <v-data-table :headers="headers" :items="score" hide-default-footer class="elevation-1">
        <template v-slot:top>
            <v-toolbar flat color="white">
                <v-toolbar-title>
                    <i>{{questionLabel}}</i>
                </v-toolbar-title>
                {{ question }}
                <v-dialog v-model="modal">

                    <v-data-table :headers="header" :items="students" hide-default-footer class="elevation-1"></v-data-table>
                </v-dialog>
            </v-toolbar>
        </template>
        <template v-slot:item.action="{ item }">
            <v-icon small @click="seeStudentWhoAnswered(item)">mdi-account-multiple</v-icon>
        </template>
    </v-data-table>
    <hr>
</div>
</template>

<script>
import axios from "axios";
export default {
    props: {
        score: {
            type: Array,
            required: true
        },
        question: Number,
        questionLabel: String
    },
    data() {
        return {
            headers: [
                // { text: "Number of Answers", value: "description" },
                {
                    text: "Category",
                    align: "left",
                    value: "_id"
                },
                {
                    text: "Number of Answers",
                    value: "answers"
                },
                {
                    text: "Action",
                    value: "action",
                    sortable: false
                }
            ],
           
            gender: "",
            genderCount: "",
            genderM: "",
            genderCountM: "",
            answers: [],
            students: [],
            dialog: false,
            modal: false,

            header: [{
                    text: "Last Name",
                    align: "left",
                    value: "lastname"
                },
                {
                    text: "First Name",
                    value: "firstname"
                },
                {
                    text: "Gender",
                    value: "gender",

                },
                {
                    text: "Batch",
                    value: "batch",

                }
            ]
        };
    },
    methods: {
        seeStudentWhoAnswered(item) {
            console.log(item._id);
            this.students = [];
            axios
                .get(
                    "http://localhost:8081/admin/report/summary/" +
                    item.description +
                    "/" +
                    item._id
                )
                .then(res => {
                    // console.log(res.data.genderCount[0]._id)
                    for (let i = 0; i <= res.data.data.length; i++) {
                        this.students.push(res.data.data[i].studentID);
                        // this.gender = res.data.genderCount[0]._id 
                        // this.genderCount = res.data.genderCount[0].count
                        // this.genderM = res.data.genderCount[1]._id
                        // this.genderCountM = res.data.genderCount[1].count
                        // this.gender.push(res.data.genderCount[j].count)
                        // i++;
                    }

                    //  for(let j = 0; j <= res.data.genderCount.length; j++){
                    //      this.gender.push(res.data.genderCount[j])
                    // }

                })
                .catch(err => {
                    console.log(err);
                });
            this.modal = true
        }
    }
};
</script>

<style>
.table {
    margin-left: 10%;
    max-width: 80%;
    background-color: #ffffff;
    padding: 20px;
    text-align: center;
}

.spacer {
    margin: 10%;
}

.p {
    color: white;
    font-size: 20px;
    text-align: center;
    letter-spacing: 5px;
}
</style>
