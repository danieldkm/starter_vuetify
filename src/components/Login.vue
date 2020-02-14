<template>
    <v-app>
        <br/><br/><br/><br/>
        <v-container align-center justify-center >
            <v-layout row wrap align-center justify-center >
                <v-flex xs12 sm3>
                    <v-row align="center" justify="center">
                        <v-col>
                            <v-hover v-slot:default="{ hover }">
                                <v-card :elevation="hover ? 16 : 2" class="mx-auto">
                                    <!-- ERROR MESSAGE -->
                                    <v-layout row v-if="error">
                                        <v-flex xs12 sm10 offset-sm1>
                                            <v-alert :value="alert"  type="error"  align="center" transition="scale-transition">{{error.message}}</v-alert>
                                        </v-flex>
                                    </v-layout>

                                    <!-- Login/Signin -->
                                    <v-layout row align-center justify-center class="py-5">

                                        <v-form @submit.prevent="onSignin">

                                            <!-- <v-layout row> -->
                                            <v-flex xs12>
                                                <h1 class="text-center mb-5">Login</h1>
                                                <v-text-field name="email" label="Usuário/Email" id="email" v-model="email" type="text" required></v-text-field>
                                            </v-flex>

                                            <v-flex xs12>
                                                <v-text-field name="password" label="Password" id="password" v-model="password" type="password" required></v-text-field>
                                            </v-flex>

                                            <v-flex xs12>
                                                <div class="text-center">
                                                    <v-btn color="primary" type="submit" :disabled="loading" :loading="loading">
                                                        Logar
                                                        <v-icon right>mdi-lock-open</v-icon>
                                                    </v-btn>
                                                </div>
                                            </v-flex><br/>
                                            <v-flex xs12>
                                                <RecuperarSenha/>
                                            </v-flex>
                                        </v-form>
                                    </v-layout>
                                </v-card>
                            </v-hover>
                        </v-col>
                    </v-row>
                </v-flex>
            </v-layout>
        </v-container>
    </v-app>
</template>

<script>
import RecuperarSenha from './RecuperarSenha';
export default {
    
    data: () => ({
		email: null,
        password: null
    }),
    components: {
        RecuperarSenha
    },
    methods: {
        async onSignin() {
            try {
                
                await this.$recaptchaLoaded()
                const tokenRecaptcha = await this.$recaptcha("loginADM")
                this.$store.dispatch("callLoading");
                this.$store.dispatch("login", {
                    email: this.email,
                    password: this.password,
                    tokenRecaptcha
                });

            } catch (error) {
                this.$store.dispatch("reset");
            }
        },
        onResetPassword() {
            alert('onResetPassword')
        }
    },
    created() {
        this.$store.dispatch("reset");
        if(this.$store.getters.idToken) {
            this.$router.push({
				path: "/home"
			});
        }
    },
    computed: {
        isAuthenticated() {
			return this.$store.getters.idToken !== null;
        },
        loading() {
			return this.$store.getters.loading;
        },
        alert() {
			return this.$store.getters.alert;
        },
        error() {
			return this.$store.getters.error;
        }
    }
}
</script>