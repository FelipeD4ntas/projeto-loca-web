<template>
  <v-row justify="center" align="center" class="h-screen">
    <v-col xs="12" sm="6" md="4" lg="3" xl="3">
      <v-card variant="text" class="ma-10 custom-ma">
        <v-img src="@/assets/logo.png" :width="200" class="custom-v-img"></v-img>
      </v-card>

      <v-card flat border rounded>
        <v-card-text class="custom-v-card-text">

          <v-card-text>
            <v-progress-circular
              v-show="isLoading"
              indeterminate
              color="primary">
            </v-progress-circular>
          </v-card-text>

          <v-card-title class="text--primary titulo-login">Entre na sua conta</v-card-title>
          <v-card-subtitle class="sub-titulo-login" color="text">Para aceesar sua conta informe seu e-mail e senha</v-card-subtitle>
          
          <v-card-text>
            <v-form>
              <v-label class="custom-label-color" text="E-mail"></v-label>
              <v-text-field 
                v-model.trim="v$.user.email.$model" 
                variant="outlined" 
                name="email" 
                placeholder="Seu e-mail"
                type="email"
                :error-messages="emailErrors">
              </v-text-field>

              <v-label class="custom-label-color mt-3" text="Senha"></v-label>
              <v-text-field 
                v-model.trim="v$.user.password.$model" 
                variant="outlined" 
                name="password" 
                placeholder="Sua senha"
                type="password"
                :error-messages="passwordErrors">
              </v-text-field>
              <v-btn variant="plain" flat class="float-right v-btn--no-padding v-btn--text-no-uppercase text-body-1 mt-n6">Esqueci minha senha</v-btn>
            </v-form>
          </v-card-text>

          <v-card-text>
            <v-btn block variant="text" class="bg-primary pa-10 custom-pa font-weight-regular text-uppercase text-body-1" :disabled="v$.$invalid" @click="submit">Fazer Login</v-btn>
          </v-card-text>
        </v-card-text>
      </v-card>

      <div class="box-link-criar-conta">
        <p>Ainda não tem conta? 
          <span @click="registerUser">Cadastre-se</span>
        </p>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
import { serviceLogin } from '@/modules/login/services'

export default {
  name: 'LoginView',
  setup() {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      error: undefined,
      isLoading: false,
      user: {
        email: '',
        password: ''
      }
    }
  },
  computed: {
    emailErrors() {
      const  errors = []
      const email = this.v$.user.email
      
      if (!email.$dirty) {
        return errors
      }

      !email.required.$response && errors.push('Email é obrigatório!')
      !email.email.$response && errors.push('Insira um email válido!')

      return errors
    },
    passwordErrors() {
      const  errors = []
      const password = this.v$.user.password
      
      if (!password.$dirty) {
        return errors
      }

      !password.required.$response && errors.push('Senha é obrigatória!')
      !password.minLength.$response && errors.push(`Insira pelo menos ${password.minLength.$params.min} caracteres!`)
      
      return errors
    }
  },
  validations: function () {
    const validations = {
      user: {
        email: {
          required,
          email
        },
        password: {
          required,
          minLength: minLength(6)
        }
      }
    }

    return {
      user: {
        ...validations.user
      }
    }
  },
  methods: {
    async submit() {
      this.isLoading = true;

      const bodyUser =  {
          username:"mor_2314",
          password: "83r5^_"
      }

      try {
        const response = await serviceLogin.login('auth/login', bodyUser);
        this.$router.push(this.$route.query.redirect || '/dashboard');
        localStorage.setItem('AUTH_TOKEN', response.data.token);
        this.isLoading = false;
      } catch(e) {
        console.log(e);
      }
    },
    registerUser() {
      this.$router.push('/cadastro');
    }
  },
}
</script>

<style>
.titulo-login {
  font-size: 29px;
  font-weight: 900;
}

.card-padding {
  padding: 50px;
}

.sub-titulo-login {
  font-size: 16px;
  font-weight: 500;
  color: black !important;
}

.custom-label-color {
  color: black !important;
  font-weight: 500;
}

.v-btn--no-padding {
  padding: 0 !important;
}

.v-btn--text-no-uppercase .v-btn__content {
  text-transform: none !important;
}

.custom-text-field .v-field__input {
  height: 70px !important; /* Ajuste o valor da altura conforme necessário */
}

.v-responsive.v-img.custom-v-img {
  margin: 0 auto;
}

.box-link-criar-conta {
  display: flex;
  justify-content: center;
  margin-top: 36px;
}

.box-link-criar-conta p {
  font-weight: 400;
  font-size: 20px;
}

.box-link-criar-conta span {
  color: #F30168;
  text-decoration: underline;
  text-decoration-thickness: 1px;
  cursor: pointer;
}

@media(max-width: 590px) {
  .titulo-login {
    font-size: 26px;
  }
  
  .sub-titulo-login {
    font-size: 13px;
  }

  .custom-ma {
    margin: 20px !important;
  }

  .custom-pa {
    padding: 25px !important;
  }

  .box-link-criar-conta {
    margin-top: 20px;
  }

  .custom-v-card-text.v-card-text {
    padding-top: 0px !important;
  }
}
</style>