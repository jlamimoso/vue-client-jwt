<template>
    <div>
        <h1>Tela de erro {{ this.$route.params.erro }}</h1>
    </div>
</template>

<script>
export default {
    name: 'Erro',

    created() {
        console.log('erro.... ' + this.$route.params.erro);
    }
};
</script>
