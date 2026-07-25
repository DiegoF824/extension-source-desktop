import { readdir, readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const root = resolve('sources')
const directories = await readdir(root, { withFileTypes: true })
const ids = new Set()

for (const directory of directories.filter((entry) => entry.isDirectory())) {
  const path = resolve(root, directory.name, 'manifest.json')
  const manifest = JSON.parse(await readFile(path, 'utf8'))
  for (const key of [
    'schemaVersion',
    'id',
    'name',
    'packageName',
    'version',
    'languages',
    'hosts',
    'capabilities',
    'license',
  ]) {
    if (manifest[key] === undefined) throw new Error(`${path}: campo ${key} ausente`)
  }
  if (manifest.schemaVersion !== 1) throw new Error(`${path}: schema não suportado`)
  if (ids.has(manifest.id)) throw new Error(`${path}: id duplicado`)
  if (!Array.isArray(manifest.languages) || manifest.languages.length === 0) {
    throw new Error(`${path}: pelo menos um idioma é obrigatório`)
  }
  if (!Array.isArray(manifest.hosts) || manifest.hosts.length === 0) {
    throw new Error(`${path}: pelo menos um host é obrigatório`)
  }
  if (
    manifest.verification &&
    (
      manifest.verification.kind !== 'browser-cookie' ||
      !URL.canParse(manifest.verification.url) ||
      new URL(manifest.verification.url).protocol !== 'https:' ||
      !Array.isArray(manifest.verification.cookieNames) ||
      manifest.verification.cookieNames.length === 0
    )
  ) {
    throw new Error(`${path}: configuração de verificação inválida`)
  }
  if (
    manifest.contentRating !== undefined &&
    !['safe', 'adult'].includes(manifest.contentRating)
  ) {
    throw new Error(`${path}: classificação de conteúdo inválida`)
  }
  ids.add(manifest.id)
}

console.log(`${ids.size} manifests desktop válidos`)
