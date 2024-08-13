import Image from 'next/image'
import Link from 'next/link'

export default function Header(){
    return (
        <header className='flex justify-between items-center py-4 px-20 border-b '>
            <Link href="/">
                <div className='flex items-center justify-center md:w-1/5'>

                    <Image 
                    src="/logo.png"
                    width={1280}
                    height={360}
                    className='hidden md:block'
                    alt="logo"
                    />
                </div>
            </Link>
            <Link href="/login">
                Login
            </Link>
            <Link href="/sites">
                Sites
            </Link>
        </header>
    )
}