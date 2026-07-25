# Komikku Desktop Extension Sources

Contrato e manifests dos adaptadores nativos do Komikku Desktop.

## Princípios

- adaptadores TypeScript revisados e empacotados com o aplicativo;
- rede executada somente no worker do processo principal;
- lista explícita de hosts, hosts de imagem e capacidades;
- limites de resposta, timeout e cache;
- nenhuma execução direta de APK/JAR ou JavaScript baixado do catálogo;
- desafios web resolvidos manualmente em uma janela Electron isolada.

## Adaptadores

- MangaDex — API pública e MangaDex@Home;
- Pepper&Carrot — API oficial de episódios e traduções;
- xkcd — API JSON e arquivo oficial;
- MyReadingManga — parser HTML multilíngue, conteúdo adulto e verificação
  manual Cloudflare por cookie.

Os manifests ficam em `sources/*/manifest.json`. Execute `npm test` para validar
o formato antes de enviar alterações.

As implementações continuam empacotadas no repositório do aplicativo enquanto o
formato de bundles assinados é estabilizado.
