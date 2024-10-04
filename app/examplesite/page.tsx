import Image from "next/image";

export default function ExampleSite() {
  return (
    // Show image on entire screen
    <div className="flex w-full">
      <Image
        src="/example_site.svg"
        alt="Example Site"
        priority={true}
        // object-fit="contain"
        layout="responsive"
        width={5000}
        height={5000}
        fill={false}
        quality={100}
      />
    </div>
  );
}
