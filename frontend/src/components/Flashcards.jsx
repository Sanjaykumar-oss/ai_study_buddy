import React, { useState, useEffect } from 'react';

const MOCK_DECKS = [
  { _id: 'mock-1', name: 'Cellular Biology', cardsCount: 124, mastery: 68, icon: 'biotech', category: 'secondary-container', color: 'primary', time: '2h ago' },
  { _id: 'mock-2', name: 'Organic Chemistry', cardsCount: 85, mastery: 42, icon: 'science', category: 'tertiary-container', color: 'primary', time: '1 day ago' },
  { _id: 'mock-3', name: 'Ancient Civilizations', cardsCount: 210, mastery: 91, icon: 'history_edu', category: 'primary-fixed', color: 'tertiary', time: '3 days ago' },
  { _id: 'mock-4', name: 'Macroeconomics 101', cardsCount: 56, mastery: 0, icon: 'monitoring', category: 'secondary-container', color: 'primary', time: 'Never studied' }
];

export default function Flashcards() {
  const [decks, setDecks] = useState(MOCK_DECKS);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('Last Studied');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDeckName, setNewDeckName] = useState('');
  const [userId] = useState('60d5ec4b1234567890abcdef'); // Default mock userId

  useEffect(() => {
    fetchDecks();
  }, []);

  const fetchDecks = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/decks?userId=${userId}`);
      if (response.ok) {
        const data = await response.json();
        if (data && data.length > 0) {
          // Merge API data with default layout details
          const merged = data.map((d, index) => ({
            ...d,
            cardsCount: d.cardsCount || Math.floor(Math.random() * 100) + 10,
            mastery: d.mastery || Math.floor(Math.random() * 80) + 10,
            icon: d.icon || (index % 2 === 0 ? 'biotech' : 'science'),
            category: index % 3 === 0 ? 'secondary-container' : 'tertiary-container',
            time: 'Just now'
          }));
          setDecks(merged);
        }
      }
    } catch (e) {
      console.warn('Backend server not responding. Using offline mock data.');
    }
  };

  const handleCreateDeck = async (e) => {
    e.preventDefault();
    if (!newDeckName.trim()) return;

    const newDeckObj = {
      name: newDeckName,
      userId: userId
    };

    try {
      const response = await fetch('http://localhost:5000/api/decks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDeckObj)
      });
      if (response.ok) {
        fetchDecks();
      } else {
        // Mock fallback addition
        const mockNew = {
          _id: 'mock-' + Date.now(),
          name: newDeckName,
          cardsCount: 0,
          mastery: 0,
          icon: 'menu_book',
          category: 'primary-fixed',
          time: 'Created just now'
        };
        setDecks([...decks, mockNew]);
      }
    } catch (err) {
      // Mock fallback addition
      const mockNew = {
        _id: 'mock-' + Date.now(),
        name: newDeckName,
        cardsCount: 0,
        mastery: 0,
        icon: 'menu_book',
        category: 'primary-fixed',
        time: 'Created just now (Offline)'
      };
      setDecks([...decks, mockNew]);
    }

    setNewDeckName('');
    setIsModalOpen(false);
  };

  const handleDeleteDeck = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this deck?')) return;

    try {
      const response = await fetch(`http://localhost:5000/api/decks/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        fetchDecks();
      } else {
        setDecks(decks.filter(d => d._id !== id));
      }
    } catch (err) {
      setDecks(decks.filter(d => d._id !== id));
    }
  };

  // Filter & Sort logic
  const filteredDecks = decks.filter(d =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedDecks = [...filteredDecks].sort((a, b) => {
    if (sortBy === 'Card Count') {
      return (b.cardsCount || 0) - (a.cardsCount || 0);
    } else if (sortBy === 'Progress') {
      return (b.mastery || 0) - (a.mastery || 0);
    }
    return 0; // default order
  });

  return (
    <div className="p-4 md:p-8 max-w-[1280px] mx-auto space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="font-h1 text-h1 text-on-surface tracking-tight">My Flashcard Decks</h2>
          <p className="text-on-surface-variant font-body-md mt-1">Master your subjects with AI-powered spaced repetition.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-on-primary px-6 py-3 rounded-lg font-button flex items-center gap-2 hover:opacity-90 transition-all shadow-sm active:scale-95 w-fit"
        >
          <span className="material-symbols-outlined">add</span>
          <span>Create New Deck</span>
        </button>
      </div>

      {/* Daily Review Banner */}
      <section className="relative overflow-hidden rounded-xl bg-primary-container p-8 flex flex-col md:flex-row items-center justify-between border border-primary/20">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-on-primary-container opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-on-primary opacity-10 rounded-full blur-2xl"></div>
        <div className="relative z-10 space-y-4 max-w-xl">
          <div className="flex items-center gap-2 text-on-primary-container">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
            <span className="font-label-md uppercase tracking-wider">Ready for Review</span>
          </div>
          <h3 className="font-h2 text-h2 text-white">Daily Learning Streak: 12 Days</h3>
          <p className="text-on-primary-container font-body-md opacity-90 leading-relaxed">
            You have 48 cards scheduled for review today across 3 decks. Start your session now to maintain your peak cognitive performance.
          </p>
          <div className="flex gap-4 pt-2">
            <button className="bg-white text-primary px-8 py-3 rounded-lg font-button hover:bg-surface-bright transition-colors shadow-lg">
              Start Daily Session
            </button>
            <button className="text-white border border-white/30 px-6 py-3 rounded-lg font-button hover:bg-white/10 transition-colors">
              View Schedule
            </button>
          </div>
        </div>
      </section>

      {/* Filters & Stats */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-2 border-b border-outline-variant">
        <div className="flex gap-4 overflow-x-auto w-full sm:w-auto">
          <button className="font-button text-primary border-b-2 border-primary pb-2 px-1 whitespace-nowrap">All Decks ({sortedDecks.length})</button>
          <button className="font-button text-on-surface-variant hover:text-primary transition-colors pb-2 px-1 whitespace-nowrap">Recent</button>
          <button className="font-button text-on-surface-variant hover:text-primary transition-colors pb-2 px-1 whitespace-nowrap">Mastered</button>
        </div>
        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
          <div className="relative max-w-[200px] w-full">
            <span className="material-symbols-outlined absolute left-2 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">search</span>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-surface border border-outline-variant rounded-lg pl-8 pr-3 py-1.5 text-body-sm focus:ring-primary focus:border-primary"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-body-sm text-on-surface-variant whitespace-nowrap">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-surface border border-outline-variant rounded-lg text-body-sm px-3 py-1.5 focus:ring-primary focus:border-primary"
            >
              <option>Last Studied</option>
              <option>Card Count</option>
              <option>Progress</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bento Grid of Deck Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedDecks.map((deck) => (
          <div
            key={deck._id}
            className="deck-card group relative bg-surface border border-outline-variant rounded-xl p-6 hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer flex flex-col h-64 overflow-hidden"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 bg-primary-container text-primary rounded-lg`}>
                <span className="material-symbols-outlined">{deck.icon || 'style'}</span>
              </div>
              <button
                onClick={(e) => handleDeleteDeck(deck._id, e)}
                className="text-on-surface-variant hover:text-error p-1 rounded hover:bg-surface-container-high transition-colors"
                title="Delete Deck"
              >
                <span className="material-symbols-outlined text-[20px]">delete</span>
              </button>
            </div>
            <div className="flex-1">
              <h4 className="font-h3 text-h3 text-on-surface group-hover:text-primary transition-colors truncate">{deck.name}</h4>
              <p className="text-on-surface-variant text-body-sm mt-1">{deck.cardsCount} Cards • Last studied {deck.time}</p>
            </div>
            <div className="space-y-2 mt-4">
              <div className="flex justify-between text-label-md">
                <span>Mastery</span>
                <span>{deck.mastery}%</span>
              </div>
              <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all"
                  style={{ width: `${deck.mastery}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}

        {/* AI Generation Card */}
        <div
          onClick={() => setIsModalOpen(true)}
          className="group relative bg-surface border-2 border-dashed border-outline-variant rounded-xl p-6 hover:border-primary transition-all duration-300 cursor-pointer flex flex-col items-center justify-center h-64 text-center"
        >
          <div className="w-16 h-16 rounded-full bg-primary-fixed-dim flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-3xl">auto_awesome</span>
          </div>
          <h4 className="font-h3 text-h3 text-on-surface">Generate from PDF</h4>
          <p className="text-on-surface-variant text-body-sm mt-2 max-w-[200px]">Upload your notes and let AI create the flashcards for you.</p>
        </div>
      </div>

      {/* Learning Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 pt-8">
        <div className="lg:col-span-3 bg-surface border border-outline-variant rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h4 className="font-h3 text-h3">Learning Activity</h4>
            <div className="flex gap-2">
              <span className="w-3 h-3 rounded-full bg-primary"></span>
              <span className="text-body-sm text-on-surface-variant">Cards Reviewed</span>
            </div>
          </div>
          <div className="h-48 flex items-end justify-between gap-2">
            {[40, 60, 30, 85, 95, 50, 10].map((height, i) => {
              const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
              return (
                <div key={i} className="flex-1 bg-surface-container-high rounded-t-md relative group" style={{ height: `${height}%` }}>
                  <div className="absolute inset-0 bg-primary opacity-30 rounded-t-md group-hover:opacity-60 transition-opacity"></div>
                  <span className="absolute -bottom-6 left-1/2 -translate-y-0.5 -translate-x-1/2 text-[11px] text-on-surface-variant font-medium">{days[i]}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="bg-primary text-on-primary rounded-xl p-6 flex flex-col justify-between shadow-lg">
          <div className="space-y-1">
            <p className="text-on-primary-container text-body-sm opacity-80">Efficiency Boost</p>
            <h4 className="font-h3 text-h3 leading-tight text-white">Your AI Assistant detected a gap in 'Neurotransmitters'.</h4>
          </div>
          <button className="mt-4 bg-white text-primary w-full py-2.5 rounded-lg font-button hover:bg-surface-bright transition-colors">
            Patch Knowledge
          </button>
          <div className="mt-6 flex items-center justify-center">
            <span className="material-symbols-outlined text-5xl opacity-40 text-white" style={{ fontVariationSettings: "'FILL' 1" }}>
              auto_stories
            </span>
          </div>
        </div>
      </div>

      {/* Create Deck Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-surface rounded-xl border border-outline-variant max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-h3 text-h3 text-on-surface">Create New Flashcard Deck</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-on-surface-variant hover:text-on-surface">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleCreateDeck} className="space-y-4">
              <div className="space-y-1">
                <label className="text-body-sm font-bold text-on-surface-variant">Deck Name</label>
                <input
                  type="text"
                  placeholder="e.g. Cellular Biology"
                  value={newDeckName}
                  onChange={(e) => setNewDeckName(e.target.value)}
                  className="w-full bg-surface-container border border-outline-variant rounded-lg px-4 py-2 text-body-md focus:ring-2 focus:ring-primary focus:border-primary"
                  autoFocus
                  required
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-outline-variant rounded-lg font-button hover:bg-surface-container-high text-on-surface"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary text-on-primary rounded-lg font-button hover:opacity-90"
                >
                  Create Deck
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
