<script setup lang="ts">
import type { Ref } from 'vue'
import _ from 'lodash'
import type { Game, Setting } from '~/pages/index.vue'

const props = defineProps({
  games: {
    type: Array as () => Game[],
    default: () => [],
  },
  setting: {
    type: Object as () => Setting,
    default: () => {},
  },
})

const localGames: Ref<Game[]> = ref([])
const imgWidth: Ref<number> = ref(0)
const imgHeight: Ref<number> = ref(0)
const wallWidth: Ref<number> = ref(0)
const wallHeight: Ref<number> = ref(0)

function updateGames() {
  const _localGames = _.cloneDeep(props.games)
  props.games.forEach((game, i) => {
    _localGames[i].left = imgWidth.value * (i % props.setting.columns)
    _localGames[i].top = Math.floor(i / props.setting.columns) * imgHeight.value
  })
  localGames.value = _localGames
}

watch(() => props.setting, (setting: Setting) => {
  switch (setting.resolution) {
    case 1920:
      wallWidth.value = 1920
      break
    case 1280:
      wallWidth.value = 1280
      break
    default:
      wallWidth.value = 1280
      break
  }
  const _imgWidth = setting.resolution / setting.columns
  const _imgHeight = (215 / 460) * _imgWidth
  imgWidth.value = _imgWidth
  imgHeight.value = _imgHeight
  wallHeight.value = _imgHeight * Math.ceil(props.setting.count / setting.columns)
  updateGames()
}, {
  immediate: true,
  deep: true,
})

watch(() => props.games, () => {
  updateGames()
}, {
  immediate: true,
  deep: true,
})

defineExpose({
  wallHeight,
})
</script>

<template>
  <div :style="{ width: `${wallWidth}px` }" relative>
    <template v-for="(game, index) in localGames" :key="game.appid">
      <div v-if="index < setting.count" absolute :style="{ left: `${game.left}px`, top: `${game.top}px` }">
        <img :style="{ width: `${imgWidth}px` }" h-auto :src="`https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appid}/header.jpg`" alt="">
      </div>
    </template>
  </div>
</template>
