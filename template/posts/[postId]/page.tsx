import { getSortedPostsData, getPostData } from "../../../../lib/posts"
import { notFound } from "next/navigation"
import Link from "next/link"

export function generateStaticParams() {
    const posts = getSortedPostsData()

    return posts.map((post) => ({
        postId: post.id
    }))
}

export function generateMetadata({ params }: { params: { postId: string } }) {

    const posts = getSortedPostsData()
    const { postId } = params

    const post = posts.find(post => post.id === postId)

    if (!post) {
        return {
            title: 'Post Not Found'
        }
    }

    return {
        title: post.title,
    }
}

export default async function Post({ params }: { params: { postId: string } }) {

    const posts = getSortedPostsData()
    const { postId } = params

    if (!posts.find(post => post.id === postId)) notFound()

    const { title, date, contentHtml } = await getPostData(postId)

    return (
        <main className="md:px-0 px-6 py-10 prose prose-xl prose-slate dark:prose-invert mx-auto dark:text-white/90 max-w-2xl">
            <h1 className="text-2xl font-bold mt-4 mb-0">{title}</h1>
            <p className="mt-1 text-gray-400">
                {date}
            </p>
            <article>
                <section className="mt-2" dangerouslySetInnerHTML={{ __html: contentHtml }} />
                <p className="font-bold mt-10">
                    <Link href="/">← Back to home</Link>
                </p>
            </article>
        </main>
    )
}