<script>
import { courses } from '../temp-data';
import PageNotFound from './PageNotFound.vue';

export default {
    name: "ProductDetailPage",
    data() {
        return {
            course: courses.find(course => course.id === this.$route.params.courseId),
        }
    },
    components: {
        PageNotFound,
    }
}
</script>

<template>
    <div v-if="course">
        <div class="img-wrap">
            <img :src="course.image"/>
        </div>
        <div class="product-details">
            <h1>{{ course.name }}</h1>
            <h3 class="price">Price: {{ course.price }}</h3>
            <button class="add-to-cart">Add to my cart</button>
        </div>
    </div>

    <div v-else>
        <PageNotFound />
    </div>
</template>
