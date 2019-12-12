<template>
<div id="app">
    <v-snackbar v-model="snackbar" :top="y === 'top'" :timeout="timeout">
        {{ text }}
        <v-btn color="blue" text @click="snackbar = false">
            Close
        </v-btn>
    </v-snackbar>
    <v-app id="inspire">
        <v-content>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md4>
                        <v-card class="elevation-12">
                            <v-toolbar color="blue" dark flat>
                                <v-toolbar-title>Login</v-toolbar-title>
                                <v-spacer></v-spacer>
                            </v-toolbar>
                            <v-card-text>
                                <v-form @submit.prevent="submit">
                                    <v-text-field label="Login" v-model="username" name="login" prepend-icon="mdi-account" type="text"></v-text-field>

                                    <v-text-field id="password" label="Password" v-model="password" name="password" prepend-icon="mdi-lock" type="password"></v-text-field>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue" @click="submit">Login</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</div>
</template>

<script>
import {
    loginAdmin
    // createAdmin
} from "@/axios/axios"
// import axios from "axios"
export default {
    data() {
        return {
            username: "",
            password: "",
            snackbar: false,
            text: 'Username or Password is Incorrect',
            timeout: 2000,
            y: 'top',
        }
    },
    methods: {
        submit() {
            let data = {
                username: this.username,
                password: this.password
            }
            // createAdmin(data)
            //     .then(data=>{
            //         this.$emit("createAdmin", data.data)
            //     })
            //     .catch((err) => alert(err))  

            loginAdmin(data)
                .then(data => {
                    console.log(data)
                    this.$emit("loginAdmin", data.data)
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("username", data.username)
                    localStorage.setItem("id", data.id)
                    if (data.username == "admin") {
                        this.$router.push('/about')
                    } else {
                        this.$router.push('/form')
                    }
                })
                .catch(() => this.snackbar = true)
        }
    }
}
</script>

<style>
.v-content__wrap {
    -webkit-box-flex: 1;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    max-width: 100%;
    position: relative;
    background-image: url('https://404store.com/2018/04/03/wallhaven-109498.png');
    background-size: cover;
}
</style>
