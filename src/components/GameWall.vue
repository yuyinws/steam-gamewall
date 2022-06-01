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
    default: () => { },
  },
})

const localGames: Ref<Game[]> = ref([])

const imgWidth: Ref<number> = ref(0)
const imgHeight: Ref<number> = ref(0)

function updateGames() {
  let _localGames = _.cloneDeep(props.games)
  _localGames = _localGames.splice(0, props.setting.count)
  localGames.value = _localGames
}

watch(() => props.setting, (setting: Setting) => {
  imgWidth.value = 1 / props.setting.columns * 100
  imgHeight.value = 215 / 460 * setting.columns
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
      h-50px
      lg:h-100px
      :style="{ flex: `${imgWidth}%`, backgroundImage: `url(https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appid}/header.jpg)`, backgroundRepeat: 'round' }"
    />
  </div>
</template>
