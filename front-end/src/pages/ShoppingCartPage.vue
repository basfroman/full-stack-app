<template>
    <h1>My Cart</h1>
    <div v-if="cartItems.length > 0">
        <ShoppingList @remove-course-from-cart="removeCourseFromCart($event)" :courses="cartItems" />
        <button class="checkout-button">Checkout</button>
    </div>
    <div v-else>
        <h1>Cart is empty</h1>
    </div>
</template>

<script>
import axios from 'axios';
import ShoppingList from '@/components/ShoppingList.vue';

const userId = '01';

export default {
    name: "SoppingCartPage",
    components: {
        ShoppingList,
    },
    data() {
        return {
            cartItems: [],
        }
    },
    methods: {
        async removeCourseFromCart(courseId) {
            const response = await axios.delete(`/api/users/${userId}/cart/${courseId}`);
            const updatedCart = response.data;
            this.cartItems = updatedCart;

        },
    },
    async created() {
        const response = await axios.get(`/api/users/${userId}/cart`)
        const cartItems = response.data;
        this.cartItems = cartItems;
    }
}
</script>