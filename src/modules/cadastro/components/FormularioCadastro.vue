<template>
  <v-row class="mt-9 card-container" justify="center">
    <v-col class="card-form order-xl-last" xs="12" sm="12" md="12" lg="6" xl="6">
      <v-card flat border rounded class="custom-v-card-form">
        <v-card-text>
          <v-card-title class="text--primary titulo-login">Dados pessoais</v-card-title>
          <v-card-subtitle class="sub-titulo-login" color="text">Informe seus dados pessoais para acesso à sua conta</v-card-subtitle>
          
          <v-card-text>
            <v-form>
              <v-label class="custom-label-color mt-3" text="Nome completo"></v-label>
              <v-text-field 
                v-model.trim="v$.user.name.$model" 
                variant="outlined" 
                name="nome-completo" 
                placeholder="Informe seu nome completo"
                type="text"
                :error-messages="nameErrors"
                class="custom-text-field">
              </v-text-field>

              <v-label class="custom-label-color mt-3" text="phoneNumber"></v-label>
              <v-text-field 
                v-model.trim="v$.user.phoneNumber.$model" 
                variant="outlined" 
                name="phoneNumber" 
                placeholder="(99) 99999-0000"
                type="text"
                :error-messages="phoneNumberErrors"
                v-mask="'(##) #####-####'"
                class="custom-text-field">
              </v-text-field>

              <v-label class="custom-label-color mt-3" text="E-mail"></v-label>
              <v-text-field 
                v-model.trim="v$.user.email.$model" 
                variant="outlined" 
                name="email" 
                placeholder="Seu e-mail"
                type="email"
                :error-messages="emailErrors"
                class="custom-text-field">
              </v-text-field>

              <v-label class="custom-label-color mt-3" text="Senha"></v-label>
              <v-text-field 
                v-model.trim="v$.user.password.$model" 
                variant="outlined" 
                name="password" 
                placeholder="Sua senha"
                type="password"
                :error-messages="passwordErrors"

                class="custom-text-field">
              </v-text-field>

              <v-label class="custom-label-color mt-3" text="Confirme sua senha"></v-label>
              <v-text-field 
                v-model.trim="v$.user.passwordConfirm.$model" 
                variant="outlined" 
                name="passwordConfirmed" 
                placeholder="Confirme sua senha"
                type="password"
                :error-messages="passwordConfirmErrors"
                class="custom-text-field">
              </v-text-field>
            </v-form>
          </v-card-text>
          <v-divider class="mb-4 my-4"></v-divider>

          <v-card-title class="text--primary titulo-login">Dados do seu site</v-card-title>
          <v-card-text>
            <v-label class="custom-label-color mt-3" text="Nome do seu site"></v-label>
            <v-text-field 
              v-model.trim="v$.user.siteName.$model" 
              variant="outlined" 
              name="nome-site" 
              placeholder="Meu site"
              type="text"
              :error-messages="siteNameErrors"
              class="custom-text-field">
            </v-text-field>
          </v-card-text>

          <v-divider class="mb-4 my-4"></v-divider>

          <v-card-text>
            <label class="custom-checkbox">
              <input type="checkbox">
              <span class="checkmark"></span>
              Ao concluir com seu cadastro você concorda com nossos <br><a class="termos">termos de uso</a> e <a class="politicas">politicas de privacidade.</a>
            </label>
          </v-card-text>

          <v-card-text>
            <v-progress-circular
              v-show="isLoading"
              indeterminate
              color="primary">
            </v-progress-circular>
          </v-card-text>
         
          <v-card-text>
            <v-btn block variant="text" class="bg-primary pa-9 font-weight-regular text-uppercase text-body-1" :disabled="v$.$invalid" @click="submit">Criar Conta</v-btn>
          </v-card-text>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col class="card-plano order-xl-first" xs="12" sm="12" md="12" lg="4" xl="3">
      <v-card flat class="text-center pa-9 custom-v-card-plano-escolhido">
        <v-btn
         variant="flat"
         rounded="lg"
         class="custom-v-btn-plano-escolhido">
          Plano escolhido
        </v-btn>

        <div class="conteudo-plano">
          <v-card-title class="custom-title">Hospedagem {{plano.hospedagem}}</v-card-title>
          <div class="my-4">
          
            <p class="text-h4 custom-valor">
              <span class="custom-span-valor" v-if="plano.valor != 'Grátis'">R$</span>
              {{ plano.valor }}
              <span class="custom-span-valor" v-if="plano.valor != 'Grátis'">/mês</span></p>
          </div>
          <v-card-subtitle>{{ plano.detalheValor }}</v-card-subtitle>
          <v-card-subtitle class="my-2">{{ plano.taxa }}</v-card-subtitle>
          <v-divider class="mb-4 my-4 mx-5"></v-divider>
          <div class="my-4 mb-4 custom-ideal">
            <p class="text-h6 custom-text-h6 px-9">Ideal {{ plano.ideal }}</p>
          </div>
          <v-divider class="mb-4 my-4 mx-5"></v-divider>
          <v-card-title class="text-left mt-5">
            Seu site em servidores <span class="text-underline">no<br>{{ plano.paisServidor}}</span>
          </v-card-title>
          <v-list-item>
            <ul class="custom-list text-left">
              <li class="custom-list-item"  v-for="(beneficio, index) in plano.beneficios" :key="index">
                <v-icon icon="mdi-check" class="custom-icon"></v-icon>
                <p class="custom-list-item-title">{{ beneficio }}</p>
              </li>
            </ul>
          </v-list-item>
          <v-card-title class="text-left mt-5">
            Suporte 24 horas, 7 dias por <br> semana grátis;
          </v-card-title>
          <v-card-title class="text-left mt-5">
            Aplicativos disponíveis;
          </v-card-title>
          <v-list-item>
            <ul class="custom-list text-left">
              <li class="custom-list-item"  v-for="(aplicativo, index) in plano.aplicativosDisponiveis" :key="index">
                <v-icon icon="mdi-check" class="custom-icon"></v-icon>
                <p class="custom-list-item-title">{{ aplicativo }}</p>
              </li>
            </ul>
          </v-list-item>
          <div v-if="plano.valor != 'Grátis'">
            <v-card-title class="text-left mt-5">
              Migração Gratuita;
            </v-card-title>
            <v-list-item>
              <ul class="custom-list text-left">
                <li class="custom-list-item">
                  <v-icon icon="mdi-check" class="custom-icon"></v-icon>
                  <p class="custom-list-item-title">Migramos todos os seus sites <br>para nossos servidores</p>
                </li>
              </ul>
            </v-list-item>
          </div>
          <v-card-title class="text-left mt-5">
            Você ainda tem;
          </v-card-title>
          <v-list-item>
            <ul class="custom-list text-left">
              <li class="custom-list-item"  v-for="(bonus, index) in plano.voceAindaTem" :key="index">
                <v-icon icon="mdi-check" class="custom-icon"></v-icon>
                <p class="custom-list-item-title">{{ bonus }}</p>
              </li>
            </ul>
          </v-list-item>
        </div>

        <div class="btn-trocar-plano">
          <v-btn block variant="outlined" class="pa-7 font-weight-regular text-h6" @click="trocarPlano">Trocar plano</v-btn>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mask } from 'ke-the-mask';
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
import { servicesUser } from '@/modules/cadastro/services'
 
export default { 
  name: 'FormCadastro',
  setup() {
    return { v$: useVuelidate() }
  },
  props: { plano: Object },
  directives: {
    mask
  },
  data() {
    return { 
      user: {
        name: '',
        phoneNumber: '',
        email: '',
        password: '',
        passwordConfirm: '',
        siteName: ''
      },
      agreeTerms: true,
      error: undefined,
      isLoading: false
    }
  },
  computed: {
    nameErrors() {
      const  errors = []
      const name = this.v$.user.name
      
      if (!name.$dirty) {
        return errors
      }

      !name.required.$response && errors.push('Nome é obrigatório!')
      !name.minLength.$response && errors.push(`Insira pelo menos ${name.minLength.$params.min} caracteres!`)
      
      return errors
    },
    phoneNumberErrors() {
      const  errors = []
      const phoneNumber = this.v$.user.phoneNumber
      
      if (!phoneNumber.$dirty) {
        return errors
      }

      !phoneNumber.required.$response && errors.push('Número de celular é obrigatório!')
      
      return errors
    },
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
    },
    passwordConfirmErrors() {
      const  errors = []
      const passwordConfirm = this.v$.user.passwordConfirm
      if (!passwordConfirm.$dirty) {
        return errors
      }

      this.user.password != this.user.passwordConfirm && errors.push('Senhas não correspondem!')
      
      return errors
    },
    siteNameErrors() {
      const  errors = []
      const siteName = this.v$.user.siteName
      
      if (!siteName.$dirty) {
        return errors
      }

      !siteName.required.$response && errors.push('Exatamente igual o título do seu site')
      
      return errors
    }
  },
  validations: function () {
    const validations = {
      user: {
        name: {
          required,
          minLength: minLength(3)
        },
        phoneNumber: {
          required,
        },
        email: {
          required,
          email
        },
        password: {
          required,
          minLength: minLength(8)
        },
        passwordConfirm: {
          required
        },
        siteName: {
          required
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
    trocarPlano() {
      this.$emit('trocarPlano');
    },
    async submit() {
      this.isLoading = true;

      const bodyUser =  {
        email: this.user.email,
        username: this.user.email,
        password: this.user.password,
        name:{
            firstname: this.user.name,
            lastname:'Doe'
        },
        address:{
            city:'kilcoole',
            street:'7835 new road',
            number:3,
            zipcode:'12926-3874',
            geolocation:{
                lat:'-37.3159',
                long:'81.1496'
            }
        },
        phone: this.user.phoneNumber
      }

      try {
        const response = await servicesUser.adicionar('users', bodyUser);
        this.$router.push(this.$route.query.redirect || '/dashboard');
        localStorage.setItem('AUTH_TOKEN', response.config.xsrfCookieName);
        this.isLoading = false;
      } catch(e) {
        console.log(e);
      }
    }
  },
  mounted() {
    const customVcardForm = document.querySelector('.custom-v-card-form')
    const cardForm = document.querySelector('.card-form');
    const cardPlano = document.querySelector('.card-plano');
    const customVcard = document.querySelector('.custom-v-card-plano-escolhido');
    
    cardPlano.style.height = `${cardForm.offsetHeight}px`;
    customVcard.style.height = `${customVcardForm.offsetHeight}px`;
    cardPlano.style.maxHeight = `${cardForm.offsetHeight}px`;
    customVcard.style.maxHeight = `${customVcardForm.offsetHeight}px`;
  }
}
</script>

<style>
.custom-v-btn-plano-escolhido {
  background-color: black !important;
  color: white;
  font-weight: 400;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -10px);
  z-index: 30 !important;
  cursor: default;
}

.custom-checkbox {
  position: relative;
  display: inline-block;
  cursor: pointer;
  padding-left: 30px;
  font-size: 18px;
}

.termos,
.politicas {
  text-decoration: underline;
}

.custom-checkbox input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  width: 20px;
  height: 20px;
  border: 1px solid #F30168; 
  border-radius: 5px;
}

.custom-checkbox:hover .checkmark {
  border-color: #F30168; 
  border-radius: 5px;
}

.custom-checkbox input:checked ~ .checkmark {
  background-color: #f3016a17;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.custom-checkbox input:checked ~ .checkmark:after {
  display: block;
}

.custom-checkbox .checkmark:after {
  left: 7px;
  top: 3px;
  width: 5px;
  height: 10px;
  border: solid #F30168;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.v-card.custom-v-card-plano-escolhido {
  overflow: visible !important;
}

.card-form {
  height: max-content;
}

.card-plano {
  overflow: hidden;
  position: relative;
}

.btn-trocar-plano {
  position: absolute;
  width: 80%;
  bottom: 32px;
  left: 50%;
  transform: translate(-50%, 0);
  background: white;
}

.conteudo-plano {
  position: relative;
  overflow: hidden;
  max-height: 1000px;
}

.conteudo-plano::after,
.btn-trocar-plano::before {
  content: "";
  position: absolute !important;
  width: 100% !important;
  height: 200px !important;
  left: 0 !important;
  bottom: 0;
  background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
}

@media(max-width: 1280px) {
  .order-xl-last {
    order: 0;
  }

  .order-xl-last {
    order: 1;
  }
}

</style>