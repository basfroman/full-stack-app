<script>
import logo from '@/assets/logo.png';

export default {
    name: "NavBar",
    data() {
        return {
            logo,
        }
    }
}
</script>

<template>
    <div class="nav-bar">
        <router-link to="/courses" class="products-link">
            <div class="logo-wrap">
                <img :src="logo"/>
            </div>
        </router-link>
        
        <router-link to="/cart" class="cart-link">
            <button>Shopping cart</button>
        </router-link>
    </div>
</template>