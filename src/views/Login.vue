<template>
    <div>
        <v-form ref="form" v-model="valid" lazy-validation>
            <v-container fluid>
                <v-row justify="center">
                    <v-col cols="10" md="4">
                        <v-alert :value="!!mensagem" type="error" dense>
                            {{ mensagem }}
                        </v-alert>
                        <v-text-field
                            prepend-icon="mdi-account"
                            :value="form.username"
                            v-on:keyup="form.username = $event.target.value"
                            :counter="8"
                            :rules="nameRules"
                            placeholder="Nome do usuário"
                            v-on:keyup.enter="logon"
                            required
                        >
                        </v-text-field>
                        <v-text-field
                            class="mt-2"
                            :prepend-icon="
                                showPassw ? 'mdi-eye' : 'mdi-eye-off'
                            "
                            :value="form.password"
                            v-on:keyup="form.password = $event.target.value"
                            :rules="passwordRules"
                            placeholder="Senha"
                            :type="showPassw ? 'text' : 'password'"
                            v-on:keyup.enter="logon"
                            @click:prepend="showPassw = !showPassw"
                            required
                        >
                        </v-text-field>
                        <v-btn
                            class="mt-4"
                            :loading="isProcessando"
                            :disabled="!valid"
                            color="success"
                            @click="logon"
                            block
                            large
                        >
                            Entrar no Sistema
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            form: {
                username: '',
                password: ''
            },
            mensagem: null,
            valid: true,
            showPassw: false,
            isProcessando: false,

            nameRules: [
                v => !!v || 'Informe o usuário',
                v =>
                    (v && v.length <= 8) ||
                    'Nome deve ter no máximo 8 caracteres'
            ],

            passwordRules: [
                v => !!v || 'Informe a senha',
                v =>
                    (v && v.length <= 12) ||
                    'Senha deve ter no máximo 12 caracteres'
            ]
        };
    },

    computed: {},

    methods: {
        ...mapActions(['LogIn']),
        async logon() {
            if (!this.$refs.form.validate()) {
                return;
            }
            this.isProcessando = true;
            this.mensagem = null;
            try {
                var erro = await this.LogIn(this.form);
                if (erro) {
                    this.mensagem = 'Usuário ou senha inválido';
                } else {
                    this.$router.push({ name: 'books' });
                }
            } catch (error) {
                console.log('erro login ' + error);
            } finally {
                this.isProcessando = false;
            }
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped />
