<template>
<div class="headertable">
    <v-app-bar absolute color="blue" dark fix class="appbar">
        <v-btn @click.stop="drawer = !drawer" x-medium color="teal" height="50" icon>
            <v-icon color="white">mdi-menu</v-icon>
        </v-btn>
        <v-list-item-avatar>
            
        </v-list-item-avatar>
        <v-toolbar-title>PNsider</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn link @click="logout()" class="mx-2" fab dark color="white" title="logout" icon>
            Logout
            <v-icon dark>mdi-logout</v-icon>
        </v-btn>
    </v-app-bar>
    <v-navigation-drawer height="910" class="overflow-hidden" v-model="drawer" absolute temporary>
        <v-list-item>
            <v-list-item-avatar>
            </v-list-item-avatar>

            <v-list-item-content>
                <v-list-item-title>PNsider</v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense>
            <v-list-item link @click="dashboard">
                <v-list-item-action>
                    <v-icon>mdi-home</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>Dashboard</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item link @click="studentList">
                <v-list-item-action>
                    <v-icon>mdi-account</v-icon>
                    <!-- <i class="fad fa-clipboard-list"></i> -->
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>Student List</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>

    <v-container fluid>
        <v-row dense></v-row>
    </v-container>
</div>
</template>

<style scoped>
.headertable {
    height: 60px;
    position: fixed;
    width: 100%;
    z-index: 1;
}

.v-image__image,
.v-image__placeholder {
    z-index: -1;
    position: absolute;
    width: 100%;
    height: 100%;
}

.theme--light.v-data-table.v-data-table--fixed-header thead th {
    background: teal;
    -webkit-box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.12);
    box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.12);
    height: 60px;
}

.theme--light.v-data-table thead tr th {
    color: white;
    font-size: 30px;
}

.fa-sign-out-alt:before {
    color: white;
    content: "\f2f5";
}

.fa-home:before {
    content: "\f015";
    color: green;
}

.fa-clipboard-list:before {
    content: "\f46d";
    color: green;
}

.fa-building:before {
    content: "\f1ad";
    color: green;
}

.fa-calendar-plus:before {
    content: "\f271";
    color: green;
}

.v-list-item .v-list-item__title,
.v-list-item .v-list-item__subtitle {
    line-height: 2;
    color: teal;
    font-size: 20px;
}

.v-list-item--dense .v-list-item__title,
.v-list-item--dense .v-list-item__subtitle,
.v-list--dense .v-list-item .v-list-item__title,
.v-list--dense .v-list-item .v-list-item__subtitle {
    font-size: 17px;
    font-weight: 500;
    line-height: 1rem;
}

.appbar {
    height: 20%;
}
</style>

<script>
import axios from "axios";
export default {
    name: "sidebar",
    data: () => ({
        drawer: false
    }),
    methods: {
        dashboard() {
          this.$router.push("/analytics").catch(() => {});
        },
        studentList() {
          this.$router.push("/about").catch(() => {});
        },
        // addevent() {
        //   this.$router.push("/admin/addevent").catch(err => {});
        // },
        // aboutus() {
        //   this.$router.push("/admin/about").catch(err => {});
        // },
        logout() {
            // this.$store.dispatch('logout')
            localStorage.removeItem("username");
            localStorage.removeItem("token");
            delete axios.defaults.headers.common["Authorization"];
            this.$router.push("/");
        }
    }
};
</script>
