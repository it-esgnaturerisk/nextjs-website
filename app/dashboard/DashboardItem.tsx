interface DashboardItemProps {
  children: React.ReactNode;
  classNameArgs?: string;
}

const DashboardItem = ({ classNameArgs, children }: DashboardItemProps) => {
  return (
    <div
      className={`${classNameArgs} bg-greenlight p-6 rounded-lg shadow-md flex justify-between items-center `}
    >
      {children}
    </div>
  );
};

export default DashboardItem;
