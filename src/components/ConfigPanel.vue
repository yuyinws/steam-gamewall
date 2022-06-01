<script lang="ts" setup>
import type { Setting } from '~/pages/index.vue'

defineProps({
  setting: {
    type: Object as () => Setting,
    default: () => {},
  },
  saveBtnLoading: {
    type: Boolean as () => boolean,
    default: false,
  },
  dataBtnLoading: {
    type: Boolean as () => boolean,
    default: false,
  },
})

const emits = defineEmits(['saveImg', 'getGameData'])

const options = [
  {
    value: 1280,
    label: '1280px',
  },
  {
    value: 1920,
    label: '1920px',
  },
  {
    value: 2560,
    label: '2560px',
  },
]
</script>

<template>
  <div class="w-full mb-5">
    <div card mb-3>
      <div font-bold text-center>
        Steam 游戏墙图片生成器
      </div>
      <div text-14px flex justify-between>
        <div>
          <div>1.输入自己的SteamID</div>
          <div>2.点击获取图片按钮</div>
          <div>3.调整图片数量、列数、宽度等参数</div>
          <div>4.点击保存图片</div>
        </div>
        <div>
          <a color-blue href="https://keylol.com/t38759-1-1">如何获取SteamID？</a>
        </div>
      </div>
    </div>
    <div card>
      <div option>
        <div text-gray-500 w-80px>
          SteamID
        </div>
        <el-input v-model="setting.steamid" clearable placeholder="请输入steamid，示例:76561198340841543" />
      </div>
      <div option>
        <div text-gray-500 w-100px>
          数量
        </div>
        <el-slider v-model="setting.count" :step="setting.columns" :min="4 * setting.columns" />
      </div>

      <div option>
        <div text-gray-500 w-100px>
          列数
        </div>
        <el-slider v-model="setting.columns" :min="5" :max="10" />
      </div>

      <div option>
        <div text-gray-500 w-60px>
          宽度
        </div>
        <el-select v-model="setting.resolution" placeholder="Select">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div w-full flex justify-center>
        <el-button type="info" :loading="dataBtnLoading" @click="emits('getGameData')">
          获取图片
        </el-button>
        <el-button type="primary" :loading="saveBtnLoading" @click="emits('saveImg')">
          保存图片
        </el-button>
      </div>
      <div w-full flex justify-center>
        <Footer />
      </div>
    </div>
  </div>
</template>
