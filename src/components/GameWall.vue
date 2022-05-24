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

const gameWallRef = ref(null)

function updateGames() {
  const _localGames = _.cloneDeep(props.games)
  props.games.forEach((game, i) => {
    _localGames[i].left = imgWidth.value * (i % props.setting.columns)
    _localGames[i].top = Math.floor(i / props.setting.columns) * imgHeight.value
  })
  localGames.value = _localGames
}

watch(() => props.setting, (setting: Setting) => {
  const _imgWidth = 960 / setting.columns
  const _imgHeight = (215 / 460) * _imgWidth
  imgWidth.value = _imgWidth
  imgHeight.value = _imgHeight
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
  <div ref="gameWallRef" w-full relative left-5>
    <template v-for="(game, index) in localGames" :key="game.appid">
      <div v-if="index < setting.count" absolute :style="{ left: `${game.left}px`, top: `${game.top}px`, width: `${imgWidth}px` }">
        <!-- <img :style="{ width: `${imgWidth}px` }" h-auto :src="`https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appid}/header.jpg`" alt=""> -->
        <img :style="{ width: `${imgWidth}px` }" h-auto src="https://sdfsdf.dev/460x215.png,blue,yellow" alt="">
      </div>
    </template>
  </div>
</template>
