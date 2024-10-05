import Link from "next/link";

interface NewSiteButtonProps {
  children?: React.ReactNode;
  classNameArgs?: string;
  href?: string;
}

const NewSiteButton = ({
  classNameArgs,
  children,
  href,
}: NewSiteButtonProps) => {
  return (
    <Link
      href={href ? href : "/newSite"}
      className={`${classNameArgs} bg-greendark text-white py-2 px-4 m-2 rounded-lg shadow-md`}
    >
      {children ? children : "+ New Site"}
    </Link>
  );
};

export default NewSiteButton;
