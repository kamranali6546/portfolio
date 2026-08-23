import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { sound } from '../utils/audio';
import { 
  X, 
  Save, 
  Download, 
  Upload, 
  Sliders, 
  FolderPlus,
  Trash2,
  Sun,
  Moon,
  Palette
} from 'lucide-react';
import { ProjectItem, ProjectCategoryKey } from '../types/portfolio';

export const CustomizerModal: React.FC = () => {
  const { 
    isCustomizerOpen, 
    setIsCustomizerOpen, 
    profile, 
    updateProfile, 
    projects, 
    addProject, 
    deleteProject,
    exportPortfolioJson, 
    importPortfolioJson, 
    resetToDefault,
    themeMode,
    isDarkMode,
    setThemeMode,
    showToast 
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState<'profile' | 'projects' | 'theme' | 'backup'>('profile');

  // Form states
  const [formData, setFormData] = useState({ ...profile });
  const [newProject, setNewProject] = useState<Partial<ProjectItem>>({
    title: '',
    tagline: '',
    description: '',
    category: 'react_nextjs',
    tags: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    metrics: [{ label: 'Performance', value: '100 Lighthouse' }],
    architectureHighlights: ['Component-driven design system']
  });

  const [importJsonText, setImportJsonText] = useState<string>('');

  if (!isCustomizerOpen) return null;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playSuccess();
    updateProfile(formData);
    showToast('Profile configuration saved', 'success');
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title?.trim()) {
      showToast('Project title is required', 'warning');
      return;
    }

    const proj: ProjectItem = {
      id: `proj-${Date.now()}`,
      title: newProject.title,
      tagline: newProject.tagline || 'High-performance frontend architecture',
      description: newProject.description || 'Enterprise React & Next.js implementation.',
      category: (newProject.category as ProjectCategoryKey) || 'react_nextjs',
      tags: newProject.tags || ['React', 'TypeScript'],
      metrics: newProject.metrics || [{ label: 'Core Web Vitals', value: '100/100' }],
      architectureHighlights: newProject.architectureHighlights || ['Modular component tokens'],
      featured: true
    };

    addProject(proj);
    sound.playSuccess();
    setNewProject({
      title: '',
      tagline: '',
      description: '',
      category: 'react_nextjs',
      tags: ['React', 'TypeScript', 'Next.js'],
      metrics: [{ label: 'Scale', value: '100k' }],
      architectureHighlights: []
    });
  };

  const handleExport = () => {
    sound.playClick(800);
    const jsonStr = exportPortfolioJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kamran_portfolio_config_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Exported portfolio JSON configuration', 'success');
  };

  const handleImport = () => {
    if (!importJsonText.trim()) {
      showToast('Please paste valid JSON configuration', 'warning');
      return;
    }
    const ok = importPortfolioJson(importJsonText);
    if (ok) {
      setImportJsonText('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm select-none overflow-y-auto">
      <div className="w-full max-w-3xl rounded-2xl bg-neutral-900 border border-neutral-800 shadow-2xl overflow-hidden flex flex-col my-6 max-h-[88vh]">
        {/* Header */}
        <div className="p-4 border-b border-neutral-800 bg-neutral-950/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-indigo-400" />
            <h2 className="text-sm font-bold text-neutral-100">Live Portfolio Customizer & Data Hub</h2>
          </div>

          <button
            onClick={() => { sound.playClick(600); setIsCustomizerOpen(false); }}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-5 pt-4 bg-neutral-950/50 border-b border-neutral-800/80 text-xs font-medium">
          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-2.5 px-3 border-b-2 transition-all ${
              activeTab === 'profile'
                ? 'border-indigo-500 text-neutral-100 font-semibold'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Edit Profile Info
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`pb-2.5 px-3 border-b-2 transition-all ${
              activeTab === 'projects'
                ? 'border-indigo-500 text-neutral-100 font-semibold'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Manage Projects ({(projects || []).length})
          </button>

          <button
            onClick={() => setActiveTab('theme')}
            className={`pb-2.5 px-3 border-b-2 transition-all ${
              activeTab === 'theme'
                ? 'border-indigo-500 text-neutral-100 font-semibold'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Theme & Appearance
          </button>

          <button
            onClick={() => setActiveTab('backup')}
            className={`pb-2.5 px-3 border-b-2 transition-all ${
              activeTab === 'backup'
                ? 'border-indigo-500 text-neutral-100 font-semibold'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Export & JSON Backup
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-neutral-300 font-medium">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-neutral-950 text-neutral-200 p-2.5 rounded-xl border border-neutral-800 focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-neutral-300 font-medium">Professional Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-neutral-950 text-neutral-200 p-2.5 rounded-xl border border-neutral-800 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-neutral-300 font-medium">Headline & Mission</label>
                <input
                  type="text"
                  value={formData.headline}
                  onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                  className="w-full bg-neutral-950 text-neutral-200 p-2.5 rounded-xl border border-neutral-800 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-neutral-300 font-medium">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-neutral-950 text-neutral-200 p-2.5 rounded-xl border border-neutral-800 focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-neutral-300 font-medium">Phone</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-neutral-950 text-neutral-200 p-2.5 rounded-xl border border-neutral-800 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-neutral-300 font-medium">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-neutral-950 text-neutral-200 p-2.5 rounded-xl border border-neutral-800 focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-neutral-300 font-medium">Relocation Status</label>
                  <input
                    type="text"
                    value={formData.relocationStatus}
                    onChange={(e) => setFormData({ ...formData, relocationStatus: e.target.value })}
                    className="w-full bg-neutral-950 text-neutral-200 p-2.5 rounded-xl border border-neutral-800 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-neutral-300 font-medium">GitHub Profile URL</label>
                  <input
                    type="text"
                    value={formData.github}
                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                    className="w-full bg-neutral-950 text-neutral-200 p-2.5 rounded-xl border border-neutral-800 focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-neutral-300 font-medium">LinkedIn Profile URL</label>
                  <input
                    type="text"
                    value={formData.linkedin}
                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                    className="w-full bg-neutral-950 text-neutral-200 p-2.5 rounded-xl border border-neutral-800 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold flex items-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Profile Changes</span>
              </button>
            </form>
          )}

          {activeTab === 'projects' && (
            <div className="space-y-6">
              {/* Existing Projects List */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-neutral-200 uppercase tracking-wider">Current Projects</h3>
                <div className="space-y-2">
                  {(projects || []).map(proj => (
                    <div key={proj.id} className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between gap-4">
                      <div>
                        <h4 className="text-xs font-bold text-neutral-200">{proj.title}</h4>
                        <p className="text-[11px] text-neutral-400">{proj.tagline}</p>
                      </div>

                      <button
                        onClick={() => deleteProject(proj.id)}
                        className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-950/50 transition-colors"
                        title="Delete project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add New Project Form */}
              <form onSubmit={handleAddProject} className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3 text-xs">
                <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                  <FolderPlus className="w-4 h-4" />
                  <span>Add New Frontend Project</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Project Title"
                    value={newProject.title || ''}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    className="bg-neutral-900 text-neutral-200 p-2 rounded-lg border border-neutral-800"
                  />

                  <select
                    value={newProject.category || 'react_nextjs'}
                    onChange={(e) => setNewProject({ ...newProject, category: e.target.value as any })}
                    className="bg-neutral-900 text-neutral-200 p-2 rounded-lg border border-neutral-800"
                  >
                    <option value="design_systems">Design Systems</option>
                    <option value="ai_augmented">AI-Augmented UI</option>
                    <option value="react_nextjs">React & Next.js</option>
                    <option value="frontend_arch">Frontend Architecture</option>
                  </select>
                </div>

                <input
                  type="text"
                  placeholder="Short Tagline"
                  value={newProject.tagline || ''}
                  onChange={(e) => setNewProject({ ...newProject, tagline: e.target.value })}
                  className="w-full bg-neutral-900 text-neutral-200 p-2 rounded-lg border border-neutral-800"
                />

                <textarea
                  rows={2}
                  placeholder="System description..."
                  value={newProject.description || ''}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  className="w-full bg-neutral-900 text-neutral-200 p-2 rounded-lg border border-neutral-800 resize-none"
                />

                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <FolderPlus className="w-4 h-4" />
                  <span>Create Project</span>
                </button>
              </form>
            </div>
          )}

          {activeTab === 'theme' && (
            <div className="space-y-6 text-xs">
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-4">
                <div className="flex items-center gap-2 text-indigo-400 font-bold uppercase tracking-wider">
                  <Palette className="w-4 h-4" />
                  <span>Display Color Mode</span>
                </div>
                <p className="text-neutral-400">
                  Select your preferred color scheme. The interactive particle physics and contrast curves adapt dynamically.
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setThemeMode('dark')}
                    className={`p-4 rounded-2xl border flex flex-col items-center gap-3 transition-all cursor-pointer ${
                      isDarkMode 
                        ? 'bg-indigo-950/60 border-indigo-500 text-neutral-100 ring-2 ring-indigo-500/40' 
                        : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-neutral-950 border border-neutral-700 flex items-center justify-center text-amber-400 shadow-md">
                      <Moon className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-neutral-100">Cyber Dark</div>
                      <div className="text-[10px] text-neutral-400 mt-0.5">Deep space cyberpunk palette</div>
                    </div>
                    {isDarkMode && <span className="text-[10px] font-mono text-emerald-400">Active</span>}
                  </button>

                  <button
                    onClick={() => setThemeMode('light')}
                    className={`p-4 rounded-2xl border flex flex-col items-center gap-3 transition-all cursor-pointer ${
                      !isDarkMode 
                        ? 'bg-indigo-950/60 border-indigo-500 text-neutral-100 ring-2 ring-indigo-500/40' 
                        : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-neutral-100 border border-neutral-300 flex items-center justify-center text-amber-500 shadow-md">
                      <Sun className="w-5 h-5 text-amber-500" />
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-neutral-100">Crystal Light</div>
                      <div className="text-[10px] text-neutral-400 mt-0.5">Crisp modern high-contrast aesthetic</div>
                    </div>
                    {!isDarkMode && <span className="text-[10px] font-mono text-emerald-400">Active</span>}
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'backup' && (
            <div className="space-y-5 text-xs">
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
                <h3 className="text-xs font-bold text-neutral-200 uppercase tracking-wider">Export Portfolio Snapshot</h3>
                <p className="text-neutral-400">
                  Download a complete JSON file containing all customized profile data, projects, skills, and configuration.
                </p>
                <button
                  onClick={handleExport}
                  className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-semibold flex items-center gap-2"
                >
                  <Download className="w-4 h-4 text-indigo-400" />
                  <span>Download Backup JSON</span>
                </button>
              </div>

              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
                <h3 className="text-xs font-bold text-neutral-200 uppercase tracking-wider">Import Portfolio JSON</h3>
                <textarea
                  rows={4}
                  value={importJsonText}
                  onChange={(e) => setImportJsonText(e.target.value)}
                  placeholder="Paste exported portfolio JSON structure here..."
                  className="w-full bg-neutral-900 text-neutral-200 p-3 rounded-lg border border-neutral-800 font-mono text-[11px]"
                />
                <button
                  onClick={handleImport}
                  className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold flex items-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  <span>Import & Apply</span>
                </button>
              </div>

              <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/50 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-rose-300">Reset to Default Data</h4>
                  <p className="text-[11px] text-rose-400/80">Clear local modifications and restore original portfolio content.</p>
                </div>
                <button
                  onClick={resetToDefault}
                  className="px-3 py-1.5 rounded-lg bg-rose-900/60 hover:bg-rose-800 text-rose-200 font-medium transition-colors cursor-pointer"
                >
                  Reset All
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
