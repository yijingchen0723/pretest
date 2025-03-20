<template>
  <div data-tauri-drag-region class="titlebar colbox">
    <template v-if="mode == 'mac'">
      <div class="titlebar-button-wrapper colbox">
        <div class="titlebar-button" id="titlebar-minimize" @click="minimize">
          <svg-icon name="window-minimize" color="red"></svg-icon>
        </div>
        <div class="titlebar-button" id="titlebar-maximize" @click="toggleMaximize">
          <template v-if="maximized">
            <svg-icon name="window-maximized"></svg-icon>
          </template>
          <template v-else>
            <svg-icon name="window-maximize" width="13px"></svg-icon>
          </template>
        </div>
        <div class="titlebar-button" id="titlebar-close" @click="close">
          <svg-icon name="window-close"></svg-icon>
        </div>
      </div>
    </template>
    <div class="titlebar-icon-wrapper colbox">
      <img src="@/assets/vw.png" class="titlebar-icon">
      <div class="titlebar-icon-title">
        Wallitor
      </div>
    </div>
    <template v-if="mode == 'win'">
      <div class="titlebar-button-wrapper colbox">
        <div class="titlebar-button" id="titlebar-minimize" @click="minimize">
          <div class="titlebar-button-rect">
            <svg-icon name="window-minimize" :size="button_size_default"></svg-icon>
          </div>
        </div>
        <div class="titlebar-button" id="titlebar-maximize" @click="toggleMaximize">
          <template v-if="maximized">
            <div class="titlebar-button-rect">
              <svg-icon name="window-maximized" :size="button_size_alter"></svg-icon>
            </div>
          </template>
          <template v-else>
            <div class="titlebar-button-rect">
              <svg-icon name="window-maximize" :size="button_size_alter"></svg-icon>
            </div>
          </template>
        </div>
        <div class="titlebar-button" id="titlebar-close" @click="close">
          <div class="titlebar-button-rect">
            <svg-icon name="window-close" :size="button_size_default"></svg-icon>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon.vue';
import { ref, defineProps } from 'vue'
import type { PropType } from 'vue'
import { getCurrentWebviewWindow } from '@tauri-apps/api/webviewWindow';
const appWindow = getCurrentWebviewWindow();

type Mode = "win" | "mac";

const maximized = ref(false);
const button_size_default = ref("18px");
const button_size_alter = ref("15px")
const props = defineProps({
  mode: {
    type: String as PropType<Mode>,
    default: "win"
  }
})

function minimize() {
  console.log(111)
  appWindow.minimize()
}

function toggleMaximize() {
  appWindow.toggleMaximize();
  maximized.value = !maximized.value;
}

function close() {
  appWindow.close()
}
</script>

<style>
.titlebar {
  position: relative;
  justify-content: space-between;
  height: var(--titlebar-height);
  padding: 5px;
  color: var(--text-color);
}

.titlebar-icon-wrapper {
  height: 100%;
  width: fit-content;
  align-items: center;
  margin-left: 5px;
  margin-right: 5px;
}

.titlebar-icon-title {
  font-weight: 500;
  font-size: 23px;
  margin-left: 10px;
}

.titlebar-icon {
  height: var(--titlebar-height);
}

.titlebar-button-wrapper {
  height: var(--titlebar-height);
  width: fit-content;
  place-self: center;
  place-items: center;
  overflow: hidden;
  border-radius: var(--titlebar-height);
  border: solid 1px var(--bd-color);
  backdrop-filter: blur(10px) saturate(180%);
  box-shadow: var(--shadow-edge-glow), var(--shadow);
  background-color: var(--bg-color-alpha);
}

.titlebar-button {
  height: calc(var(--titlebar-height) - 6px);
  width: calc(var(--titlebar-height) - 6px);
  padding-top: 3px;
  padding-bottom: 3px;
}

.titlebar-button-rect {
  height: 34px;
  width: 34px;
  border-radius: 100%;
  transition: .3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

#titlebar-minimize {
  padding-left: 5px;
}

#titlebar-close {
  padding-right: 5px;
}

#titlebar-minimize .titlebar-button-rect:hover,
#titlebar-maximize .titlebar-button-rect:hover {
  background-color: var(--bg-hover-fill);
}

#titlebar-close .titlebar-button-rect:hover {
  background-color: var(--bg-hover-fill-close);
}
</style>