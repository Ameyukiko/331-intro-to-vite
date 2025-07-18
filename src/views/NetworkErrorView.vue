<template>
    <div class="network-error">
        <h1>Uh-Oh!</h1>
        
        <h3>
            It look like you're ecperiencing some network issues, please take a breath and
            <a href="#" @click="$router.go(-1)"> click here </a>to try again.
        </h3>
    </div>
</template>