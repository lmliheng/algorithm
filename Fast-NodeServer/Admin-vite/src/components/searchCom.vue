<script setup>
import { onMounted, ref, nextTick, watch } from 'vue'

const isSearch = ref(false)
const searchSelect = ref(null)
const list = ref([])
const options = ref([])
const value = ref([])
const loading = ref(false)

const remoteMethod = (query) => {
  if (query) {
    loading.value = true
    setTimeout(() => {
      loading.value = false
      options.value = list.value.filter((item) => {
        return item.label.toLowerCase().includes(query.toLowerCase())
      })
    }, 200)
  } else {
    options.value = []
  }
}

const openSearch = () => {
  isSearch.value = true
}

const closeSearch = () => {
  isSearch.value = false
}

const states = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
  'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
  'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
  'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
  'Wisconsin', 'Wyoming',
]

onMounted(() => {
  list.value = states.map((item) => {
    return { value: `value:${item}`, label: `label:${item}` }
  })
})
</script>
<template>
    <transition name="search" mode="out-in">
  <div :class="{'isSearch': isSearch}" id="searchCom">
    <svg v-if="!isSearch" @click="openSearch" width="20"  t="1777611079113" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4967"><path d="M415.59889935 818.40673751c-103.69194019 0-207.38388041-39.48836529-286.31642412-118.42090898-157.86508737-157.87981634-157.86508737-414.78248979 0-572.66230613 157.85035841-157.85035841 414.76776082-157.90927428 572.64757719 0 157.86508737 157.87981634 157.86508737 414.78248979 0 572.66230613-78.93254368 78.93254368-182.63921287 118.42090898-286.33115307 118.42090898z m0-725.22496474c-82.09927197 0-164.21327292 31.25487175-226.70828746 93.74988629-125.00475803 125.00475803-125.00475803 328.44127481 0 453.44603281 125.01948701 124.9753001 328.41181686 125.03421596 453.43130386 0 125.00475803-125.00475803 125.00475803-328.44127481 0-453.44603281-62.5097435-62.49501453-144.60901547-93.74988627-226.7230164-93.74988629z" fill="#2c2c2c" p-id="4968"></path><path d="M973.48804978 1013.69813456c-10.78160515 0-21.57793927-4.10938229-29.79670383-12.34287584L658.31757585 715.95203069c-16.46698708-16.46698708-16.46698708-43.14114955 0-59.60813666s43.14114955-16.46698708 59.60813665 0l285.37377009 285.38849908c16.46698708 16.46698708 16.46698708 43.14114955 0 59.60813663a42.07329932 42.07329932 0 0 1-29.81143281 12.35760482z" fill="#2c2c2c" p-id="4969"></path></svg>
     <el-select
        v-if="isSearch"
        ref="searchSelect"
        v-model="value"
        filterable
        remote
        reserve-keyword
        placeholder="Search"
        :remote-method="remoteMethod"
        :loading="loading"
        style="width: 240px"
        @blur="closeSearch"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
   </transition>
</template>

<style>
.search-enter-active,
.search-leave-active {
  transition: opacity 0.5s ease;
}

.search-enter-from,
.search-leave-to {
  opacity: 0;
}

.isSearch {
  width: 300px;
  height: 60px;
  display: flex;
  align-items: center;
}
#searchCom {
  cursor: pointer;
  margin-right: 20px;
}
</style>
