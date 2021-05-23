<template>
  <div class="container">
    <global-header :user="user"></global-header>
    <column-list :list="list"></column-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import GlobalHeader, { UserProps } from './components/GlobalHeader.vue'
import ColumnList, { ColumnProps } from './components/ColumnList.vue'

const testData: ColumnProps[] = [
  {
    id: 1,
    avatar: 'https://cli.vuejs.org/favicon.png',
    title: '测试标题',
    description: '对 Babel、TypeScript、ESLint、PostCSS、PWA、单元测试和 End-to-end 测试提供开箱即用的支持。'
  },
  {
    id: 2,
    // avatar: 'https://cli.vuejs.org/favicon.png',
    title: '测试标题',
    description: '对 Babel、TypeScript、ESLint、PostCSS、PWA、单元测试和 End-to-end 测试提供开箱即用的支持。'
  },
  {
    id: 3,
    avatar: 'https://cli.vuejs.org/favicon.png',
    title: '测试标题',
    description: '对 Babel、TypeScript、ESLint、PostCSS、PWA、单元测试和 End-to-end 测试提供开箱即用的支持。'
  },
  {
    id: 4,
    avatar: 'https://cli.vuejs.org/favicon.png',
    title: '测试标题',
    description: '对 Babel、TypeScript、ESLint、PostCSS、PWA、单元测试和 End-to-end 测试提供开箱即用的支持。'
  }
]
const userData: UserProps = {
  isLogin: true,
  name: '小谢'
}

export default defineComponent({
  name: 'App',
  components: {
    ColumnList,
    GlobalHeader
  },
  data () {
    return {
      list: testData,
      user: userData
    }
  }
})
</script>

<style>
</style>
