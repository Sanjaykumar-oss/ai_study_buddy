import React from 'react';

export default function Header({ toggleSidebar, activeTab, userName = 'John Doe', darkMode, toggleDarkMode }) {
  const getBreadcrumbs = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'Dashboard';
      case 'flashcards':
        return 'FlashCards';
      case 'research':
        return 'AI Research Assistant';
      case 'quiz':
        return 'AI Quiz Generator';
      default:
        return 'Dashboard';
    }
  };

  return (
    <header className="fixed top-0 right-0 w-full md:w-[calc(100%-280px)] h-[64px] bg-surface dark:bg-surface-container border-b border-outline-variant flex justify-between items-center px-4 md:px-8 z-40">
      <div className="flex items-center gap-4">
        <button
          className="md:hidden p-2 text-on-surface-variant hover:bg-surface-container-high rounded-full"
          onClick={toggleSidebar}
        >
          <span className="material-symbols-outlined">menu</span>
        </button>

        {/* Breadcrumbs */}
        <div className="hidden sm:flex items-center text-on-surface-variant font-body-sm">
          <span>Workspace</span>
          <span className="material-symbols-outlined text-[18px] mx-1">chevron_right</span>
          <span className="text-primary font-bold">{getBreadcrumbs()}</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 text-on-surface-variant hover:bg-surface-container-high transition-colors rounded-full duration-150"
          title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          <span className="material-symbols-outlined">
            {darkMode ? 'light_mode' : 'dark_mode'}
          </span>
        </button>

        <button className="p-2 text-on-surface-variant hover:bg-surface-container-high transition-colors rounded-full duration-150">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <button className="p-2 text-on-surface-variant hover:bg-surface-container-high transition-colors rounded-full duration-150">
          <span className="material-symbols-outlined">history</span>
        </button>
        <div className="h-8 w-[1px] bg-outline-variant mx-2"></div>

        {/* Profile Section */}
        <button className="flex items-center gap-3 pl-2 pr-1 py-1 hover:bg-surface-container-high rounded-full transition-all duration-150 group">
          <span className="hidden md:block font-label-md text-on-surface">{userName}</span>
          <div className="w-8 h-8 rounded-full overflow-hidden bg-primary-container flex items-center justify-center">
            <img
              className="w-full h-full object-cover"
              alt="A professional headshot"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXXyB-u9Ku5ITmA03tm6sTlwulW2cYx_0K9iAjBTL9e4Mr6mx_7kSbVimc0DrId5xo-fl9Et2K5NCz22ghzs7lLMhejWmOsesVnZlYe_04WrlNg7v1BbUUVlzYZ3YWQzdEOJ3QPWkzdnjpQdOR67mXXYuaWB21CvtPjhZ7FsFfJyuSMTDFu5XWY6El6Cy5uA9DngbR2JmDOj-_csRkM0W9ApyUR5qSPFX19avyeHM6FRaym10JpY-eDuPoOlCtUvLpB-IliX6ZQqQ"
            />
          </div>
          <span className="material-symbols-outlined text-on-surface-variant group-hover:rotate-180 transition-transform duration-300">
            expand_more
          </span>
        </button>
      </div>
    </header>
  );
}
