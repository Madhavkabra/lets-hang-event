import React from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-deep-violet via-purple-900 to-soft-pink">
      {children}
    </div>
  );
};

export default MainLayout;

