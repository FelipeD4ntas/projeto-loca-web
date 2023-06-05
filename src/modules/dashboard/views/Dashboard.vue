<template>
  <v-row justify="center">
    <v-col xs="12" sm="10" md="10" lg="10" xl="10">
      <v-card class="custom-v-card-dashboad" elevation="0">
        <v-layout>
          <v-app-bar color="background" elevation="0">
            <template v-slot:prepend>
              <v-img src="@/assets/logo.png" :width="200" class="custom-v-img"></v-img>
            </template>
        
            <v-spacer></v-spacer>
        
            <v-btn icon @click="value = !value">
              <v-icon>mdi-account</v-icon>
            </v-btn>
            <v-btn v-show="value" @click="logout">
              Sair
            </v-btn>
          </v-app-bar>
    
          <v-main class="custom-v-main">
            <v-container fluid>
              <v-row justify="center">
                <v-col xs="12" sm="12" md="8" lg="8" xl="8">
                  <v-card-title class="text--primary custom-title">Olá João,</v-card-title>
                  <v-card-subtitle class="custom-subtitle">Seja bem vindo a sua conta de hospendagem.</v-card-subtitle>
          
                  <v-card class="custom-v-card-iframe my-9" elevation="0">
                    <iframe 
                      class="custom-iframe" src="https://www.youtube.com/embed/fpa2W3YNg0Q" 
                      title="YouTube video player" frameborder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                      allowfullscreen>
                    </iframe>
                  </v-card>

                  <v-card-subtitle class="custom-subtitle-iframe">
                    Caso tenha alguma dúvida, <a>visite a nossa central de ajuda.</a>
                  </v-card-subtitle>
                </v-col>
               </v-row>
            </v-container>
          </v-main>
        </v-layout>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'DashboardView',
  data() {
    return {
      value: false
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('AUTH_TOKEN');
      this.$router.push(this.$route.query.redirect || '/login');
    }
  }
}

</script>

<style>
.custom-title {
  font-size: 29px;
  font-weight: 900;
}

.custom-subtitle,
.custom-subtitle-iframe {
  font-size: 19px;
  font-weight: 500;
  color: black !important;
}

.custom-subtitle-iframe a {
  text-decoration: underline;
}

.custom-v-card-iframe {
  height: 60vh;
}

.custom-iframe {
  width: 100%;
  height: 100%;
}

.custom-v-main {
  background: #FAFAFC;
}

@media(max-width: 590px) {
  .custom-title {
    font-size: 26px;
  }
  
  .custom-subtitle,
  .custom-subtitle-iframe {
    font-size: 13px;
  }

  .custom-subtitle-iframe a {
    display: block;
    font-size: 16px;
  }
}
</style>