import React from 'react';

interface DashboardItemProps {
  children: React.ReactNode;
  classNameArgs?: string;
}

function DashboardItem({ classNameArgs, children }: DashboardItemProps) {
  return (
    <div
      className={`${classNameArgs} bg-greenlight p-6 rounded-lg shadow-md flex justify-between items-center `}
    >
      {children}
    </div>
  );
}

DashboardItem.defaultProps = {
  classNameArgs: '',
};

export default DashboardItem;
