
import Image from "next/image"

interface ProfilePicProps {
    source: string
}

export default function ProfilePic({source}: ProfilePicProps) {
    return (
        <section className="w-full mx-auto">
            <Image
                className="border-4 border-black dark:border-slate-500 drop-shadow-xl shadow-black rounded-full mx-auto mt-8"
                src={source}
                width={200}
                height={200}
                alt="profile picture"
                priority={true}
            />
        </section>
    )
}