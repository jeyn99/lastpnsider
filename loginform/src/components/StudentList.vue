<template>
<div>
<SideBar/> 
<br/> <br/> <br/> 
<v-container>
<v-data-table :headers="headers" :items="students" sort-by="calories" class="elevation-1">
    <template v-slot:top>
        <v-toolbar flat color="white">
            <v-toolbar-title>Student 2021</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-row justify="center">
                <v-dialog v-model="dialog" persistent max-width="600px">
                    <template v-slot:activator="{ on }">
                        <v-btn color="blue" dark v-on="on">AddStudent</v-btn>
                    </template>
                    <v-card>
                        <v-container>
                            <v-card-title>
                                <span class="headline">Student Profile</span>
                            </v-card-title>
                            <v-form ref="form" v-model="valid" @submit.prevent="create">

                                <v-text-field v-model="firstname" :rules="nameRules" label="First Name" required></v-text-field>

                                <v-text-field v-model="lastname" :rules="nameRules" label="Last Name" required></v-text-field>

                                <v-select :items="batch" v-model="batch" :rules="batchRules" label="Batch"></v-select>

                                <v-select :items="gender" v-model="gender" label="Gender"></v-select>

                                <v-text-field v-model="username" :rules="nameRules" label="Username" required></v-text-field>

                                <v-text-field v-model="password" :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"  :type="show2 ? 'text' : 'password'" name="input-10-2" label="Password" hint="At least 8 characters" class="input-group--focused" @click:append="show2 = !show2"></v-text-field>

                                <v-card-actions>
                                    <v-spacer />
                                    <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                                    <v-btn :disabled="!valid" color="success" class="mr-4" @click="formActions">
                                        Add Account
                                    </v-btn>
                                </v-card-actions>
                            </v-form>
                        </v-container>
                    </v-card>
                </v-dialog>
            </v-row>
        </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
        <v-icon small class="mr-2" @click="editStudent(item)">
            edit
        </v-icon>
        <v-icon small @click="deleteStudent(item)">
            delete
        </v-icon>
    </template>
</v-data-table>
</v-container>
</div>
</template>

<script>
import SideBar from "@/components/SideBar"
import {
    createStudent
} from '@/axios/axios.js'
// import AddStudent from '@/components/AddStudent.vue'
// import Students from '@/components/Students.vue'
import {
    getStudents,
    deleteStudent,
    updateStudent
} from '@/axios/axios.js'
export default {
    components: {
        // AddStudent,
        SideBar
    },
    data() {
        return {
            gender:["Male", "Female"],
            batch: [2021, 2022],
            add: true,
            search: '',
            students: [],
            dialog: false,
            headers: [{
                    text: 'First Name',
                    align: 'left',
                    sortable: false,
                    value: 'firstname',
                },
                {
                    text: 'Last Name',
                    value: 'lastname',
                },
                {
                    text: 'Batch',
                    value: 'batch'
                },
                 {
                    text: 'Gender',
                    value: 'gender'
                },
                {
                    text: 'Username',
                    value: 'username'
                },
                {
                    text: 'Password',
                    value: 'password'
                },
                {
                    text: 'Actions',
                    value: 'action',
                    sortable: false
                },
            ],
            studentId: 0,
            editedIndex: -1,
            firstname: '',
            lastname: '',
            username: '',
            email: '',
            password: '',
            show2: false,
            valid: true,
            // paswordRules: [
            //     v => !!v || 'Password is required',
            //     v => /^([a-zA-Z0-9@*#]{8,15})$/.test(v) || 'Password matching expression. Match all alphanumeric character and predefined wild characters. Password must consists of at least 8 characters and not more than 15 characters.',
            // ],
            batchRules: [
                v => !!v || 'This is Required Field',
                v => /^[0-9]*$/.test(v) || 'This Field should be a number',
            ],
            nameRules: [
                v => !!v || 'This is Required Field',
                v => /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(v) || 'This field should contain only Letters',
            ]
        }
    },
    mounted() {
        getStudents()
            .then(data => this.students = data.data)
            .catch((err => alert(err)));
    },
    methods: {
        deleteStudent(items) {
            const index = this.students.indexOf(items)
            const student = this.students[index]
            deleteStudent(student._id)
                .then(() => {
                    this.$emit('deleteStudent', student._id);
                    confirm('Are you sure you want to delete this item?') && this.$swal("Success","account deleted", "success")&& this.students.splice(index, 1)
                })
                .catch(err => alert(err.message));
        },
        editStudent(item) {
            this.add = false
            this.firstname = item.firstname;
            this.lastname = item.lastname;
            this.batch = this.batch,
             this.gender = this.gender,
            this.username = item.username
            this.studentId = item._id
            this.password = item.password
            this.editedIndex = this.students.indexOf(item)
            this.dialog = true
        },
        validate() {
            if (this.$refs.form.validate()) {
                this.snackbar = true
            }
        },
        create: function () {
            let data = {
                firstname: this.firstname,
                lastname: this.lastname,
                batch: this.batch,
                gender: this.gender,
                username: this.username,
                password: this.password
            }   
            createStudent(data)
                .then(data => {
                    this.$swal("Success","new account added", "success") &&
                    this.$emit('createStudent', data.data);
                    getStudents()
                        .then(data => this.students = data.data)
                        .catch((err => alert(err)));
                    this.firstname = this.lastname = this.password = this.username = this.gender = this.batch = '';
                    this.dialog = false;
                })
                .catch(err => alert(err.message));
        },
        update() {
            window.console.log(this.studentId)
            let data = {
                firstname: this.firstname,
                lastname: this.lastname,
                gender: this.gender,
                batch: this.batch,
                username: this.username,
                password: this.password
            };
            updateStudent(data, this.studentId)
                .then(data => {
                    this.$swal("Success","account updated", "success") &&
                    this.$emit("updateStudent", data.account);
                    this.dialog = false;
                     this.firstname = this.lastname = this.password = this.username = this.gender = this.batch = '';
                    getStudents()
                        .then(data => this.students = data.data)
                        .catch((err => alert(err)));
                })
        },
        formActions() {
            if (this.add == true) {
                this.create()
            } else {
                this.update()
            }
        }
    },
}
</script>

<style>
</style>