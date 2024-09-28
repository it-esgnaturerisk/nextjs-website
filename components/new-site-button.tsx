import Link from "next/link";

const NewSiteButton = () => {
  return (
    <Link
      href="/newSite"
      className="bg-greendark text-white py-2 px-4 rounded-lg shadow-md"
    >
      + New Site
    </Link>
  );
};

export default NewSiteButton;
