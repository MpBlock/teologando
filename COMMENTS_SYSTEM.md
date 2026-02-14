# Sistema de Comentários e Anotações

Este documento explica como funciona o sistema de comentários e anotações do Teologando.

## 📋 Visão Geral

O sistema permite que usuários:
- **Comentários Públicos**: Compartilhem comentários que todos podem ver
- **Anotações Privadas**: Façam anotações pessoais que apenas eles veem
- **Persistência**: Todos os dados são salvos e recuperáveis

## 🗂️ Estrutura de Arquivos

```
lib/
  └── types/
      └── comments.ts          # Tipos TypeScript
app/
  └── api/
      └── comments/
          └── route.ts         # API routes (GET, POST, DELETE)
components/
  └── CommentsSection.tsx      # Componente principal
data/
  └── comments.json            # Armazenamento de persistência
```

## 🔄 Fluxo de Funcionamento

### 1. **Identificação do Usuário**
- Ao carregar a página, um `userId` único é gerado e salvo em `localStorage`
- Cada usuário tem um ID persistente entre sessões

### 2. **Carregar Comentários**
```
GET /api/comments?contentId=[slug]&contentType=[tipo]&userId=[id]
```
- Retorna comentários públicos + anotações privadas do usuário

### 3. **Adicionar Comentário/Anotação**
```
POST /api/comments?contentId=[slug]&contentType=[tipo]&userId=[id]
Body: { author, email?, text, isNote? }
```

### 4. **Deletar**
```
DELETE /api/comments?commentId=[id]&userId=[id]
```
- Apenas o dono pode deletar anotações privadas

## 💾 Persistência

Os comentários são salvos em `data/comments.json`:

```json
[
  {
    "id": "1707864000000-abc123",
    "contentId": "concilio-niceia-1",
    "contentType": "concilios",
    "author": "João Silva",
    "email": "joao@example.com",
    "text": "Excelente explicação sobre o Credo Niceno!",
    "timestamp": 1707864000000,
    "isNote": false,
    "userId": "user-1707860000000-xyz789"
  },
  {
    "id": "1707864100000-def456",
    "contentId": "concilio-niceia-1",
    "contentType": "concilios",
    "author": "Maria",
    "text": "👉 Lembrar: Comparar com Concílio de Constantinopla",
    "timestamp": 1707864100000,
    "isNote": true,
    "userId": "user-1707860000000-abc111"
  }
]
```

## 🎯 Interface de Usuário

### Abas
- **Comentários Públicos**: Todos os comentários vistos por qualquer um
- **Minhas Anotações**: Apenas para o usuário logado

### Formulário
- Campo de nome (opcional)
- Campo de email (apenas para comentários públicos)
- Textarea com limite de 5000 caracteres
- Indicador se é nota privada ou comentário público

### Cards de Comentários
- Autor + data
- Botão de deletar (apenas para o proprietário)
- Texto formatado com quebras de linha

## 🔒 Segurança

1. **Limite de caracteres**: 5000 caracteres máximo
2. **Validação**: Texto vazio é rejeitado
3. **Controle de acesso**: Apenas o dono pode deletar anotações privadas
4. **Sem autenticação**: Baseado em userId do navegador (considerar OAuth no futuro)

## 🚀 Expandir para Banco de Dados

Para migrar para um banco de dados real (PostgreSQL, MongoDB, etc.):

1. Substituir lógica de arquivo em `app/api/comments/route.ts`
2. Usar um ORM como Prisma ou TypeORM
3. Adicionar autenticação real (NextAuth, Auth0, etc.)
4. Considerar moderação de comentários

Exemplo com Supabase:
```typescript
const comment = await supabase
  .from('comments')
  .insert([commentData])
  .select()
  .single();
```

## 🔗 Integração em Páginas

Para adicionar comentários em uma página, importe e use:

```tsx
import CommentsSection from "@/components/CommentsSection";

<CommentsSection
  contentId={slug}
  contentType="concilios"
  contentTitle="Nome do Concílio"
/>
```

## 📱 Funcionalidades Futuras

- [ ] Respostas a comentários (threading)
- [ ] Votação/likes
- [ ] Moderação de spam
- [ ] Notificações
- [ ] Export de anotações
- [ ] Integração com banco de dados persistente
- [ ] Autenticação via GitHub/Google
- [ ] Edição de comentários
