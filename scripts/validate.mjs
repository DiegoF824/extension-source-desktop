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
  ids.add(manifest.id)
}

console.log(`${ids.size} manifests desktop válidos`)
