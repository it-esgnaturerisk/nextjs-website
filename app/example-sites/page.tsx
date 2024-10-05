import Image from "next/image";
import NewSiteButton from "@/components/new-site-button";

export default async function Home() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Sites</h1>
        <div>
          <NewSiteButton href="https://esg-reports-bucket.s3.amazonaws.com/ESG_Nature_Risk_Report_Example.pdf">
            Download example
          </NewSiteButton>
          <NewSiteButton></NewSiteButton>
        </div>
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
