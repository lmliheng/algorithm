/** 子代理产出的元信息 YAML 的轻量解析器。 */

export interface AnnotateRecord {
  path: string
  difficulty: string | null
  tags: string[]
  time: string | null
  space: string | null
  note: string | null
}

function unquote(value: string): string {
  const text = value.trim()
  if (text.length >= 2) {
    const first = text[0]
    const last = text[text.length - 1]
    if ((first === '"' && last === '"') || (first === "'" && last === "'")) {
      return text.slice(1, -1).trim()
    }
  }
  return text
}

function isEmptyValue(value: string): boolean {
  const text = unquote(value).toLowerCase()
  return text === '' || text === 'null' || text === '~' || text === 'none'
}

function parseList(value: string): string[] {
  const text = value.trim().replace(/^\[/, '').replace(/\]$/, '')
  return text
    .split(/[,，、]/)
    .map((item) => unquote(item))
    .filter(Boolean)
}

export function parseAnnotationYaml(text: string): AnnotateRecord[] {
  const records: AnnotateRecord[] = []
  let current: AnnotateRecord | null = null

  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim()
    if (!line || line.startsWith('#') || line === '---') continue

    const item = line.match(/^-\s*path\s*:\s*(.+)$/)
    if (item) {
      current = {
        path: unquote(item[1] as string),
        difficulty: null,
        tags: [],
        time: null,
        space: null,
        note: null,
      }
      records.push(current)
      continue
    }

    if (!current) continue
    const kv = line.match(/^([A-Za-z_][\w-]*)\s*:\s*(.*)$/)
    if (!kv) continue

    const key = (kv[1] as string).toLowerCase()
    const value = (kv[2] as string).trim()

    if (key === 'path') current.path = unquote(value)
    else if (key === 'tags' || key === 'tag') current.tags = parseList(value)
    else if (key === 'difficulty' || key === 'diff') {
      current.difficulty = isEmptyValue(value) ? null : unquote(value).toLowerCase()
    } else if (key === 'time') current.time = isEmptyValue(value) ? null : unquote(value)
    else if (key === 'space') current.space = isEmptyValue(value) ? null : unquote(value)
    else if (key === 'note' || key === 'desc') current.note = isEmptyValue(value) ? null : unquote(value)
  }

  return records.filter((record) => record.path.length > 0)
}
