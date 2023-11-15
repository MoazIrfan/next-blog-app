import Link from "next/link"
import { 
    RiTwitterXFill,
    RiLinkedinFill,
    RiGithubFill
 } from "react-icons/ri"

export default function Navbar() {
    return (
        <nav className="bg-slate-600 p-4 sticky top-0 drop-shadow-xl z-10 ">
            <div className="prose prose-xl mx-auto flex justify-between flex-col sm:flex-row max-w-2xl">
                <h1 className="text-3xl font-bold text-white grid place-content-center mb-2 md:mb-0">
                    <Link href="/" className="text-white/90 no-underline hover:text-white">{{personName}}</Link>
                </h1>
                <div className="flex flex-row justify-center sm:justify-evenly align-middle gap-4 text-white text-2xl lg:text-3xl">
                    <Link className="text-white/90 hover:text-white" href="https://github.com/moazirfan">
                        <RiLinkedinFill />
                    </Link>
                    <Link className="text-white/90 hover:text-white" href="https://twitter.com/moazirfan">
                        <RiTwitterXFill />
                    </Link>
                    <Link className="text-white/90 hover:text-white" href="https://github.com/moazirfan">
                        <RiGithubFill />
                    </Link>
                </div>
            </div>
        </nav>
    )
}