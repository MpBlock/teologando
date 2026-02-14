'use client';

import { useState, useEffect, useCallback } from 'react';
import { Comment, CommentInput } from '@/lib/types/comments';

interface CommentsProps {
  contentId: string;
  contentType: 'concilios' | 'heresias' | 'temas';
  contentTitle: string;
}

export default function CommentsSection({
  contentId,
  contentType,
  contentTitle,
}: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [userId, setUserId] = useState<string>('');

  // Inicializar userId do localStorage
  useEffect(() => {
    let id = localStorage.getItem('app_user_id');
    if (!id) {
      id = `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('app_user_id', id);
    }
    setUserId(id);
    loadComments(id);
  }, [contentId, contentType]);

  const loadComments = useCallback(
    async (id: string) => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          contentId,
          contentType,
          userId: id,
        });
        const response = await fetch(`/api/comments?${params}`);
        if (response.ok) {
          const data = await response.json();
          setComments(data);
        }
      } catch (error) {
        console.error('Erro ao carregar comentários:', error);
      } finally {
        setLoading(false);
      }
    },
    [contentId, contentType]
  );

  const handleAddComment = async (input: CommentInput & { isNote?: boolean }) => {
    try {
      const params = new URLSearchParams({
        contentId,
        contentType,
        userId,
      });
      const response = await fetch(`/api/comments?${params}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });

      if (response.ok) {
        const newComment = await response.json();
        setComments([newComment, ...comments]);
        setShowForm(false);
      }
    } catch (error) {
      console.error('Erro ao adicionar comentário:', error);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!confirm('Tem certeza que deseja deletar este comentário?')) {
      return;
    }

    try {
      const params = new URLSearchParams({
        commentId,
        userId,
      });
      const response = await fetch(`/api/comments?${params}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setComments(comments.filter((c) => c.id !== commentId));
      }
    } catch (error) {
      console.error('Erro ao deletar comentário:', error);
    }
  };

  return (
    <section className="mt-12 pt-8 border-t-2 border-[var(--accent)]">
      <div className="max-w-3xl">
        <h2 className="text-3xl font-bold mb-6 text-[var(--accent)] flex items-center gap-2">
          💬 Comentários da Comunidade
        </h2>

        {/* Formulário */}
        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="mb-8 px-6 py-3 bg-[var(--accent)] text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            + Adicionar Comentário
          </button>
        ) : (
          <CommentForm
            onSubmit={(input) => {
              handleAddComment(input);
            }}
            onCancel={() => setShowForm(false)}
          />
        )}

        {/* Lista de comentários */}
        {loading ? (
          <p className="text-[var(--muted)]">Carregando...</p>
        ) : comments.length > 0 ? (
          <div className="space-y-4">
            {comments.map((comment) => (
              <CommentCard
                key={comment.id}
                comment={comment}
                isOwner={comment.userId === userId}
                onDelete={handleDeleteComment}
              />
            ))}
          </div>
        ) : (
          <p className="text-[var(--muted)]">
            Nenhum comentário público ainda. Seja o primeiro a compartilhar sua perspectiva!
          </p>
        )}
      </div>
    </section>
  );
}

interface CommentFormProps {
  onSubmit: (input: CommentInput) => void;
  onCancel: () => void;
}

function CommentForm({ onSubmit, onCancel }: CommentFormProps) {
  const [author, setAuthor] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) {
      alert('Por favor, escreva algo!');
      return;
    }
    onSubmit({
      author: author || 'Anônimo',
      email: email || undefined,
      text,
    });
    setAuthor('');
    setEmail('');
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 p-6 bg-[var(--secondary)] rounded-lg">
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2 text-[var(--foreground)]">
          Seu nome
        </label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Seu nome (opcional)"
          className="w-full px-3 py-2 rounded-lg bg-[var(--input-bg)] border border-[var(--border)] text-[var(--foreground)] placeholder-[var(--muted)]"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2 text-[var(--foreground)]">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seu@email.com (opcional)"
          className="w-full px-3 py-2 rounded-lg bg-[var(--input-bg)] border border-[var(--border)] text-[var(--foreground)] placeholder-[var(--muted)]"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2 text-[var(--foreground)]">
          Seu comentário
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Compartilhe suas reflexões, dúvidas ou insights com a comunidade..."
          rows={5}
          maxLength={5000}
          className="w-full px-3 py-2 rounded-lg bg-[var(--input-bg)] border border-[var(--border)] text-[var(--foreground)] placeholder-[var(--muted)] resize-none"
        />
        <p className="text-xs text-[var(--muted)] mt-1">
          {text.length}/5000 caracteres
        </p>
      </div>

      <p className="text-xs text-[var(--muted)] mb-4">
        🌐 Seu comentário será visível a todos os visitantes do site.
      </p>

      <div className="flex gap-3">
        <button
          type="submit"
          className="px-6 py-2 bg-[var(--accent)] text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          Publicar
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 bg-[var(--border)] text-[var(--foreground)] rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

interface CommentCardProps {
  comment: Comment;
  isOwner: boolean;
  onDelete: (id: string) => void;
}

function CommentCard({ comment, isOwner, onDelete }: CommentCardProps) {
  const date = new Date(comment.timestamp).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="p-4 bg-[var(--secondary)] rounded-lg border border-[var(--border)]">
      <div className="flex justify-between items-start mb-2">
        <div>
          <p className="font-semibold text-[var(--foreground)]">
            {comment.author}
          </p>
          <p className="text-xs text-[var(--muted)]">{date}</p>
        </div>
        {isOwner && (
          <button
            onClick={() => onDelete(comment.id)}
            className="text-xs px-2 py-1 bg-red-500/20 text-red-600 rounded hover:bg-red-500/30 transition-colors"
          >
            Deletar
          </button>
        )}
      </div>
      <p className="text-[var(--foreground)] leading-relaxed whitespace-pre-wrap break-words">
        {comment.text}
      </p>
    </div>
  );
}
