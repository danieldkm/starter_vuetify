<template>
	<v-app>
		<template v-if="isAuthenticated">
			<v-navigation-drawer
				v-model="drawer"
				app
				clipped
			>
				<v-list dense>
					<v-list-item link  @click="menuHome">
						<v-list-item-action>
							<v-icon>mdi-view-dashboard</v-icon>
						</v-list-item-action>
						<v-list-item-content>
							<v-list-item-title>Home</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
					<v-list-item link @click="menuConfiguracao">
						<v-list-item-action>
							<v-icon>mdi-settings</v-icon>
						</v-list-item-action>
						<v-list-item-content>
							<v-list-item-title>Configuração</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
				</v-list>
			</v-navigation-drawer>

			<v-app-bar
					app
					clipped-left
			>
				<v-app-bar-nav-icon @click.stop="drawer = !drawer" />
				<v-toolbar-title>Kid's Garden admin</v-toolbar-title>
				<v-spacer></v-spacer>
				<!-- <v-avatar color="indigo">
					<v-icon dark>mdi-account-circle</v-icon>
				</v-avatar> -->
				<v-btn icon v-on:click="changeColor">
					<v-icon>mdi-invert-colors</v-icon>
				</v-btn>
				<v-menu offset-y>
					<template v-slot:activator="{ on }">
						<v-btn icon v-on="on" color="primary">
							<!-- <v-icon>mdi-dots-vertical</v-icon> -->
							<v-icon dark>mdi-account-circle</v-icon>
						</v-btn>
					</template>
					<v-list>
						<v-list-item
							v-for="(item, index) in items"
							:key="index"
							@click="menuUserActions(item)"
						>
						<v-list-item-title>{{ item.title }}</v-list-item-title>
						</v-list-item>
					</v-list>
				</v-menu>
			</v-app-bar>

			<v-content>
				<v-container>
					<v-row align="center" justify="center">
						<v-col>
							<v-hover v-slot:default="{ hover }">
								<v-card :elevation="hover ? 16 : 2" class="mx-auto">
									<router-view></router-view>
								</v-card>
							</v-hover>
						</v-col>
					</v-row>
				</v-container>
			</v-content>
		</template>
		<template v-if="!isAuthenticated">
			<!-- 認証されていなかったら下記処理をする -->
			<router-view/>
			<!-- <router-link to="/signin" class="header-item">oxi</router-link> -->
		</template>
		<v-footer app>
			<span>&copy; {{new Date().getFullYear()}} Kid's Garden</span>
		</v-footer>
	</v-app>
</template>



<script>
export default {
	props: {
		source: String,
	},
	computed: {
		isAuthenticated() {
			return this.$store.getters.idToken !== null;
		}
	},
	data: () => ({
		drawer: null,
		isDark: false,
		elevation: 4,
		items: [
			{ title: 'Conta' },
			{ title: 'Click Me' },
			{ title: 'Click Me' },
			{ title: 'Sair' },
		],
	}),
	
	methods: {
		changeColor() {
			this.isDark = this.isDark?false:true;
			this.$vuetify.theme.dark = this.isDark;
		},
		menuUserActions(item) {
			if(item.title === 'Sair') {
				this.$store.dispatch("logout");
			} else if(item.title === 'Conta') {
				this.menuConta();
			}
		},
		menuHome() {
			this.$router.push({
				path: "/home"
			});
		},
		menuConfiguracao() {
			this.$router.push({
				path: "/hello"
			});
		},
		menuConta() {
			this.$router.push({
				path: "/conta"
			});
		},
	},

	created () {
		this.$vuetify.theme.dark = this.isDark
	},
}
</script>
