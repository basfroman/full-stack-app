<template>
    <div
    class="product-container"
    v-for="course in courses"
    :key="course.id"
>
    <img class="product-image" :src="course.imageURL"/>
    <div class="details-wrap">
        <h3>{{ course.name }}</h3>
        <p>Price: {{ course.price }}</p>
    </div>
    <button @click="$emit('remove-course-from-cart', course.id)" class="remove-button">Remove</button>
</div>
</template>

<script>
export default {
    name: "ShoppingList",
    props: ['courses'],
}
</script>
