<template>
    <div class="apply-bar-mask" v-if="visible_" @click.self="handleClose">
        <div ref="bg" class="apply-bar-bg" :class="{
            'apply-bar-left': position == 'left',
            'apply-bar-right': position == 'right'
        }">
            <div class="apply-bar-content">
                <img :src="config.img">
                {{ config.name }}
            </div>
            <div class="apply-bar-close" @click="handleClose">
                <svg-icon name="close" color="var(--text-color)"></svg-icon>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineExpose, defineEmits, defineModel, watch, ref, type PropType } from 'vue';
type Position = "left" | "right";
interface Config {
    name: string,
    img: string
}
const props = defineProps({
    position: {
        type: String as PropType<Position>,
        default: "right"
    },

})
const visible = defineModel<boolean>();
const emit = defineEmits(["submit"]);
const visible_ = ref(false);
const config = ref<Config>({
    name: "",
    img: ""
})
const bg = ref<HTMLDivElement | null>(null);
defineExpose({ open })
watch(() => visible.value, (val, _) => {
    if (val) {
        visible_.value = true;
    }
    else {
        if (bg.value) bg.value.style.animation = `apply-bar-disappear-${props.position} .3s ease-in`;
        setTimeout(() => { visible_.value = false }, 295);
    }
})

function handleClose() {
    visible.value = false;
}

function open(conFig: Config) {
    config.value = conFig;
    console.log(conFig)
    visible.value = true;
}
</script>

<style>
@keyframes apply-bar-appear-left {
    0% {
        transform: translate(-100%, -50%);
    }

    100% {
        transform: translate(0, -50%);
    }
}

@keyframes apply-bar-appear-right {
    0% {
        transform: translate(100%, -50%);
    }

    100% {
        transform: translate(0, -50%);
    }
}

@keyframes apply-bar-disappear-left {
    0% {
        opacity: 100%;
        transform: translate(0, -50%);
    }

    100% {
        opacity: 0%;
        transform: translate(-100%, -50%);
    }
}

@keyframes apply-bar-disappear-right {
    0% {
        opacity: 100%;
        transform: translate(0, -50%);
    }

    100% {
        opacity: 0%;
        transform: translate(100%, -50%);
    }
}

.apply-bar-mask {
    z-index: 500;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.apply-bar-bg {
    border: solid var(--bd-color) 1px;
    backdrop-filter: blur(30px) saturate(180%);
    box-shadow: var(--shadow-edge-glow), var(--shadow);
    background-color: var(--bg-color-alpha-darker);
    border-radius: 8px;
    transform: translate(0, -50%);
    top: calc(50% + 15px);
    position: absolute;
    width: 50%;
    height: 85%;
}

.apply-bar-content {
    padding: 20px;
    height: calc(100% - 40px);
    overflow: auto;
}

.apply-bar-close {
    position: absolute;
    right: 0;
    top: 0;
    margin: 15px;
    cursor: pointer;
}

.apply-bar-left {
    left: 10px;
    animation: apply-bar-appear-left .6s cubic-bezier(0, 0.6, 0.2, 1.0);
}

.apply-bar-right {
    right: 10px;
    animation: apply-bar-appear-right .6s cubic-bezier(0, 0.6, 0.2, 1.0);
}
</style>