import { Comment, CommentInput } from '@/lib/types/comments';
import fs from 'fs';
import path from 'path';

const COMMENTS_FILE = path.join(process.cwd(), 'data', 'comments.json');

// Garantir que o arquivo existe
function ensureCommentsFile() {
  if (!fs.existsSync(COMMENTS_FILE)) {
    fs.writeFileSync(COMMENTS_FILE, JSON.stringify([]));
  }
}

function getComments(): Comment[] {
  ensureCommentsFile();
  try {
    const data = fs.readFileSync(COMMENTS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function saveComments(comments: Comment[]) {
  ensureCommentsFile();
  fs.writeFileSync(COMMENTS_FILE, JSON.stringify(comments, null, 2));
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const contentId = searchParams.get('contentId');
  const contentType = searchParams.get('contentType');
  const userId = searchParams.get('userId');

  const comments = getComments();

  let filtered = comments.filter(
    (c) =>
      c.contentId === contentId &&
      c.contentType === contentType
  );

  // Se userId for fornecido, incluir apenas comentários públicos e notas do usuário
  if (userId) {
    filtered = filtered.filter(
      (c) => !c.isNote || c.userId === userId
    );
  } else {
    // Se não há userId, mostrar apenas comentários públicos
    filtered = filtered.filter((c) => !c.isNote);
  }

  return Response.json(filtered);
}

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const contentId = searchParams.get('contentId');
    const contentType = searchParams.get('contentType');
    const userId = searchParams.get('userId');

    if (!contentId || !contentType) {
      return Response.json(
        { error: 'contentId e contentType são obrigatórios' },
        { status: 400 }
      );
    }

    const body: CommentInput = await request.json();

    if (!body.text || body.text.trim().length === 0) {
      return Response.json(
        { error: 'Texto do comentário não pode estar vazio' },
        { status: 400 }
      );
    }

    const newComment: Comment = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      contentId,
      contentType: contentType as 'concilios' | 'heresias' | 'temas',
      author: body.author || 'Anônimo',
      email: body.email,
      text: body.text.substring(0, 5000), // Limitar a 5000 caracteres
      timestamp: Date.now(),
      isNote: body.isNote || false,
      userId: userId || undefined,
    };

    const comments = getComments();
    comments.push(newComment);
    saveComments(comments);

    return Response.json(newComment, { status: 201 });
  } catch (error) {
    console.error('Erro ao salvar comentário:', error);
    return Response.json(
      { error: 'Erro ao salvar comentário' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const commentId = searchParams.get('commentId');
    const userId = searchParams.get('userId');

    if (!commentId) {
      return Response.json(
        { error: 'commentId é obrigatório' },
        { status: 400 }
      );
    }

    const comments = getComments();
    const commentIndex = comments.findIndex((c) => c.id === commentId);

    if (commentIndex === -1) {
      return Response.json(
        { error: 'Comentário não encontrado' },
        { status: 404 }
      );
    }

    const comment = comments[commentIndex];

    // Permitir delete apenas se for nota do próprio usuário
    if (comment.isNote && comment.userId !== userId) {
      return Response.json(
        { error: 'Você não tem permissão para deletar este comentário' },
        { status: 403 }
      );
    }

    comments.splice(commentIndex, 1);
    saveComments(comments);

    return Response.json({ success: true });
  } catch (error) {
    console.error('Erro ao deletar comentário:', error);
    return Response.json(
      { error: 'Erro ao deletar comentário' },
      { status: 500 }
    );
  }
}
