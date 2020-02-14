<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on }">
            <v-btn color="info" dark v-on="on">Esqueceu a senha?</v-btn>
        </template>
        <v-form
            ref="form"
            v-model="valid"
            lazy-validation
        >
            <v-card>
                <v-card-title>
                    <span class="headline">Recuperar senha!</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field
                                v-model="email"
                                :rules="emailRules"
                                label="E-mail*"
                                required
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="reset" :disabled="loading" :loading="loading">Fechar</v-btn>
                    <v-btn color="blue darken-1" text @click="onSubmit" :disabled="loading" :loading="loading">Recuperar</v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
        </v-dialog>
        <v-snackbar
            v-model="snackbar"
            :color="colorSnackbar"
            :timeout="timeSnackbar"
        >
            {{ message }}
            <v-btn
                color="black"
                text
                @click="snackbar = false"
            >
            Close
            </v-btn>
        </v-snackbar>
    </v-row>
</template>

<script>
import Axios from '../axios-auth';
export default {
    
    data: () => ({
        loading: false,
        valid: true,
        dialog: false,
        snackbar: false,
        timeSnackbar: 0,
        colorSnackbar: 'red darken-1',
        message: '',
        email: '',
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
    }),
    methods: {
        async onSubmit(event) {
            event.preventDefault();
            try {
                this.loading = true;
                await this.$recaptchaLoaded()
                const tokenRecaptcha = await this.$recaptcha("forgotADM")
                if(this.validate()) {
                    Axios
                    .post(
                        "/users/forgot",
                        {
                            email: this.email,
                            token: tokenRecaptcha
                        }
                    ).then(response => {
                        if(response) {
                            this.showAlertSuccess(response.data.message)
                        } else {
                            this.showAlertSuccess('E-mail enviado com sucesso, por favor acesse seu e-mail para visualizar a nova senha.!')
                        }
                        this.email = '';
                        this.loading = false;
                        this.dialog = false;
                    }).catch(error => {
                        // eslint-disable-next-line no-console
                        console.error(error)
                        this.showAlertError(error.response.data.message)
                        this.loading = false;
                    });
                } else {
                    this.loading = false;
                }
            } catch (error) {
                this.$store.dispatch("reset");
                this.loading = false;
            }
        },
        showAlertError(txt) {
            this.timeSnackbar = 10000;
            this.colorSnackbar = 'red lighten-1'
            this.message = txt;
            this.snackbar = true;
        },
        showAlertSuccess(txt) {
            this.timeSnackbar = 10000;
            this.colorSnackbar = 'green lighten-1'
            this.message = txt;
            this.snackbar = true;
        },
        validate () {
            if (this.$refs.form.validate()) {
                return true;
            }  else {
                this.showAlertError('E-mail não foi informado.')
                return false;
            }
        },
        reset () {
            this.$refs.form.reset()
            this.dialog = false;
            this.resetValidation();
        },
        resetValidation () {
            this.$refs.form.resetValidation()
        },
        updateSnackbar(snackbar){
            this.snackbar=snackbar;
        }
    },
}
</script>