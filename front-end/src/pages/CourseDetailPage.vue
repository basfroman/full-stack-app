<template>
    <div v-if="course">
        <div class="img-wrap">
            <img :src="course.imageURL"/>
        </div>
        <div class="product-details">
            <h1>{{ course.name }}</h1>
            <h3 class="price">Price: {{ course.price }}</h3>
            
            <button v-if="user && !courseIsInCart" @click="addToCart" class="add-to-cart">Add to my cart</button>
            <button v-if="user && courseIsInCart" class="grey-button">This course already in the shopping cart.</button>
            <button v-if="!user" class="sign-in" @click="signIn">Sign in</button>
        </div>
    </div>

    <div v-else>
        <PageNotFound />
    </div>
</template>

<script>
import axios from 'axios';
import PageNotFound from './PageNotFound.vue';
import { getAuth, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth'; 

export default {
    name: "ProductDetailPage",
    props: ['user'],
    data() {
        return {
            course: {},
            courseIsInCart: false,
        }
    },
    watch: {
        async user(newUserValue) {
            if (newUserValue) {
                const response = await axios.get(`/api/users/${newUserValue.uid}/cart`);
                this.userCartItems = response.data;
            }
        }
    },
    methods: {
        async addToCart() {
            await axios.post(`/api/users/${this.user.uid}/cart`, { 'id': this.$route.params.courseId });
            this.courseIsInCart = true;
        },
        async signIn(){
            const email = prompt('Please enter your email:');
            const auth = getAuth();
            const actionCodeSettings = {
                url: `http://10.0.0.115:8080/courses/${this.$route.params.courseId}`,
                handleCodeInApp: true,
            };
            await sendSignInLinkToEmail(auth, email, actionCodeSettings);
            alert('A loging link was send.');

            window.localStorage.setItem('emailForSighIn', email);
        }
    },
    async created() {
        const auth = getAuth();
        if (isSignInWithEmailLink(auth, window.location.href)) {
            const email = window.localStorage.getItem('emailForSighIn');
            signInWithEmailLink(auth, email, window.location.href);
            alert('User sign in');
            window.localStorage.removeItem('emailForSignIn');
        }

        let response = await axios.get(`/api/courses/${this.$route.params.courseId}`);
        let data = response.data;
        this.course = data;

        if (this.user) {
            response = await axios.get(`/api/users/${this.user.uid}/cart`);
            this.userCartItems = response.data.some(course => course.id === this.$route.params.courseId);
        }
    },
    components: {
        PageNotFound,
    }
}
</script>