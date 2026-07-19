import React from 'react';

export default function Sidebar({ activeTab, setActiveTab, isOpen, toggleSidebar }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'flashcards', label: 'FlashCards', icon: 'style' },
    { id: 'research', label: 'AI Research Assistant', icon: 'psychology' },
    { id: 'quiz', label: 'Quiz Generator', icon: 'quiz' },
  ];

  return (
    <>
      {/* Mobile Navigation Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-screen w-[280px] bg-inverse-surface dark:bg-zinc-950 border-r border-outline-variant flex flex-col py-6 z-50 sidebar-transition ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="px-6 mb-10 flex items-center gap-3">
          <div className="p-2 bg-primary rounded-lg">
            <span className="material-symbols-outlined text-on-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
              school
            </span>
          </div>
          <div>
            <h1 className="font-h3 text-h3 font-bold text-primary-fixed dark:text-primary-fixed-dim leading-none">
              AI Study Buddy
            </h1>
            <p className="text-body-sm text-surface-variant/70 mt-1">Intelligent Learning</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-grow space-y-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (isOpen) toggleSidebar(); // close mobile drawer
                }}
                className={`w-[calc(100%-16px)] text-left mx-2 flex items-center px-4 py-3 gap-3 rounded-lg transition-all duration-200 active:scale-[0.98] ${
                  isActive
                    ? 'bg-primary text-on-primary font-bold'
                    : 'text-surface-variant hover:bg-white/10'
                }`}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: isActive ? "'FILL' 1" : undefined }}
                >
                  {item.icon}
                </span>
                <span className="font-body-md">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer Navigation */}
        <div className="mt-auto space-y-1 pt-6 border-t border-white/10">
          <a
            className="text-surface-variant hover:bg-white/10 mx-2 flex items-center px-4 py-3 gap-3 rounded-lg transition-colors group"
            href="#"
            onClick={(e) => e.preventDefault()}
          >
            <span className="material-symbols-outlined">settings</span>
            <span className="font-body-md">Settings</span>
          </a>
          <a
            className="text-surface-variant hover:bg-white/10 mx-2 flex items-center px-4 py-3 gap-3 rounded-lg transition-colors group"
            href="#"
            onClick={(e) => e.preventDefault()}
          >
            <span className="material-symbols-outlined">help_outline</span>
            <span className="font-body-md">Help</span>
          </a>
        </div>
      </aside>
    </>
  );
}
