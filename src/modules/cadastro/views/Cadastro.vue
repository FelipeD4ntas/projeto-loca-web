<template>
  <v-container>
    <v-card variant="text" class="mb-10">
      <v-img src="@/assets/logo.png" :width="200" class="custom-v-img"></v-img>
    </v-card>
    <v-card variant="text">
      <v-card-title class="text--primary text-center titulo-login">
        Você está muito próximo de mudar a forma de <span>hospedar seu site</span>
      </v-card-title>
      <v-card-subtitle v-if="!planoFoiEscolhido" class="text--primary text-subtitle-1 text-center my-3 custom-subtitle">
        Escolha o seu plano
      </v-card-subtitle>
    </v-card>

    <FormularioCadastro v-if="planoFoiEscolhido" :plano="planoEscolhido" @trocarPlano="planoFoiEscolhido = false"/>
    <PlanoHospedagem v-else @escolherPlano="escolherPlano"/>
  </v-container>
</template>

<script>
import PlanoHospedagem from '../components/PlanoHospedagem.vue';
import FormularioCadastro from '../components/FormularioCadastro.vue';

export default {
  name: 'CadastroView',
  components: {
    PlanoHospedagem,
    FormularioCadastro
  },
  data() {
    return {
      planoFoiEscolhido: false,
      planoEscolhido: {}
    }
  },
  methods: {
    escolherPlano(params) {
      this.planoFoiEscolhido = true;
      this.planoEscolhido = params.planoEscolhido;
    }
  }
}
</script>

<style scoped>
.titulo-login {
  white-space: wrap;
}

span {
  color: #F30168;
  text-decoration: underline;
  text-decoration-thickness: 1px;
  cursor: default;
}

.custom-subtitle {
  color: black !important;
  font-weight: 600;
}
</style>