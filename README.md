# Apresentação - Desenvolvimento Neuropsicológico e Autonomia

Este projeto é um site estático (index.html, style.css, script.js) pronto para deploy na Vercel.

Como fazer o deploy:
1. Instale a CLI da Vercel (opcional): `npm i -g vercel`
2. Faça login: `vercel login`
3. No diretório do projeto, rode: `vercel` para deploy de desenvolvimento ou `vercel --prod` para produção.

Observações:
- A configuração de `vercel.json` usa o builder estático e serve `index.html` para todas as rotas (single-page).
- Arquivos estáticos (css/js/media) recebem cache de longo prazo.

