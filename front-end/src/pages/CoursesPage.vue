<template>
    <h1>Courses</h1>
    <CoursesList :courses="courses"/>
</template>

<script>
import CoursesList from '@/components/CoursesList.vue';
import axios from 'axios';

export default {
    name: "CoursesPage",
    components: {
        CoursesList,
    },
    data() {
       return {
        courses: [],
       } 
    },
    async created() {
        const response = await axios.get('/api/courses')
        const courses = response.data;
        this.courses = courses;
    }
}
</script>