import Image from "next/image"

export default function MyProfilePic() {
    return (
        <section className="w-full mx-auto">
            <a href="https://github.com/moazirfan/next-blog-app" target="_blank" rel="noopener noreferrer">
            <Image
                className="border-4 border-black dark:border-slate-500 drop-shadow-xl shadow-black rounded-full mx-auto mt-8"
                src="/github.svg"
                width={200}
                height={200}
                alt="Profile Photo"
                priority={true}
            />
            </a>
        </section>
    )
}