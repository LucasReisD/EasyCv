# EasyCV

Criador de currículos responsivo em português (Brasil), feito com HTML, CSS e JavaScript puro.

## Executar
Abra `index.html` no navegador. Não precisa instalar dependências nem compilar, e o projeto pode ser publicado como site estático (por exemplo, Vercel por upload/drag-and-drop).

## Recursos
- Editor guiado em 6 etapas com prévia do currículo em tempo real.
- Salvamento automático no navegador.
- Exportação para impressão/PDF usando a janela de impressão do navegador.
- Exportação e importação de backup JSON para transportar os dados entre dispositivos.
- Tema claro/escuro com preferência salva localmente.
- Layout responsivo para celular e desktop.

## Privacidade
Os dados do currículo ficam no armazenamento local do navegador. O projeto não envia os dados para um servidor nem usa autenticação remota por padrão. Limpar os dados do navegador pode apagar o currículo; use **Exportar backup** para guardar uma cópia.

## Supabase
A integração com Supabase não foi ativada neste pacote porque não havia configuração de projeto associada ao código. Para habilitar sincronização entre dispositivos, configure um projeto explicitamente, crie tabelas com RLS e use apenas a chave publishable no frontend — nunca exponha uma chave `service_role`/secret.


## Layout do currículo

A prévia usa um modelo profissional de uma coluna inspirado no currículo de referência: cabeçalho centralizado, títulos de seção azul-marinho, linhas divisórias discretas e ordem Objetivo, Formação, Experiência, Cursos, Competências e Idiomas. Os dados continuam sendo preenchidos pelo usuário no editor; nenhum dado pessoal do documento de referência foi pré-carregado.
