export interface DesktopSourceManifest {
  schemaVersion: 1
  id: string
  name: string
  packageName: string
  version: string
  languages: string[]
  hosts: string[]
  imageHosts?: string[]
  capabilities: Array<
    'search' | 'filters' | 'details' | 'preview' | 'chapters' | 'pages'
  >
  contentRating?: 'safe' | 'adult'
  verification?: {
    kind: 'browser-cookie'
    url: string
    cookieNames: string[]
  }
  license: string
}

export interface DesktopSourceAdapter<SearchResult, Manga, Chapter> {
  getFilters(language: string): Promise<unknown[]>
  search(query: string, language: string, page: number): Promise<SearchResult[]>
  getManga(remoteId: string, language: string): Promise<Manga>
  getChapters(remoteId: string, language: string): Promise<Chapter[]>
  getPages(remoteChapterId: string, language: string): Promise<string[]>
}
