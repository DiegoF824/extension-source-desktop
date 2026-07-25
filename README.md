# Komikku Desktop Extension Sources

Contrato e fontes dos adaptadores nativos do Komikku Desktop.

## Princípios

- adaptadores TypeScript revisados e empacotados com o aplicativo;
- rede executada somente no worker do processo principal;
- lista explícita de hosts e capacidades;
- limites de resposta, timeout e cache;
- nenhuma execução direta de APK/JAR ou JavaScript baixado do catálogo.

## Adaptadores iniciais

- MangaDex — API pública e MangaDex@Home;
- Pepper&Carrot — API oficial de episódios e traduções;
- xkcd — API JSON e arquivo oficial.

Os manifests ficam em `sources/*/manifest.json`. Execute `npm test` para validar
o formato antes de enviar alterações.

As implementações iniciais estão vendorizadas no repositório do aplicativo
enquanto o formato de bundles assinados é estabilizado.
