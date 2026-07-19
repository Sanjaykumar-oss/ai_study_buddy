import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Flashcards from './components/Flashcards';
import ResearchAssistant from './components/ResearchAssistant';
import QuizGenerator from './components/QuizGenerator';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return document.documentElement.classList.contains('dark');
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard setActiveTab={setActiveTab} />;
      case 'flashcards':
        return <Flashcards />;
      case 'research':
        return <ResearchAssistant />;
      case 'quiz':
        return <QuizGenerator />;
      default:
        return <Dashboard setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-surface antialiased flex transition-colors duration-250">
      {/* Sidebar Component */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      {/* Main Page Area */}
      <div className="flex flex-col flex-grow md:ml-[280px] w-full min-h-screen">
        {/* Header Toolbar */}
        <Header
          toggleSidebar={toggleSidebar}
          activeTab={activeTab}
          userName={activeTab === 'research' ? 'Alex Rivera' : 'John Doe'}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />

        {/* Content canvas */}
        <main className="mt-[64px] flex-grow w-full">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;
