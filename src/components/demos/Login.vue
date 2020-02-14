<template>
    <v-app>
        <v-container align-center justify-center>
            <v-layout row wrap align-center justify-center>
                <v-flex xs12 sm4>
                    <v-row align="center" justify="center">
                        <v-col>
                            <v-hover v-slot:default="{ hover }">
                                <v-card :elevation="hover ? 16 : 2" class="mx-auto">
                                    <!-- ERROR MESSAGE -->
                                    <v-layout row v-if="error">
                                        <v-flex xs12 sm10 offset-sm1>
                                            <v-alert :value="onDismissed"  type="error" :text="error.message" align="center" transition="scale-transition">{{error.message}}</v-alert>
                                        </v-flex>
                                    </v-layout>

                                    <!-- Login/Signin -->
                                    <v-layout row align-center justify-center class="py-5">

                                        <v-form @submit.prevent="onSignin">

                                            <!-- <v-layout row> -->
                                            <v-flex xs12>
                                                <h1 class="text-center mb-5">Login {{isAuthenticated}}</h1>
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
                                                <div class="text-center">
                                                    <v-btn color="info" :disabled="loading" :loading="loading" @click.prevent="onResetPassword">Esqueci a senha
                                                        <v-icon right>mdi-email</v-icon>
                                                    </v-btn>
                                                </div>
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
export default {
    
    data: () => ({
		email: null,
		password: null,
        error: {},
        loading: false,
        onDismissed: false
	}),
    methods: {
        onSignin() {
            this.loading = true;
            this.$store.dispatch("login", {
                email: this.email,
                password: this.password
            });
        },
        onResetPassword() {
            alert('onResetPassword')
        }
    },
    computed: {
        isAuthenticated() {
            // eslint-disable-next-line no-console
            console.log('this.$store.getters.isAuthenticated',this.$store.getters.isAuthenticated)
            if(!this.$store.getters.isAuthenticated && this.loading) {
                // eslint-disable-next-line vue/no-side-effects-in-computed-properties
                this.error.message = "usuário/senha inválido!"
                // eslint-disable-next-line vue/no-side-effects-in-computed-properties
                this.onDismissed = true;
                // eslint-disable-next-line vue/no-side-effects-in-computed-properties
                this.loading = false;
            }
            return this.$store.getters.isAuthenticated;
        }
    }
}
</script>