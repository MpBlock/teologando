/**
 * Tipos para o sistema de comentários e anotações
 */

export interface Comment {
  id: string;
  contentId: string; // ID do conteúdo (slug)
  contentType: 'concilios' | 'heresias' | 'temas';
  author: string;
  email?: string;
  text: string;
  timestamp: number;
  isNote: boolean; // true para anotações privadas, false para comentários públicos
  userId?: string; // Identificador do usuário (localStorage key)
}

export interface CommentsState {
  comments: Comment[];
  isLoading: boolean;
  error?: string;
}

export interface CommentInput {
  author: string;
  email?: string;
  text: string;
  isNote?: boolean;
}
