<template>
    <svg :style="{ width: size, height: size }">
        <use :href="prefix + name" :fill="color"></use>
    </svg>
</template>

<script setup lang="ts">
defineProps({
    prefix: {
        type: String,
        default: "#icon-"
    },
    name: {
        type: String,
        required: true
    },
    color: {
        type: String,
        default: "#ffffff"
    },
    size: {
        type: String,
        default: "16px"
    },
});
</script>