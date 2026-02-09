# 📖 Teologando - Enciclopédia de Teologia Cristã

Uma plataforma web moderna e responsiva dedicada à exploração de conceitos fundamentais da teologia cristã, incluindo concílios ecumênicos, heresias históricas e tópicos de teologia sistemática.

## 🌟 Características

### 🔍 **Busca Inteligente**
- Busca em tempo real com sugestões automáticas
- Filtros avançados por período, categorias e temas
- Interface responsiva para desktop e mobile

### 📱 **Design Responsivo**
- Menu responsivo com hamburguer para mobile
- Layout adaptativo para todos os tamanhos de tela
- Tema claro/escuro nativo

### 🤝 **Compartilhamento Social**
- Compartilhar no WhatsApp, Email, Twitter
- Copiar links para clipboard
- Feedback visual instantâneo

### 📚 **Conteúdo Estruturado**
- **Concílios**: 7 concílios ecumênicos (Niceia, Constantinopla, Efeso, Calcedônia, etc.)
- **Heresias**: 9 heresias históricas (Arianismo, Pelagianismo, Modernismo, etc.)
- **Temas**: Tópicos fundamentais (Trindade, Cristologia, Salvação, etc.)

### ♿ **Acessibilidade & SEO**
- Breadcrumbs automáticos de navegação
- Metadata dinâmica e OpenGraph
- JSON-LD schema markup
- Sitemap automático
- Robots.txt configurado

## 🚀 Tecnologias

- **Framework**: [Next.js 16](https://nextjs.org/) com App Router
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Linting**: [ESLint 9](https://eslint.org/)
- **Hospedagem**: Otimizado para Vercel

## 📦 Pré-requisitos

- Node.js 18+ 
- npm ou yarn

## 🛠️ Instalação

1. Clone o repositório:
```bash
git clone https://github.com/MpBlock/teologando.git
cd teologando
```

2. Instale as dependências:
```bash
npm install
```

3. Execute em desenvolvimento:
```bash
npm run dev
```

4. Abra [http://localhost:3000](http://localhost:3000) no navegador

## 📁 Estrutura do Projeto

```
teologando/
├── app/                    # Rotas e layouts (Next.js 13+)
│   ├── page.tsx           # Página inicial
│   ├── layout.tsx         # Layout raiz
│   ├── globals.css        # Estilos globais
│   ├── concilios/         # Páginas de concílios
│   ├── heresias/          # Páginas de heresias
│   ├── temas/             # Páginas de temas
│   ├── api/               # Rotas API
│   └── sitemap.ts         # Sitemap dinâmico
├── components/             # Componentes React reutilizáveis
│   ├── Header.tsx         # Navegação
│   ├── Footer.tsx         # Rodapé
│   ├── Breadcrumbs.tsx    # Breadcrumbs
│   ├── Filters.tsx        # Sistema de filtros
│   ├── SearchButtons.tsx  # Botões de compartilhamento
│   └── ...
├── data/                   # Dados estáticos
│   ├── concilios.ts
│   ├── heresias.ts
│   ├── temas.ts
│   └── conteudoTemas.ts
├── lib/                    # Utilitários
│   └── schema.tsx         # JSON-LD schemas
├── public/                 # Arquivos estáticos
│   ├── robots.txt         # SEO - robots
│   └── favicon.ico        # Favicon
└── package.json           # Dependências
```

## 🎯 Funcionalidades Principais

### 1. **Página Inicial**
- Hero section otimizado com busca em destaque
- Três cards principais (Concílios, Heresias, Temas)
- Metadata e schema markup completo

### 2. **Concílios**
- Lista de 7 concílios ecumênicos
- Filtros por período (Antiga, Medieval, Moderna)
- Filtros por temas abordados
- Modal com detalhes e compartilhamento

### 3. **Heresias**
- Lista de 9 heresias históricas
- Filtros por período
- Informações sobre condenação
- Modal com temas relacionados

### 4. **Temas**
- Tópicos de teologia sistemática
- Busca por conceito
- Subtemas estruturados
- Compartilhamento de conteúdo

## 🔧 Scripts Disponíveis

```bash
npm run dev      # Inicia servidor de desenvolvimento
npm run build    # Cria build otimizado para produção
npm start        # Inicia servidor de produção
npm run lint     # Executa ESLint
```

## 🌐 SEO & Performance

- ✅ Sitemap dinâmico (`/sitemap.xml`)
- ✅ Robots.txt configurado
- ✅ Breadcrumbs estruturados
- ✅ Node schema markup (Organization, WebSite, Article)
- ✅ OpenGraph meta tags
- ✅ Twitter cards
- ✅ Metadata dinâmica por página
- ✅ URLs canônicas
- ✅ Mobile-first design

## 📊 Estrutura de Dados

### Concílios
```typescript
{
  id: number;
  slug: string;
  nome: string;
  ano: number;
  temasAbordados: string[];
}
```

### Heresias
```typescript
{
  id: number;
  slug: string;
  nome: string;
  periodo: string;
  temasAbordados: string[];
}
```

### Temas
```typescript
{
  id: number;
  slug: string;
  nome: string;
  descricao: string;
  temasAbordados: string[];
}
```

## 🎨 Personalização

### Cores
Editado em `app/globals.css`:
```css
:root {
  --accent: #4f46e5;        /* Azul primário */
  --accent-dark: #4338ca;   /* Azul escuro */
  --background: #f8f8f8;    /* Fundo claro */
  /* ... */
}
```

### Conteúdo
- Concílios: `data/concilios.ts`
- Heresias: `data/heresias.ts`
- Temas: `data/temas.ts`
- Conteúdo detalhado: `data/conteudoTemas.ts`

## 🚀 Deploy

### Vercel (Recomendado)
```bash
npm run build
vercel deploy
```

### Outras plataformas
A aplicação é compatível com qualquer host que suporte Next.js 16.

## 📝 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🤝 Contribuições

Contribuições são bem-vindas! Por favor:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📧 Contato

**Teologando** - [@teologando](https://twitter.com/teologando)

## 🎓 Recursos Educacionais

Este projeto foi desenvolvido como uma ferramenta educacional para explorar:
- História da Igreja Cristã
- Decisões doutrinais importantes
- Heresias e controvérsias teológicas
- Teologia sistemática cristã

Para mais informações sobre teologia, recomendamos:
- Enciclopédia de Teologia Cristã
- Documentos dos Concílios Ecumênicos
- Obras de teólogos históricos

---

**Desenvolvido com ❤️ para a comunidade cristã**
