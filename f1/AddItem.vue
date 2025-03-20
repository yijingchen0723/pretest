<template>
    <div ref="bg" class="item-add-bg" :class="{
        'item-add-show': visible,
    }">
        <div class="item-add-content">
            <header class="colbox item-add-header">
                <div class="colbox item-add-header-icon item-add-header-item" @click="visible = !visible">
                    <template v-if="visible">
                        <SvgIcon name="keyboard-arrow-down" size="20px"></SvgIcon>
                    </template>
                    <template v-else>
                        <SvgIcon name="add" size="20px"></SvgIcon>
                    </template>
                </div>
                <div class="item-add-header-item item-add-header-title">
                    <div>添加</div>
                </div>
            </header>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineExpose, defineModel, ref } from 'vue';
import SvgIcon from './SvgIcon.vue';
const visible = defineModel<boolean>();
const bg = ref<HTMLDivElement | null>(null);
defineExpose({ open })
</script>

<style>
.item-add-bg {
    border: solid var(--bd-color) 1px;
    backdrop-filter: blur(30px) saturate(180%);
    box-shadow: var(--shadow-edge-glow), var(--shadow);
    background-color: var(--bg-color-alpha-darker);
    border-radius: 8px;
    left: 50%;
    top: calc(100% - 60px);
    transform: translate(-50%, 0);
    position: absolute;
    width: 85%;
    height: calc(100% - 60px);
    transition: .8s cubic-bezier(0.9, 0, 0, 1.1);
}

.item-add-show {
    top: 60px;
}

.item-add-content {
    padding: 10px;
    height: calc(100% - 20px);
    overflow: auto;
}

.item-add-header-icon {
    width: 40px;
    height: 40px;
    border-radius: 5px;
    background-color: #3b93ff;
    transition: .3s;
    align-items: center;
    justify-content: center;
}

.item-add-header-icon:hover {
    background-color: #1e5daa;
    cursor: pointer;
}

.item-add-header-item {
    display: flex;
    align-items: center;
    color: var(--text-color);
}

.item-add-header-title {
    font-size: 20px;
    font-weight: 500;
    margin-left: 10px;
}
</style>