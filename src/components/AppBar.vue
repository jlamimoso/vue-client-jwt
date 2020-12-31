<template>
    <div>
        <v-app-bar dark v-if="$store.getters.StateUser">
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
            <v-toolbar-title style="cursor: pointer" @click="home">
                Teste API JWT
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <p class="my-auto mr-8 text-body-2">
                Olá, {{ $store.getters.StateUser }}
            </p>
            <v-tooltip left>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on" @click="logout">
                        <v-icon>mdi-logout</v-icon>
                    </v-btn>
                </template>
                <span>Sair</span>
            </v-tooltip>
        </v-app-bar>
        <v-app-bar dark v-else>
            <v-toolbar-title style="cursor: pointer" @click="home">
                Teste API JWT
            </v-toolbar-title>
        </v-app-bar>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    methods: {
        ...mapActions(['LogOut']),
        async logout() {
            await this.LogOut();
            return this.$router.push({ name: 'login' }, () => {});
        },

        async home() {
            if (this.$route.name != 'login') {
                await this.LogOut();
                return this.$router.push({ name: 'login' }, () => {});
            }
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped />
