import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Sites</h1>
        <Link
          href="/new-site"
          className="bg-greendark text-white py-2 px-4 rounded-lg shadow-md"
        >
          + New Site
        </Link>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4"></h2>
        <Image
          src="/figma/sites-list.svg"
          alt="Sites example"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
          quality={100}
        ></Image>
      </div>
    </div>
  );
}
