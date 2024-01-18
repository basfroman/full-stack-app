<template>
    <div v-if="course">
        <div class="img-wrap">
            <img :src="course.imageURL"/>
        </div>
        <div class="product-details">
            <h1>{{ course.name }}</h1>
            <h3 class="price">Price: {{ course.price }}</h3>
            
            <button v-if="!courseIsInCart" @click="addToCart" class="add-to-cart">Add to my cart</button>
            <button v-if="courseIsInCart" class="grey-button">This course already in the shopping cart.</button>
        </div>
    </div>

    <div v-else>
        <PageNotFound />
    </div>
</template>

<script>
import axios from 'axios';
import PageNotFound from './PageNotFound.vue';

const userId = '01'

export default {
    name: "ProductDetailPage",
    data() {
        return {
            course: {},
            courseIsInCart: false,
        }
    },
    methods: {
        async addToCart() {
            await axios.post(`/api/users/${userId}/cart`, { 'id': this.$route.params.courseId });
            this.courseIsInCart = true;
        }
    },
    async created() {
        let response = await axios.get(`/api/courses/${this.$route.params.courseId}`);
        let data = response.data;
        this.course = data;

        response = await axios.get(`/api/users/${userId}/cart`);
        this.userCartItems = response.data.some(course => course.id === this.$route.params.courseId);

    },
    components: {
        PageNotFound,
    }
}
</script>