import Link from "next/link";

type Props = {
  titulo: string;
  descricao: string;
  link: string;
};

export default function Card({ titulo, descricao, link }: Props) {
  return (
    <Link
      href={link}
      className="border rounded-lg p-6 hover:shadow-md transition"
    >
      <h2 className="font-bold text-xl mb-2">{titulo}</h2>
      <p className="text-gray-600">{descricao}</p>
    </Link>
  );
}
