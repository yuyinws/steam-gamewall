<script setup lang="ts">
import type { Ref } from 'vue'
import _ from 'lodash'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import type { Game, Setting } from '~/pages/index.vue'

const props = defineProps({
  games: {
    type: Array as () => Game[],
    default: () => [],
  },
  setting: {
    type: Object as () => Setting,
    default: () => { },
  },
})

const breakpoints = useBreakpoints(breakpointsTailwind)
const xxxl = breakpoints.xl

const localGames: Ref<Game[]> = ref([])

const imgWidth: Ref<number> = ref(0)
const imgHeight: Ref<number> = ref(0)

function updateGames() {
  let _localGames = _.cloneDeep(props.games)
  _localGames = _localGames.splice(0, props.setting.count)
  localGames.value = _localGames
}

watch(() => props.setting, (setting: Setting) => {
  imgWidth.value = 1 / setting.columns * 100
  const columns = setting.columns
  if (xxxl.value)
    imgHeight.value = 250 - columns * 20

  else
    imgHeight.value = 150 - columns * 10

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
</script>

<template>
  <div w-full flex flex-wrap>
    <div
      v-for="(game) in localGames" :key="game.appid"
      :style="{ flex: `${imgWidth}%`, height: `${imgHeight}px`, backgroundImage: `url(https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appid}/header.jpg)`, backgroundSize: 'cover', backgroundRepeat: 'round' }"
    />
  </div>
</template>
