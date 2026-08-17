import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const SKILL_DIRECTORY_URL = new URL(
  './resources/skills/interactive-component-integration/',
  import.meta.url,
)
const SKILL_FILE_URL = new URL('SKILL.md', SKILL_DIRECTORY_URL)

function parseSkill(markdown) {
  const match = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)

  if (!match) {
    throw new Error('SKILL.md must contain YAML frontmatter followed by Markdown content')
  }

  const frontmatter = match[1]
  const content = match[2].trim()
  const readScalar = (key) => {
    const field = frontmatter.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'))
    return field?.[1]?.trim()
  }
  const name = readScalar('name')
  const description = readScalar('description')

  if (!name || !description || !content) {
    throw new Error('SKILL.md must define non-empty name, description, and content')
  }

  return { name, description, content }
}

const skill = parseSkill(readFileSync(SKILL_FILE_URL, 'utf8'))

export const name = 'interactive-component-integration-skill'
export const inject = ['skills']

export function apply(ctx) {
  ctx.skills.register({
    ...skill,
    source: 'runtime',
    path: fileURLToPath(SKILL_FILE_URL),
    resourceBase: {
      kind: 'directory',
      path: fileURLToPath(SKILL_DIRECTORY_URL),
    },
    metadata: {
      package: 'interactive-component-integration',
      distribution: 'dsh-bundle',
    },
  })
}
