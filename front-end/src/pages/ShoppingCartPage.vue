<script>
import { cartItems } from '../temp-data';
import ShoppingList from '@/components/ShoppingList.vue';

export default {
    name: "SoppingCartPage",
    components: {
        ShoppingList,
    },
    data() {
        return {
            cartItems,
        }
    }
}
</script>

<template>
    <h1>My Cart</h1>
    <div v-if="cartItems.length > 0">
        <ShoppingList :courses="cartItems" />
        <button class="checkout-button">Checkout</button>
    </div>
    <div v-else>
        <h1>Cart is empty</h1>
    </div>
</template>
