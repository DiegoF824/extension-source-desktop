export interface DesktopSourceManifest {
  schemaVersion: 1
  id: string
  name: string
  packageName: string
  version: string
  languages: string[]
  hosts: string[]
  capabilities: Array<'search' | 'details' | 'chapters' | 'pages'>
  license: string
}

export interface DesktopSourceAdapter<SearchResult, Manga, Chapter> {
  search(query: string, language: string, page: number): Promise<SearchResult[]>
  getManga(remoteId: string, language: string): Promise<Manga>
  getChapters(remoteId: string, language: string): Promise<Chapter[]>
  getPages(remoteChapterId: string, language: string): Promise<string[]>
}
