
import { ReactNode } from 'react';
import Sidebar from './Sidebar';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="flex-1 pl-16 lg:pl-64 min-h-screen">
        {children}
      </main>
    </div>
  );
};

export default Layout;
