<template>
  <div class="container">
    <global-header :user="user"></global-header>
    <column-list :list="list" v-show="false"></column-list>

    <form>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email address</label>
        <form-item :rules="rules" />
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <input type="password" class="form-control" id="exampleInputPassword1">
      </div>
      <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1">
        <label class="form-check-label" for="exampleCheck1">Check me out</label>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import GlobalHeader, { UserProps } from './components/GlobalHeader.vue'
import ColumnList, { ColumnProps } from './components/ColumnList.vue'
import FormItem, { RulesProp } from './components/FormItem.vue'

const testData: ColumnProps[] = [
  {
    id: 1,
    avatar: 'https://cli.vuejs.org/favicon.png',
    title: '测试标题',
    description: '对 Babel、TypeScript、ESLint、PostCSS、PWA、单元测试和 End-to-end 测试提供开箱即用的支持。'
  },
  {
    id: 2,
    avatar: 'https://cli.vuejs.org/favicon.png',
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

const rules: RulesProp = [
  { type: 'required', message: '邮箱不能为空!' },
  { type: 'email', message: '邮箱格式错误!' }
]

export default defineComponent({
  name: 'App',
  components: {
    ColumnList,
    GlobalHeader,
    FormItem
  },
  data() {
    return {
      list: testData,
      user: userData
    }
  },
  setup() {
    return {
      rules
    }
  }
})
</script>

<style>
</style>
