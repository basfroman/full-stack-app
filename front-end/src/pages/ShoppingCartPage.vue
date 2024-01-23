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

export default {
    name: "SoppingCartPage",
    props: ['user'],
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
            const response = await axios.delete(`/api/users/${this.user.uid}/cart/${courseId}`);
            const updatedCart = response.data;
            this.cartItems = updatedCart;

        },
    },
    async created() {
        if (this.user) {
            const response = await axios.get(`/api/users/${this.user.uid}/cart`)
            const cartItems = response.data;
            this.cartItems = cartItems;
        }  
    }
}
</script>