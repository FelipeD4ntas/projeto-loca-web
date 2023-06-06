<template>
  <v-row align-content="center" justify="center" class="mt-3">
    <v-col :class="{ 'custom-order': plano.maisUsado }" v-for="(plano, index) in planos" :key="index" xs="12" sm="12" md="12" lg="4" xl="4">
      <v-card class="text-center custom-v-card">
        <v-btn
         variant="flat"
         rounded="lg"
         v-if="plano.maisUsado"
         class="custom-v-btn-mais-usado">
          Mais usado
        </v-btn>

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

        <v-card-text class="mx-9">
          <v-btn block variant="text" class="bg-primary pa-7 font-weight-regular text-uppercase text-body-1 custom-v-btn-plano" @click="escolherPlano(index)">
            Escolher esse plano
          </v-btn>
        </v-card-text>

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

      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'HospedagemComponent',
  data() {
    return {
      planos: [
        {
          hospedagem: 1,
          maisUsado: false,
          valor: 'Grátis',
          detalheValor: 'você não paga nada para usar',
          taxa: 'sem taxa de setup',
          ideal: 'para quem está começando.',
          paisServidor: 'Estados Unidos.',
          beneficios: [
            'Servidores em nossos data center americanos;',
            'ASP, ASP.NET 2.0/3.0/3.5/ e 4.9/4.5/4.5.1/4.5.2(medium trust) ou PHP 5.3, 5.4, 5.5, 5.6 e 7.0;',
            '1 usuário de FTP para upload ou download;',
            '1 conta de e-mails profissionais;',
            '1 subdominio gratuito;'
          ],
          aplicativosDisponiveis: [
            'Wordpress;',
            'Drupal;',
            'entre outros...'
          ],
          voceAindaTem: [
            'Webmail RoundCube;',
            'AntiSpam;',
            'Painel de gerenciamento de DNS;',
            'Painel de controle web;',
            'Configurações de PHP personalizáveis;',
            'Certificado SSL Grátis;',
            'Transferência ilimitada.'
          ]
        },
        {
          hospedagem: 2,
          maisUsado: true,
          valor: '499',
          detalheValor: 'cobrado mensalmente',
          taxa: 'sem taxa de setup',
          ideal: 'para site com mais de 30k de visitas.',
          paisServidor: 'Brasil.',
          beneficios: [
            'Servidores em nossos data center de São Paulo;',
            'ASP, ASP.NET 2.0/3.0/3.5/ e 4.9/4.5/4.5.1/4.5.2(medium trust) ou PHP 5.3, 5.4, 5.5, 5.6 e 7.0;',
            '10 usuários de FTP para upload ou download;',
            '30 contas de e-mails profissionais;',
            '10 subdominios gratuitos;'
          ],
          migracao: 'Migramos todos seus sites para nossos servidores;',
          aplicativosDisponiveis: [
            'Wordpress;',
            'Drupal;',
            'entre outros...'
          ],
          voceAindaTem: [
            'Webmail RoundCube;',
            'AntiSpam;',
            'Painel de gerenciamento de DNS;',
            'Painel de controle web;',
            'Configurações de PHP personalizáveis;',
            'Certificado SSL Grátis;',
            'Transferência ilimitada.'
          ]
        },
        {
          hospedagem: 3,
          maisUsado: false,
          valor: '999',
          detalheValor: 'cobrado mensalmente',
          taxa: 'sem taxa de setup',
          ideal: 'para site com mais de 60k de visitas.',
          paisServidor: 'Brasil.',
          beneficios: [
            'Servidores em nossos data center de São Paulo;',
            'ASP, ASP.NET 2.0/3.0/3.5/ e 4.9/4.5/4.5.1/4.5.2(medium trust) ou PHP 5.3, 5.4, 5.5, 5.6 e 7.0;',
            'Ilimitado usuários de FTP para upload ou download;',
            'Ilimitado contas de e-mails profissionais;',
            '50 subdominios gratuitos;'
          ],
          migracao: 'Migramos todos seus sites para nossos servidores;',
          aplicativosDisponiveis: [
            'Wordpress;',
            'Drupal;',
            'entre outros...'
          ],
          voceAindaTem: [
            'Webmail RoundCube;',
            'AntiSpam;',
            'Painel de gerenciamento de DNS;',
            'Painel de controle web;',
            'Configurações de PHP personalizáveis;',
            'Certificado SSL Grátis;',
            'Transferência ilimitada.'
          ]
        }
      ],
      
    }
  },
  methods: {
    escolherPlano(index) {
      this.$emit('escolherPlano', { planoEscolhido: this.planos[index] })
    }
  }
}
</script>

<style>
.custom-title {
  color: #646465;
  font-size: 28px;
}

.custom-valor {
  color: #F30168;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
}

.custom-span-valor {
  font-weight: normal;
  font-size: 20px;
}

.custom-ideal {
  padding: 0 25px;
}

.custom-text-h6 {
  color: #646465 !important;
  font-weight: 400 !important;
}

.text-underline {
  text-decoration: underline;
  text-decoration-thickness: 1px;
}

.custom-list-item {
  display: flex;
  margin-bottom: 10px;
}

.custom-list-item .v-icon.custom-icon {
  margin-right: 8px;
}

.v-card.custom-v-card {
  overflow: visible !important;
}

.custom-v-btn-mais-usado {
  background-color: #10C203 !important;
  color: white;
  font-weight: 400;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -10px);
  z-index: 30 !important;
  cursor: default;
}

@media(max-width: 590px) {
  .custom-v-btn-plano {
    font-size: 13px !important;
  }
}

@media(max-width: 1280px) {
  .custom-order {
    order: -1;
  }
}
</style>