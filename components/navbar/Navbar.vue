<template>
	<div class="'fixed w-full bg-white z-10 shadow-sm'">
        <div class="py-4 border-b-[1px]">
            <UContainer class="max-w-[2520px] mx-auto sm:px-2 px-4">
                <div class="flex flex-row items-center justify-between gap-3 md:gap-0">
                <Logo />
                <Search />
                <UserMenu />
              </div>
            </UContainer>
        </div>
    </div>
</template>

<script setup lang="ts">
    import Logo from './Logo.vue';
    import Search from './Search.vue';
    import UserMenu from './UserMenu.vue';
</script>

<style scoped></style>
