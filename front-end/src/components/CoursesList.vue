<script>
export default {
    name: "CoursesList",
    props: ['courses'],
}
</script>

<template>
    <div class="grid-wrap">
        <div
            class="product-item"
            v-for="course in courses"
            :key="course.id"
        >
            <img :src="course.imageURL" />
            <h3 class="product-name">{{ course.name }}</h3>
            <p class="product-price">{{ course.price }}</p>

            <router-link :to="'/courses/' + course.id">
                <button>View Details</button>
            </router-link>
        </div>
    </div>
</template>