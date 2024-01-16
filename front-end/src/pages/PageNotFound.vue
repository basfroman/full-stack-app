<script>
import PageNotFoundImg from '@/assets/404.png';

export default {
    name: "PageNotFound",
    data() {
        return {
            PageNotFoundImg,
        }
    }
}
</script>

<template>
    <h1>404: Page Not Found</h1>
    <img :src="PageNotFoundImg" class="not-found-img"/>
</template>