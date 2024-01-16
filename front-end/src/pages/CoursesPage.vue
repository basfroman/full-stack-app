<template>
    <h1>Courses</h1>
    <CoursesList :courses="courses"/>
</template>

<script>
import { courses } from '../temp-data'
import CoursesList from '@/components/CoursesList.vue';

export default {
    name: "CoursesPage",
    components: {
        CoursesList,
    },
    data() {
       return {
        courses,
       } 
    }
}
</script>