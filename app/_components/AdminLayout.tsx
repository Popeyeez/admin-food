import { ReactNode } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export const AdminLayout = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const customStyle = className + " w-full";
  return (
    <div className="flex">
      <Sidebar />
      <div className={customStyle}>
        <Header />
        {children}
      </div>
    </div>
  );
};
