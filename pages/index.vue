<template>
	<div>Good luck, Luka!</div>
	<div>
		<form @submit.prevent="onSubmit">
			<input type="email" placeholder="Email" v-model="email" />
			<input type="password" placeholder="Password" v-model="password" />
			<button type="submit">Submit</button>
		</form>
		<div>
			<p>{{ auth }}</p>
		</div>
		
	</div>
</template>

<script setup lang="ts">
	const { signIn } = useAuth();
	const isLoading = ref(false);
	const auth = ref("Not authenticated");
	const password = ref("");
	const email = ref("");

	const onSubmit = async () => {
		try {
			isLoading.value = true;

			const result = await signIn("credentials", {
				password: password.value,
				email: email.value,
				redirect: false,
			});
			if (result?.ok && !result.error) {
				console.log("Successfully LoggedIn");
				auth.value = "Authenticated";
			} else {
				console.log("Something Went Wrong");
			}
		} catch (error) {
		} finally {
			isLoading.value = false;
		}
	};
</script>
