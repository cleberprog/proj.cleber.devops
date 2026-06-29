# Setup e Desenvolvimento

Este arquivo contém instruções para setup local e desenvolvimento.

## Setup Inicial

### 1. Instalar Node.js
- Baixe em https://nodejs.org/
- Versão recomendada: 18.x ou superior

### 2. Instalar dependências
```bash
npm install
```

## Desenvolvimento

### Iniciar servidor local
```bash
npm start
```

Acesse http://localhost:8000

### Linting
```bash
npm run lint         # Verificar
npm run lint:fix     # Corrigir automaticamente
```

### Formatação de código
```bash
npm run format       # Formatar todos os arquivos
npm run format:check # Apenas verificar
```

### Testes
```bash
npm test             # Rodar todos
npm run test:watch   # Modo watch
npm run test:coverage # Com cobertura
```

### Build para produção
```bash
npm run build        # Minificar CSS e JS
npm run build:css    # Apenas CSS
npm run build:js     # Apenas JS
```

## Estrutura de Branches

- **main** - Código em produção
- **develop** - Integração de features
- **feature/*** - Novas funcionalidades
- **fix/*** - Correções de bugs

## Processo de Contribuição

1. Criar branch: `git checkout -b feature/minha-feature`
2. Fazer commits: `git commit -m "feat: descrição"`
3. Push: `git push origin feature/minha-feature`
4. Abrir Pull Request no GitHub

## Padrões de Commit

- `feat:` Nova funcionalidade
- `fix:` Correção
- `docs:` Documentação
- `style:` Formatação
- `refactor:` Refatoração
- `test:` Testes
- `chore:` Manutenção

## Troubleshooting

### npm: command not found
- Instale Node.js em https://nodejs.org/

### Port 8000 já em uso
- Use outra porta: `npm run serve -- --port 3000`

### localStorage não funciona
- Verifique se está habilitado no navegador
- Teste em modo incógnito/privado

## Recursos

- [Node.js](https://nodejs.org/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Jest](https://jestjs.io/)
