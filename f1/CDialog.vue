<template>
    <div id="mask" v-if="visible_" @click.self="handleClose">
        <div ref="bg" id="bg">
            <div id="content">
                <slot name="content"></slot>
            </div>
            <div id="close" @click="handleClose">
                <el-icon :size="25">
                    <Close />
                </el-icon>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, nextTick } from 'vue'
import "@/style/cui.scss"

export default defineComponent({
    name: "CDiaLog",
    props: {
        "visible": {
            type: Boolean,
            default: false
        },
        width: String,
        height: String
    },
    data() {
        return {
            visible_: false
        }
    },
    watch: {
        visible(val, _) {
            if (val) {
                this.visible_ = true;
                nextTick(() => this.resize())
            }
            else {
                const bg = this.$refs.bg as HTMLElement;
                if (bg) bg.style.animation = "cui-dialog-disappear .3s ease-in";
                setTimeout(() => { this.visible_ = false }, 295);
            }
        }
    },
    methods: {
        handleClose() {
            this.$emit("update:visible", false)
        },
        resize() {
            const bg = this.$refs.bg as HTMLElement;
            if (bg) {
                bg.style.width = this.width || "500px";
                bg.style.height = this.height || "300px";
            }
        }
    },
    mounted() {
        if (this.visible) nextTick(() => this.resize());
    },
})
</script>

<style lang="scss" scoped>
#mask {
    z-index: 500;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(10px);
    animation: cui-dialog-blur .6s;
}

#bg {
    position: absolute;
    width: 500px;
    height: 300px;
    max-width: 80%;
    border: solid var(--bd-color) 1px;
    background-color: var(--bg-color-solid);
    border-radius: 8px;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    animation: cui-dialog-appear .6s cubic-bezier(0, 0.6, 0.2, 1.0);
}

#content {
    padding: 20px;
    height: calc(100% - 40px);
    overflow: auto;
}

#close {
    position: absolute;
    right: 0;
    top: 0;
    margin: 15px;
    cursor: pointer;
}
</style>