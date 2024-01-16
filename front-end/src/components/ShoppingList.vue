<script>
export default {
    name: "ShoppingList",
    props: ['courses'],
}
</script>

<template>
    <div
    class="product-container"
    v-for="course in courses"
    :key="course.id"
>
    <img class="product-image" :src="course.image"/>
    <div class="details-wrap">
        <h3>{{ course.name }}</h3>
        <p>Price: {{ course.price }}</p>
    </div>
    <button class="remove-button">Remove</button>
</div>
</template>