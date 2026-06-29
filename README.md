# Cleber Developer Portfolio

Um portfolio digital moderno e responsivo construído com HTML5, CSS3 e JavaScript Vanilla.

## 🎯 Features

- ✨ Design moderno com tema claro/escuro
- 📱 Responsivo (mobile, tablet, desktop)
- 🎬 Animações suaves e efeitos visuais (glassmorphism)
- 💬 Sistema de comentários com persistência local
- ⌨️ Efeito typing automático
- 🔒 Segurança contra XSS com escape de HTML
- 🎨 CSS Variables para fácil customização
- ♿ Acessibilidade melhorada

## 📋 Estrutura do Projeto

```
projeto.cleber.developer/
├── index.html           # Arquivo HTML principal (857 linhas)
├── script.js            # JavaScript (333 linhas)
├── style.css            # Estilos CSS (1.836 linhas)
├── run_local.bat        # Script para executar servidor local
├── .gitignore           # Configuração Git
├── package.json         # Dependências do projeto
├── README.md            # Este arquivo
├── .eslintrc.json       # Configuração ESLint
├── .prettierrc.json     # Configuração Prettier
├── jest.config.js       # Configuração Jest
├── assets/              # Imagens e recursos
│   └── profile.png      # Foto de perfil
└── documentos/          # Documentação e referências
```

## 🚀 Como Executar Localmente

### Pré-requisitos

- Node.js 14+ (opcional, apenas para linting/testes)
- Um navegador moderno (Chrome, Firefox, Edge, Safari)

### Opção 1: Executar com Python (Recomendado)

```bash
# Abrir terminal na pasta do projeto
python -m http.server 8000

# Acessar: http://localhost:8000
```

### Opção 2: Executar com Node.js

```bash
# Instalar dependências
npm install

# Executar servidor local
npm run serve

# Acessar: http://localhost:8000
```

### Opção 3: Executar com o Script Batch (Windows)

```bash
run_local.bat
```

## 📦 Instalação e Setup

### 1. Instalar dependências

```bash
npm install
```

### 2. Executar linting

```bash
npm run lint
npm run lint:fix  # Corrigir automaticamente
```

### 3. Executar testes

```bash
npm test           # Rodar todos os testes
npm test:watch     # Modo watch
npm test:coverage  # Com cobertura
```

### 4. Formatar código

```bash
npm run format
```

### 5. Build para produção

```bash
npm run build      # Minificar CSS e JS
```

## 🛠️ Tecnologias Utilizadas

### Frontend
- **HTML5** - Estrutura semântica
- **CSS3** - Estilos avançados com CSS Variables e media queries
- **JavaScript ES6+** - Vanilla JS sem frameworks

### Bibliotecas Externas
- **Font Awesome 6.4.0** - Ícones (CDN)
- **Google Fonts** - Tipografia (Inter, Fira Code)

### Desenvolvimento
- **ESLint** - Linting e análise de código
- **Prettier** - Formatação automática
- **Jest** - Framework de testes
- **Testing Library** - Utilidades de teste
- **Terser** - Minificador de JavaScript
- **cssnano** - Minificador de CSS

## 📝 Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm start` | Inicia servidor de desenvolvimento |
| `npm run serve` | Inicia servidor HTTP simples |
| `npm run lint` | Verifica linting com ESLint |
| `npm run lint:fix` | Corrige automaticamente problemas de linting |
| `npm run format` | Formata código com Prettier |
| `npm run format:check` | Verifica formatação sem modificar |
| `npm test` | Executa testes com Jest |
| `npm run test:watch` | Modo watch para testes |
| `npm run test:coverage` | Gera relatório de cobertura |
| `npm run build` | Minifica CSS e JS para produção |
| `npm run build:css` | Minifica apenas CSS |
| `npm run build:js` | Minifica apenas JavaScript |

## 🎨 Personalização

### Alterar Cores (CSS Variables)

Edite `style.css` e altere as variáveis na seção de root:

```css
:root {
  --bg-main: #0a0e27;
  --text-primary: #e0e0e0;
  --neon-green: #00ff88;
  --neon-blue: #00d4ff;
  /* ... mais cores */
}
```

### Alterar Textos e Conteúdo

Edite `index.html` diretamente ou modifique os dados em `script.js`:

```javascript
const projects = [
  {
    id: 1,
    title: 'Seu Projeto',
    description: 'Descrição do projeto',
    /* ... */
  }
];
```

## 🔒 Segurança

- ✅ Escape de HTML contra XSS
- ✅ Validação básica de formulário
- ✅ Sem dependências perigosas
- ⚠️ Dados de comentários armazenados localmente (localStorage)
- ⚠️ Sem autenticação (considere adicionar para uso em produção)

### Melhorias de Segurança Recomendadas

1. Implementar backend para persistência de dados
2. Adicionar autenticação
3. Adicionar CSRF protection
4. Implementar Content Security Policy (CSP)
5. Validação de entrada no servidor

## ♿ Acessibilidade

O projeto segue diretrizes WCAG 2.1 AA:

- ✅ Semântica HTML correta
- ✅ ARIA labels em elementos interativos
- ✅ Contraste de cores adequado
- ✅ Navegação por teclado (Tab, Enter)
- ✅ Suporte a leitores de tela

## 📊 Qualidade de Código

- **ESLint** - Análise estática de código
- **Prettier** - Formatação consistente
- **Jest** - Testes automatizados
- **Husky** - Git hooks para validação pré-commit

## 🧪 Testes

### Executar testes

```bash
npm test
```

### Ver cobertura de testes

```bash
npm run test:coverage
```

### Testes implementados

- ✅ Validação de escape HTML
- ✅ Funcionalidades de tema (light/dark)
- ✅ Sistema de comentários
- ✅ Navegação por abas
- ✅ Efeito typing

## 🚀 Deploy

### Opção 1: GitHub Pages

```bash
# Fazer push para main branch
git push origin main

# GitHub Pages servirá automaticamente
# https://seu-usuario.github.io/seu-repositorio
```

### Opção 2: Vercel/Netlify

1. Conectar repositório GitHub
2. Configurar build: `npm run build`
3. Deploy automático em cada push

### Opção 3: Servidor próprio

1. Executar `npm run build` para minificar
2. Fazer upload de todos os arquivos para servidor
3. Configurar servidor web (nginx, Apache, etc.)

## 🐛 Troubleshooting

### Problema: "npm: command not found"

**Solução:** Instale Node.js em https://nodejs.org/

### Problema: Tema não persiste ao recarregar

**Solução:** Verifique se localStorage está habilitado no navegador

### Problema: Comentários desaparecem

**Solução:** Limpe cache/cookies ou teste em modo privado

### Problema: Ícones de Font Awesome não aparecem

**Solução:** Verifique conexão com internet (CDN externo) ou baixe Font Awesome localmente

## 📚 Recursos Úteis

- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS Tricks](https://css-tricks.com/)
- [JavaScript.info](https://javascript.info/)
- [Font Awesome Icons](https://fontawesome.com/icons)
- [Google Fonts](https://fonts.google.com/)

## 👤 Autor

**Cleber Developer**

- GitHub: [@cleberprog](https://github.com/cleberprog)
- Portfolio: [seu-site.com](https://seu-site.com)
- Email: seu-email@example.com

## 📄 Licença

Este projeto está sob a licença MIT. Veja `LICENSE` para mais detalhes.

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'feat: adiciona nova feature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

### Padrões de Commit

Utilize conventional commits:

- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Mudanças em documentação
- `style:` Formatação (sem mudanças lógicas)
- `refactor:` Refatoração de código
- `perf:` Melhorias de performance
- `test:` Adição ou modificação de testes
- `chore:` Tarefas de manutenção

## ❓ FAQ

**P: Posso usar este portfolio como template?**
R: Sim! Faça um fork e customize conforme necessário.

**P: Como adiciono novos projetos?**
R: Edite `script.js` e adicione um novo objeto na array `projects`.

**P: Como mudo as cores do tema?**
R: Edite as CSS Variables no topo de `style.css`.

**P: Posso usar em produção?**
R: Sim, mas recomenda-se adicionar um backend para comentários e autenticação.

**P: Como faço deploy?**
R: Veja seção "Deploy" acima.

## 📞 Suporte

Se encontrar problemas, abra uma issue no GitHub ou entre em contato através do email.

---

**Última atualização:** 29/06/2026
**Versão:** 1.1.0
