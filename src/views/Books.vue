<template>
    <div class="about">
        <v-alert :value="!!mensagem" type="error" dense>
            {{ mensagem }}
        </v-alert>
        <v-card>
            <v-card-title>
                <v-row>
                    <v-col cols="10" md="3">
                        <v-text-field
                            v-model="search"
                            append-icon="mdi-magnify"
                            label="Filtro"
                            single-line
                            hide-details
                            clearable
                        ></v-text-field>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col cols="1" class="mt-4 mr-4">
                        <v-btn icon color="green" @click="getBooks">
                            <v-icon>mdi-cog-refresh-outline</v-icon></v-btn
                        >
                    </v-col>
                </v-row>
            </v-card-title>
            <v-data-table
                dense
                :headers="headers"
                :items="myBooks"
                :search="search"
                :footer-props="{
                    itemsPerPageText: 'Linhas por pag',
                    pageText: '{0}-{1} de {2}',
                    itemsPerPageAllText: 'Todos',
                    itemsPerPageOptions: [10, 15, 25, 30, -1]
                }"
                no-data-text="Não há dados para exibir"
            ></v-data-table>
        </v-card>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    data: () => ({
        mensagem: null,
        search: '',
        headers: [
            {
                text: 'autor',
                value: 'author',
                align: 'left',
                class:
                    'text-subtitle-1 text-center font-weight-bold text-uppercase'
            },
            {
                text: 'país',
                value: 'country',
                align: 'left',
                class:
                    'text-subtitle-1 text-center font-weight-bold text-uppercase'
            },
            {
                text: 'lingua',
                value: 'language',
                align: 'left',
                class:
                    'text-subtitle-1 text-center font-weight-bold text-uppercase'
            },
            {
                text: 'páginas',
                value: 'pages',
                align: 'right',
                class:
                    'text-subtitle-1 text-center font-weight-bold text-uppercase'
            },
            {
                text: 'título',
                value: 'title',
                align: 'left',
                class:
                    'text-subtitle-1 text-center font-weight-bold text-uppercase'
            },
            {
                text: 'ano',
                value: 'year',
                align: 'center',
                class:
                    'text-subtitle-1 text-center font-weight-bold text-uppercase'
            }
        ]
    }),

    computed: {
        myBooks() {
            return this.$store.getters.StateBooks;
        }
    },

    created: function() {
        this.getBooks();
    },

    methods: {
        ...mapActions(['books']),
        async getBooks() {
            this.mensagem = null;
            try {
                await this.books();
            } catch (error) {
                console.log('book error: -->>> ' + error);
            }
        }
    }
};
</script>
