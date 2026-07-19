import React from 'react';

export default function Dashboard({ setActiveTab }) {
  return (
    <div className="p-4 md:p-8 max-w-[1280px] mx-auto space-y-6">
      {/* Welcome Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4 py-4">
        <div>
          <h2 className="font-h1-mobile md:font-h1 text-h1-mobile md:text-h1 text-on-surface">Welcome back, John!</h2>
          <p className="text-body-lg text-on-surface-variant mt-2 max-w-2xl">
            Ready to tackle your learning goals today? Your AI Study Buddy has curated fresh study paths based on your recent progress.
          </p>
        </div>
        <button className="bg-primary text-on-primary px-6 py-3 rounded-lg font-button flex items-center gap-2 hover:opacity-90 transition-opacity w-fit shadow-md">
          <span className="material-symbols-outlined">add</span>
          <span>New Study Session</span>
        </button>
      </section>

      {/* Bento Summary Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Flashcards */}
        <div className="glass-card p-6 rounded-xl flex items-start justify-between relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-label-md text-on-surface-variant uppercase tracking-wider">Total Flashcards</p>
            <h3 className="font-h2 text-h2 text-on-surface mt-2">1,284</h3>
            <div className="mt-4 flex items-center gap-1 text-primary">
              <span className="material-symbols-outlined text-sm">trending_up</span>
              <span className="text-body-sm font-bold">+12% this week</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-lg bg-primary-fixed flex items-center justify-center text-primary relative z-10">
            <span className="material-symbols-outlined">style</span>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-5 text-on-surface">
            <span className="material-symbols-outlined text-[120px]">style</span>
          </div>
        </div>

        {/* Study Sessions */}
        <div className="glass-card p-6 rounded-xl flex items-start justify-between relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-label-md text-on-surface-variant uppercase tracking-wider">Study Sessions</p>
            <h3 className="font-h2 text-h2 text-on-surface mt-2">42</h3>
            <div className="mt-4 flex items-center gap-1 text-secondary">
              <span className="material-symbols-outlined text-sm">schedule</span>
              <span className="text-body-sm font-bold">18.5 hours total</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-lg bg-secondary-fixed flex items-center justify-center text-secondary relative z-10">
            <span className="material-symbols-outlined">timer</span>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-5 text-on-surface">
            <span className="material-symbols-outlined text-[120px]">timer</span>
          </div>
        </div>

        {/* AI Credits */}
        <div className="glass-card p-6 rounded-xl flex items-start justify-between relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-label-md text-on-surface-variant uppercase tracking-wider">AI Credits</p>
            <h3 className="font-h2 text-h2 text-on-surface mt-2">850</h3>
            <div className="mt-4 flex items-center gap-1 text-tertiary">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
              <span className="text-body-sm font-bold">Refills in 4 days</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-lg bg-tertiary-fixed flex items-center justify-center text-tertiary relative z-10">
            <span className="material-symbols-outlined">psychology</span>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-5 text-on-surface">
            <span className="material-symbols-outlined text-[120px]">psychology</span>
          </div>
        </div>
      </section>

      {/* Main Workspace Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Primary Action Card (Asymmetric Layout) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="glass-card rounded-xl overflow-hidden min-h-[400px] flex flex-col md:flex-row">
            <div className="md:w-1/2 p-8 flex flex-col justify-center bg-primary text-on-primary">
              <h3 className="font-h3 text-h3 mb-4 text-white">Launch AI Researcher</h3>
              <p className="text-body-md opacity-90 mb-8 leading-relaxed">
                Our intelligent assistant can scan your textbooks, summarize complex topics, and generate interactive quizzes in seconds.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setActiveTab('research')}
                  className="bg-surface text-primary px-5 py-2.5 rounded-lg font-button hover:bg-surface-container-low transition-colors"
                >
                  Start Research
                </button>
                <button
                  onClick={() => setActiveTab('research')}
                  className="border border-white/30 text-white px-5 py-2.5 rounded-lg font-button hover:bg-white/10 transition-colors"
                >
                  View Recent
                </button>
              </div>
            </div>
            <div className="md:w-1/2 relative bg-surface-container">
              <div className="absolute inset-0 p-8 flex items-center justify-center">
                <div className="w-full h-full rounded-lg bg-surface flex flex-col p-4 shadow-sm space-y-4 border border-outline-variant/30">
                  <div className="flex items-center gap-3 border-b border-outline-variant pb-3">
                    <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center">
                      <span className="material-symbols-outlined text-sm text-on-primary-container">smart_toy</span>
                    </div>
                    <div className="h-4 w-32 bg-surface-container-high rounded-full animate-pulse"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 w-full bg-surface-container-high rounded-full"></div>
                    <div className="h-3 w-4/5 bg-surface-container-high rounded-full"></div>
                    <div className="h-3 w-5/6 bg-surface-container-high rounded-full"></div>
                  </div>
                  <div className="flex gap-2">
                    <div className="h-12 w-full bg-surface-container rounded-lg border-2 border-dashed border-outline-variant flex items-center justify-center text-on-surface-variant">
                      <span className="material-symbols-outlined text-sm mr-2">upload_file</span>
                      <span className="text-body-sm">Drop PDF here</span>
                    </div>
                  </div>
                  {/* Animated Progress Simulation */}
                  <div className="pt-4 space-y-2">
                    <div className="flex justify-between items-center text-[10px] text-on-surface-variant font-bold uppercase">
                      <span>Processing Knowledge</span>
                      <span>72%</span>
                    </div>
                    <div className="h-1 w-full bg-surface-container-highest rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-[72%] transition-all duration-500 shadow-[0_0_8px_rgba(79,55,138,0.4)]"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-h3 text-h3 text-on-surface">Recent Activity</h4>
              <a className="text-primary font-button text-sm hover:underline" href="#" onClick={(e) => e.preventDefault()}>View All</a>
            </div>
            <div className="space-y-3">
              <div
                onClick={() => setActiveTab('flashcards')}
                className="glass-card p-4 rounded-xl flex items-center gap-4 hover:border-primary/30 transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined">description</span>
                </div>
                <div className="flex-grow">
                  <p className="font-bold text-on-surface">Physics: Thermodynamics Summary</p>
                  <p className="text-body-sm text-on-surface-variant">Generated 12 new flashcards</p>
                </div>
                <div className="text-right flex items-center gap-2">
                  <span className="text-body-sm font-medium text-on-surface whitespace-nowrap">2 hours ago</span>
                  <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">arrow_forward</span>
                </div>
              </div>

              <div
                onClick={() => setActiveTab('research')}
                className="glass-card p-4 rounded-xl flex items-center gap-4 hover:border-primary/30 transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-full bg-tertiary-container flex items-center justify-center text-tertiary">
                  <span className="material-symbols-outlined">menu_book</span>
                </div>
                <div className="flex-grow">
                  <p className="font-bold text-on-surface">World History: Industrial Revolution</p>
                  <p class="text-body-sm text-on-surface-variant">Research session completed</p>
                </div>
                <div className="text-right flex items-center gap-2">
                  <span className="text-body-sm font-medium text-on-surface whitespace-nowrap">Yesterday</span>
                  <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">arrow_forward</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Sidebar Widgets */}
        <div className="lg:col-span-4 space-y-6">
          {/* Daily Goal Widget */}
          <div className="glass-card p-6 rounded-xl space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-label-md text-on-surface uppercase">Daily Goal</h4>
              <span className="material-symbols-outlined text-primary">emoji_events</span>
            </div>
            <div className="flex items-center justify-center py-4">
              {/* Circular Progress Simulation */}
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle className="text-surface-container-highest" cx="64" cy="64" fill="transparent" r="56" stroke="currentColor" strokeWidth="8"></circle>
                  <circle className="text-primary" cx="64" cy="64" fill="transparent" r="56" stroke="currentColor" strokeDasharray="351.8" strokeDashoffset="87.9" strokeLinecap="round" strokeWidth="8"></circle>
                </svg>
                <div className="absolute text-center">
                  <span className="block text-h2 font-h2 text-on-surface">75%</span>
                  <span className="block text-[10px] text-on-surface-variant uppercase font-bold">Progress</span>
                </div>
              </div>
            </div>
            <p className="text-body-sm text-center text-on-surface-variant">Finish 15 more flashcards to hit today's study target!</p>
            <button className="w-full py-3 border border-outline-variant rounded-lg font-button text-on-surface hover:bg-surface-container-high transition-colors">
              Adjust Goal
            </button>
          </div>

          {/* Upcoming Quiz Widget */}
          <div className="glass-card p-6 rounded-xl space-y-4 bg-surface-container-low">
            <h4 className="font-label-md text-on-surface uppercase">Upcoming Quiz</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-white p-2 rounded shadow-sm">
                  <p className="text-primary font-bold text-lg leading-tight">14</p>
                  <p className="text-[10px] text-on-surface-variant font-bold uppercase">Oct</p>
                </div>
                <div>
                  <p className="font-bold text-on-surface">Biology Finals</p>
                  <p className="text-body-sm text-on-surface-variant">10:00 AM • Hall B</p>
                </div>
              </div>
              <div className="h-[1px] bg-outline-variant"></div>
              <div className="space-y-2">
                <div className="flex justify-between text-body-sm">
                  <span className="text-on-surface-variant">Readiness Score</span>
                  <span className="text-primary font-bold">Strong</span>
                </div>
                <div className="h-2 w-full bg-surface-container rounded-full">
                  <div className="h-full bg-primary w-[88%] rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
