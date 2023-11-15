import Link from "next/link"

type BlogPost = {
    id: string;
    title: string;
    subtitle: string;
    date: string;
};

type Props = {
    post: BlogPost
}

export default function ListItem({ post }: Props) {
    const { id, title, subtitle, date } = post

    return (
        <li className="mt-4 mb-16 text-2xl dark:text-white/90">
            <p className="text-sm text-gray-400 mt-1 mb-2">{date}</p>
            <Link className="font-bold hover:text-black/70 dark:hover:text-white" href={`/posts/${id}`}>{title}</Link>
            <p className="text-base text-gray-400 mt-2">{subtitle}</p>
        </li>
    )
}