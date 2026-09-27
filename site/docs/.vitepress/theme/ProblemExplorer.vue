<script setup lang="ts">
/**
 * 首页的题解检索器。
 *
 * 数据来自构建时生成的 `problems.json`（不含代码），全部筛选在浏览器里完成：
 * 关键词匹配题号/标题/标签/路径，再按语言、标签、来源、难度过滤。
 */
import { computed, onMounted, ref } from 'vue'

interface Solution {
  lang: string
  langLabel: string
  variant: string | null
  time: string | null
  space: string | null
}

interface Problem {
  id: number | null
  slug: string
  title: string
  displayTitle: string
  source: string
  sourceLabel: string
  difficulty: string | null
  tags: string[]
  author: string | null
  updated: string | null
  languages: string[]
  langLabels: string[]
  solutions: Solution[]
}

interface IndexData {
  generatedAt: string
  repo: string
  stats: { problems: number; solutions: number; missingTags: number; missingComplexity: number }
  tagGroups: Record<string, string[]>
  problems: Problem[]
}

const BASE = import.meta.env.BASE_URL
const DIFF_LABEL: Record<string, string> = { easy: '简单', medium: '中等', hard: '困难' }
const PAGE_SIZE = 60

const data = ref<IndexData | null>(null)
const error = ref<string | null>(null)

const keyword = ref('')
const activeLangs = ref<string[]>([])
const activeTags = ref<string[]>([])
const activeSources = ref<string[]>([])
const activeDiffs = ref<string[]>([])
const sortBy = ref<'id' | 'updated' | 'title'>('id')
const shown = ref(PAGE_SIZE)

onMounted(async () => {
  try {
    const response = await fetch(`${BASE}problems.json`)
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    data.value = (await response.json()) as IndexData
  } catch (reason) {
    error.value = reason instanceof Error ? reason.message : String(reason)
  }
})

function countBy(values: (problem: Problem) => string[]): Array<[string, number]> {
  const counts = new Map<string, number>()
  for (const problem of data.value?.problems ?? []) {
    for (const value of values(problem)) counts.set(value, (counts.get(value) ?? 0) + 1)
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
}

const langOptions = computed(() => countBy((problem) => problem.langLabels))
const sourceOptions = computed(() => countBy((problem) => [problem.sourceLabel]))
const diffOptions = computed(() =>
  countBy((problem) => [problem.difficulty ?? 'none']).filter(([key]) => key !== 'none'),
)

/** 词表里实际出现过的标签，按分组展示。 */
const tagOptions = computed(() => {
  const counts = new Map(countBy((problem) => problem.tags))
  return Object.entries(data.value?.tagGroups ?? {})
    .map(([group, tags]) => ({
      group,
      tags: tags.filter((tag) => counts.has(tag)).map((tag) => [tag, counts.get(tag) ?? 0] as [string, number]),
    }))
    .filter((group) => group.tags.length > 0)
})

const filtered = computed(() => {
  const needles = keyword.value.trim().toLowerCase().split(/\s+/).filter(Boolean)

  const result = (data.value?.problems ?? []).filter((problem) => {
    if (activeLangs.value.length > 0 && !activeLangs.value.some((lang) => problem.langLabels.includes(lang))) {
      return false
    }
    if (activeTags.value.length > 0 && !activeTags.value.every((tag) => problem.tags.includes(tag))) {
      return false
    }
    if (activeSources.value.length > 0 && !activeSources.value.includes(problem.sourceLabel)) {
      return false
    }
    if (activeDiffs.value.length > 0 && !activeDiffs.value.includes(problem.difficulty ?? '')) {
      return false
    }
    if (needles.length > 0) {
      const haystack = [
        String(problem.id ?? ''),
        problem.title,
        problem.displayTitle,
        problem.tags.join(' '),
        problem.langLabels.join(' '),
        problem.sourceLabel,
        problem.solutions.map((solution) => `${solution.path} ${solution.time ?? ''} ${solution.space ?? ''}`).join(' '),
      ]
        .join(' ')
        .toLowerCase()
      if (!needles.every((needle) => haystack.includes(needle))) return false
    }
    return true
  })

  return result.sort((a, b) => {
    if (sortBy.value === 'updated') return (b.updated ?? '').localeCompare(a.updated ?? '')
    if (sortBy.value === 'title') return a.title.localeCompare(b.title)
    return (
      (a.id ?? Number.MAX_SAFE_INTEGER) - (b.id ?? Number.MAX_SAFE_INTEGER) ||
      a.title.localeCompare(b.title)
    )
  })
})

const visible = computed(() => filtered.value.slice(0, shown.value))

function toggle(list: typeof activeLangs, value: string): void {
  const index = list.value.indexOf(value)
  if (index >= 0) list.value.splice(index, 1)
  else list.value.push(value)
  shown.value = PAGE_SIZE
}

function reset(): void {
  keyword.value = ''
  activeLangs.value = []
  activeTags.value = []
  activeSources.value = []
  activeDiffs.value = []
  shown.value = PAGE_SIZE
}

const hasFilter = computed(
  () =>
    Boolean(keyword.value.trim()) ||
    activeLangs.value.length + activeTags.value.length + activeSources.value.length + activeDiffs.value.length >
      0,
)

function problemUrl(slug: string): string {
  return `${BASE}problems/${slug}.html`
}

function complexity(solution: Solution): string {
  const parts = []
  if (solution.time) parts.push(solution.time)
  if (solution.space) parts.push(solution.space)
  return parts.join(' / ')
}
</script>

<template>
  <div class="explorer">
    <p v-if="error" class="state">
      题解数据加载失败（{{ error }}）。请先运行 <code>npm run gen</code> 生成数据，或直接看
      <a :href="`${BASE}problems/index.html`">纯文本索引</a>。
    </p>

    <p v-else-if="!data" class="state">正在加载题解…</p>

    <template v-else>
      <div class="toolbar">
        <input
          v-model="keyword"
          class="search"
          type="search"
          placeholder="搜题号、标题、标签、文件名，空格分隔多个关键词"
          @input="shown = PAGE_SIZE"
        />
        <select v-model="sortBy" class="sort">
          <option value="id">按题号</option>
          <option value="updated">按最近更新</option>
          <option value="title">按标题</option>
        </select>
        <button v-if="hasFilter" class="reset" type="button" @click="reset">清除条件</button>
      </div>

      <div class="filters">
        <div class="row">
          <span class="label">语言</span>
          <button
            v-for="[label, count] in langOptions"
            :key="label"
            type="button"
            class="chip"
            :class="{ on: activeLangs.includes(label) }"
            @click="toggle(activeLangs, label)"
          >
            {{ label }} <em>{{ count }}</em>
          </button>
        </div>

        <div class="row">
          <span class="label">来源</span>
          <button
            v-for="[label, count] in sourceOptions"
            :key="label"
            type="button"
            class="chip"
            :class="{ on: activeSources.includes(label) }"
            @click="toggle(activeSources, label)"
          >
            {{ label }} <em>{{ count }}</em>
          </button>
        </div>

        <div class="row">
          <span class="label">难度</span>
          <button
            v-for="[key, count] in diffOptions"
            :key="key"
            type="button"
            class="chip"
            :class="{ on: activeDiffs.includes(key) }"
            @click="toggle(activeDiffs, key)"
          >
            {{ DIFF_LABEL[key] ?? key }} <em>{{ count }}</em>
          </button>
        </div>

        <div v-for="group in tagOptions" :key="group.group" class="row">
          <span class="label">{{ group.group }}</span>
          <button
            v-for="[tag, count] in group.tags"
            :key="tag"
            type="button"
            class="chip"
            :class="{ on: activeTags.includes(tag) }"
            @click="toggle(activeTags, tag)"
          >
            {{ tag }} <em>{{ count }}</em>
          </button>
        </div>
      </div>

      <p class="summary">
        共 {{ data.stats.problems }} 题 / {{ data.stats.solutions }} 份解法，当前筛出
        <strong>{{ filtered.length }}</strong> 题
        <span class="muted">（缺标签 {{ data.stats.missingTags }} 题、缺复杂度 {{ data.stats.missingComplexity }} 题）</span>
      </p>

      <ul v-if="visible.length > 0" class="list">
        <li v-for="problem in visible" :key="problem.slug" class="item">
          <a class="head" :href="problemUrl(problem.slug)">
            <span class="id">{{ problem.id ?? '—' }}</span>
            <span class="title">{{ problem.title }}</span>
            <span v-if="problem.difficulty" class="diff" :data-level="problem.difficulty">
              {{ DIFF_LABEL[problem.difficulty] ?? problem.difficulty }}
            </span>
          </a>
          <div class="meta">
            <span v-for="lang in problem.langLabels" :key="lang" class="lang">{{ lang }}</span>
            <span v-for="tag in problem.tags" :key="tag" class="tag">{{ tag }}</span>
            <span v-if="problem.tags.length === 0" class="tag empty">未标标签</span>
            <span class="src">{{ problem.sourceLabel }}</span>
            <span v-if="problem.updated" class="src">{{ problem.updated.slice(0, 10) }}</span>
          </div>
          <div v-if="problem.solutions.length > 1" class="solutions">
            <span v-for="(solution, index) in problem.solutions" :key="index" class="sol">
              {{ solution.variant ?? solution.langLabel }}
              <template v-if="complexity(solution)">（{{ complexity(solution) }}）</template>
            </span>
          </div>
        </li>
      </ul>

      <p v-else class="state">没有匹配的题解，换个关键词或清除条件。</p>

      <button v-if="filtered.length > visible.length" class="more" type="button" @click="shown += PAGE_SIZE">
        再看 {{ Math.min(PAGE_SIZE, filtered.length - visible.length) }} 题（还剩 {{ filtered.length - visible.length }} 题）
      </button>
    </template>
  </div>
</template>

<style scoped>
.explorer {
  margin: 8px 0 48px;
}

.state {
  color: var(--vp-c-text-2);
}

.toolbar {
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

.search {
  flex: 1 1 320px;
  min-width: 220px;
  padding: 9px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-size: 14px;
}

.search:focus {
  outline: none;
  border-color: var(--vp-c-brand-1);
}

.sort {
  padding: 9px 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-size: 14px;
}

.reset {
  padding: 8px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: transparent;
  color: var(--vp-c-text-2);
  font-size: 13px;
  cursor: pointer;
}

.filters {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 14px 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
}

.row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
}

.label {
  min-width: 76px;
  color: var(--vp-c-text-2);
  font-size: 12px;
}

.chip {
  padding: 3px 9px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  font-size: 12px;
  cursor: pointer;
  transition: all 0.15s;
}

.chip:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.chip.on {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-1);
  color: #fff;
}

.chip em {
  font-style: normal;
  opacity: 0.6;
  margin-left: 3px;
}

.summary {
  margin: 18px 0 10px;
  color: var(--vp-c-text-2);
  font-size: 13px;
}

.muted {
  opacity: 0.75;
}

.list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 8px;
}

.item {
  padding: 10px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
}

.head {
  display: flex;
  gap: 10px;
  align-items: baseline;
  text-decoration: none;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.head:hover .title {
  color: var(--vp-c-brand-1);
}

.id {
  min-width: 42px;
  color: var(--vp-c-text-3);
  font-variant-numeric: tabular-nums;
  font-size: 13px;
}

.title {
  flex: 1 1 auto;
}

.diff {
  font-size: 12px;
  font-weight: 400;
}

.diff[data-level='easy'] {
  color: #3fb950;
}

.diff[data-level='medium'] {
  color: #d29922;
}

.diff[data-level='hard'] {
  color: #f85149;
}

.meta {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 6px;
  font-size: 12px;
  color: var(--vp-c-text-3);
}

.lang {
  padding: 1px 7px;
  border-radius: 4px;
  background: var(--vp-c-default-soft);
  color: var(--vp-c-text-2);
}

.tag {
  padding: 1px 7px;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
}

.tag.empty {
  opacity: 0.5;
}

.src {
  padding: 1px 0;
}

.solutions {
  margin-top: 6px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  font-size: 12px;
  color: var(--vp-c-text-3);
}

.more {
  margin-top: 14px;
  width: 100%;
  padding: 9px;
  border: 1px dashed var(--vp-c-divider);
  border-radius: 10px;
  background: transparent;
  color: var(--vp-c-text-2);
  cursor: pointer;
  font-size: 13px;
}

.more:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}
</style>
