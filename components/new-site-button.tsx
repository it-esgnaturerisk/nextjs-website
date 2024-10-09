import Link from "next/link";

interface NewSiteButtonProps {
  classNameArgs?: string;
  children?: React.ReactNode;
  href?: string;
}

const NewSiteButton = ({
  classNameArgs,
  children,
  href,
}: NewSiteButtonProps) => {
  return (
    <Link
      href={href ? href : "/new-site"}
      aria-label={
        href
          ? href.substring(1, href.length) + "-button"
          : "button-label-no-href"
      }
      className={`${classNameArgs} bg-greendark text-white py-2 px-4 m-2 rounded-lg shadow-md`}
    >
      {children ? children : "+ New Site"}
    </Link>
  );
};

export default NewSiteButton;
