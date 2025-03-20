<template>
    <div class="item-card">
        <div class="item-card-main">
            <img :src="config.img" />
        </div>
        <div class="item-card-title">
            {{ config.name }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import type { PropType } from 'vue'

interface Config {
    name: string,
    img: string
}

const props = defineProps({
    config: {
        type: Object as PropType<Config>,
        required: true
    }
})
</script>

<style>
:root {
    --item-card-size: 200px;
    --item-card-margin: 20px;
}

.item-card {
    text-align: center;
    width: var(--item-card-size);
    height: var(--item-card-size);
    margin-right: var(--item-card-margin);
    margin-bottom: var(--item-card-margin);
    position: relative;
    overflow: hidden;
    transition: .3s;
    border-radius: 10px;
    box-shadow: 0 0 1px 6px transparent;
}

.item-card-main {
    width: 100%;
    height: 100%;
    z-index: 0;
}

.item-card:hover {
    box-shadow: var(--shadow-edge-glow), var(--shadow);
    cursor: pointer;
    transform: scale(1.03);
    box-shadow: 0 0 2px 5px rgba(177, 177, 177, 0.151);
}

.item-card:active {
    transform: scale(0.95);
}

.item-card:hover .item-card-main {
    box-shadow: inset 0px -100px 50px -50px rgba(0, 0, 0, 0.7);
}

.item-card:hover .item-card-title {
    bottom: 0;
}

.item-card-main img {
    width: 100%;
    height: 100%;
}

.item-card-title {
    position: absolute;
    bottom: -40px;
    right: 5px;
    transition: .3s;
    font-size: 30px;
    font-weight: 400;
    color: var(--text-color);
}
</style>