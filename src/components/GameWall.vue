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

const emits = defineEmits(['deleteGame'])

const localGames: Ref<Game[]> = ref([])

const imgWidth: Ref<number> = ref(0)

function updateGames() {
  let _localGames = _.cloneDeep(props.games)
  _localGames = _localGames.splice(0, props.setting.count)
  localGames.value = _localGames
}

watch(() => props.setting, (setting: Setting) => {
  imgWidth.value = 1 / setting.columns * 100
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
      v-for="(game, index) in localGames" :key="game.appid" :style="{ flex: `${imgWidth}%` }"
      @dblclick="emits('deleteGame', index)"
    >
      <img
        object-contain w-full h-auto
        :src="`https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appid}/header.jpg`" alt=""
      >
    </div>
  </div>
</template>
