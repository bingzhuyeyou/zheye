<template>
  <div class="form-item pb-3">
    <input
      v-model="inputRef.val"
      type="email"
      class="form-control"
      @blur="validateInput"
    >
    <div v-if="inputRef.error" class="form-text">{{ inputRef.message }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType } from 'vue'

const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

interface RuleProp {
  type: 'required' | 'email' | 'range';
  message: string;
}

export type RulesProp = RuleProp[]

export default defineComponent({
  props: {
    rules: {
      type: Array as PropType<RulesProp>,
      required: true
    }
  },
  setup(props) {
    const inputRef = reactive({
      val: '',
      error: false,
      message: ''
    })
    const validateInput = () => {
      const allPassed = props.rules.every((item) => {
        const val = inputRef.val
        let passed = true
        switch (item.type) {
          case 'required':
            passed = (val.trim() !== '')
            break
          case 'email':
            passed = emailReg.test(val)
            break
          default:
            break
        }
        inputRef.message = item.message
        return passed
      })
      inputRef.error = !allPassed
    }
    return {
      inputRef,
      validateInput
    }
  }
})
</script>

<style scoped>
  .form-text {
    color: red;
  }
</style>
