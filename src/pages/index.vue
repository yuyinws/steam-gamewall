<script setup lang="ts">
import type { Ref } from 'vue'
import domtoimage from 'dom-to-image'
import { saveAs } from 'file-saver'
import { $fetch } from 'ohmyfetch'

export interface Game {
  appid: number
  playtime_forever: number
  left: number
  top: number
}

export interface Setting {
  steamid: string
  count: number
  columns: number
  resolution: number
}
const games: Ref<Game[]> = ref([])
const shadowGamewallRef: any = ref(null)
const setting: Ref<Setting> = ref({
  steamid: '76561198340841543',
  count: 20,
  columns: 5,
  resolution: 1280,
})
async function getGameData() {
  try {
    const { response }: any = await $fetch(`/api/ownedGame?steamid=${setting.value.steamid}`)
    let _games: Game[] = response.games
    _games = _games.sort((a, b) => {
      return b.playtime_forever - a.playtime_forever
    })
    _games = _games.splice(0, 100)

    _games.forEach((game, i) => {
      game.left = 256 * (i % 5)
      game.top = Math.floor(i / 5) * 144
    })

    games.value = _games
  }
  catch (error) {
    // eslint-disable-next-line no-console
    console.log('🚀 ~ file: index.vue ~ line 9 ~ getGameData ~ error', error)
  }
}

function download() {
  const gameWallEl = document.getElementById('shadowGamewall') as HTMLImageElement
  domtoimage.toBlob(gameWallEl, { height: shadowGamewallRef.value?.wallHeight, width: setting.value.resolution }).then((blob) => {
    saveAs(blob, 'pageview.png')
  })
}

onMounted(() => {
  getGameData()
})
</script>

<template>
  <div>
    <config-panel :setting="setting" @download="download" @getGameData="getGameData" />
    <game-wall id="gameWall" :games="games" :setting="setting" />
    <div display-none>
      <shadow-gamewall id="shadowGamewall" ref="shadowGamewallRef" :games="games" :setting="setting" />
    </div>
  </div>
</template>
