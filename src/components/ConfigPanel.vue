<script lang="ts" setup>
import type { Setting } from '~/pages/index.vue'

defineProps({
  setting: {
    type: Object as () => Setting,
    default: () => {},
  },
})

const emits = defineEmits(['download', 'getGameData'])

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
    <div card>
      <div option>
        <div text-gray-500 w-80px>
          SteamID
        </div>
        <el-input v-model="setting.steamid" placeholder="请输入steamid" />
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
        <el-button type="info" @click="emits('getGameData')">
          生成图片
        </el-button>
        <el-button type="primary" @click="emits('download')">
          下载图片
        </el-button>
      </div>
    </div>
  </div>
</template>
