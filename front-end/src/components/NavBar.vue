<template>
    <div class="nav-bar">
        <router-link to="/courses" class="products-link">
            <div class="logo-wrap">
                <img :src="logo"/>
            </div>
        </router-link>
        
        <div  class="nav-buttons-wrap">
            <router-link to="/cart">
                <button>Shopping cart</button>
            </router-link>
            <button v-if="user" @click="signOut">Sign Out</button>
        </div>
    </div>
</template>

<script>
import { getAuth, signOut } from 'firebase/auth';
import logo from '@/assets/logo.png';

export default {
    name: "NavBar",
    data() {
        return {
            logo,
        }
    },
    props: ['user'],
    methods: {
        signOut() {
            const auth = getAuth();
            signOut(auth);
            location.href('/');
        }
    }
}
</script>
