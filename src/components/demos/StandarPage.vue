<template>
    <v-container>
        <v-card-text>
            <p class="display-1 text--primary">
                Conta {{ conta }}
            </p>
            <p>Bem-vindo ao gerenciamento da sua conta</p>
        </v-card-text>
        <v-card-actions>
            <v-container>
                <v-form
                    ref="form"
                    v-model="valid"
                    lazy-validation
                >
                    <v-row>
                        <v-col
                            cols="12"
                            md="6"
                        >
                            <v-text-field
                                v-model="usuario.nome"
                                :rules="nomeRules"
                                label="Usuário"
                                required
                            ></v-text-field>
                        </v-col>

                        <v-col
                            cols="12"
                            md="6"
                        >
                            <v-text-field
                                v-model="usuario.email"
                                :rules="emailRules"
                                label="E-mail"
                                required
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col
                            cols="12"
                            md="6"
                        >
                            <v-text-field
                                v-model="novaSenha"
                                :type="showPass ? 'text' : 'password'"
                                :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                                @click:append="showPass = !showPass"
                                :rules="novaSenhaRules"
                                label="Nova Senha."
                                required
                                hint="Pelo menos 8 characters"
                                counter
                            ></v-text-field>
                        </v-col>

                        <v-col
                            cols="12"
                            md="6"
                        >
                            <v-text-field
                                v-model="confirmarNovaSenha"
                                :type="showPass2 ? 'text' : 'password'"
                                :append-icon="showPass2 ? 'mdi-eye' : 'mdi-eye-off'"
                                @click:append="showPass2 = !showPass2"
                                :rules="confirmarNovaSenhaRules"
                                label="Confirmar nova senha."
                                required
                            ></v-text-field>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col
                            cols="12"
                            md="6"
                            align="left"
                        >
                            <v-btn color="normal" @click="reset" :disabled="loading" :loading="loading">Resetar</v-btn>
                        </v-col>
                        
                        <v-col
                            cols="12"
                            md="6"
                            align="right"
                        >
                            <v-btn color="primary" @click="onSubmit" :disabled="loading" :loading="loading">Salvar</v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </v-container>
            <v-snackbar
                v-model="snackbar"
                :color="colorSnackbar"
                :timeout="timeSnackbar"
            >
                {{ message }}
                <v-btn
                    color="black"
                    text
                    @click="closeSnackbar()"
                >
                Close
                </v-btn>
            </v-snackbar>
        </v-card-actions>
    </v-container>
</template>

<script>
export default {
    data: () => ({
        valid: false,
        snackbar: false,
        showPass: false,
        showPass2: false,
        timeSnackbar: 0,
        colorSnackbar: 'red darken-1',
        usuario: {
            nome: '',
            email: '',
        },
        nomeRules: [
            v => !!v || 'Nome não foi informado',
        ],
        emailRules: [
            v => !!v || 'E-mail não foi informado',
            v => /.+@.+/.test(v) || 'E-mail inválido',
        ],
        novaSenha: '',
        novaSenhaRules: [
            v => !!v || 'Nova senha não foi informado',
            v => v.length >= 8 || 'Min 8 characters',
        ],
        confirmarNovaSenha: '',
    }),
    computed: {
        confirmarNovaSenhaRules() {
            return [ 
                v => !!v || 'Confirmar nova senha não foi informado',
                () => this.confirmarNovaSenha === this.novaSenha || 'Senha informada não é a mesma da nova senha',
            ];
        },
		conta() {
            let ct = {...this.$store.getters.conta};
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.usuario.nome = ct.nome;
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.usuario.email = ct.email;
			return ct;
		},
        loading() {
			return this.$store.getters.loading;
        },
        message() {
            let msg = this.$store.getters.message;
            if(msg.message){
                if(msg.error) {
                    this.showAlertError(msg.message)
                    this.resetStore();
                } else {
                    this.showAlertSuccess(msg.message)
                    this.resetStore();
                }
            }
			return msg.message;
        }
    },
    beforeMount() {
        this.$store.dispatch("reset");
    },
    methods: {
        validate () {
            if (this.$refs.form.validate()) {
                return true;
            }  else {
                this.showAlertError('erro?')
                return false;
            }
        },
        reset () {
            this.$refs.form.reset()
        },
        resetValidation () {
            this.$refs.form.resetValidation()
        },
        resetStore() {
            setTimeout(() => {
                this.$store.dispatch("reset");
            }, 10000)
        },
        closeSnackbar() {
            this.snackbar = false;
            this.$store.dispatch("reset");
        },
        showAlertError() {
            this.timeSnackbar = 10000;
            this.colorSnackbar = 'red lighten-1'
            this.snackbar = true;
        },
        showAlertSuccess() {
            this.timeSnackbar = 10000;
            this.colorSnackbar = 'green lighten-1'
            this.snackbar = true;
        },
        onSubmit(event) {
            event.preventDefault();
            try {
                this.$store.dispatch("callLoading");
                this.$store.dispatch("updateUsuario", this.usuario);
            } catch (error) {
                this.$store.dispatch("reset");
            }
        },
    },
  }
</script>
