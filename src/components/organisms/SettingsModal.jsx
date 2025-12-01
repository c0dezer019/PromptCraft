import React, { useState, useEffect } from 'react';
import { X, Settings, Globe, Shield, Server } from 'lucide-react';
import { Button } from '../atoms';
import { loadAISettings, saveAISettings } from '../../utils/aiApi';

/**
 * SettingsModal Component - AI Provider Configuration
 */
export const SettingsModal = ({ isOpen, onClose }) => {
  const [provider, setProvider] = useState('gemini');
  const [key, setKey] = useState('');
  const [model, setModel] = useState('');
  const [baseUrl, setBaseUrl] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const settings = loadAISettings();
      setProvider(settings.provider || 'gemini');
      setKey(settings.key || '');
      setModel(settings.model || '');
      setBaseUrl(settings.baseUrl || '');
    }
  }, [isOpen]);

  const handleSave = () => {
    saveAISettings({ provider, key, model, baseUrl });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-900 w-full max-w-lg rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <Settings size={20} className="text-gray-500" />
            Settings
          </h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          <div className="space-y-5">
            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg border border-indigo-100 dark:border-indigo-800">
              <p className="text-xs text-indigo-700 dark:text-indigo-300 leading-relaxed flex items-start gap-2">
                <Globe size={14} className="mt-0.5 flex-shrink-0" />
                <span>Configure your preferred AI engine to power features like Magic Enhance and Auto-Negative. API keys are stored locally in your browser.</span>
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Provider</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {['gemini', 'anthropic', 'openai'].map(p => (
                    <button
                      key={p}
                      onClick={() => setProvider(p)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium capitalize border transition-all ${
                        provider === p
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {p === 'openai' ? 'OpenAI / Compatible' : p}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">API Key</label>
                <div className="relative">
                  <input
                    type="password"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    placeholder={provider === 'gemini' ? "AIzaSy..." : "sk-..."}
                    className="w-full p-2.5 pl-3 bg-gray-50 dark:bg-black border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none font-mono text-sm"
                  />
                  <Shield className="absolute right-3 top-2.5 text-gray-400" size={16} />
                </div>
              </div>

              {provider === 'openai' && (
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Base URL (Optional)</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={baseUrl}
                      onChange={(e) => setBaseUrl(e.target.value)}
                      placeholder="https://api.openai.com/v1"
                      className="w-full p-2.5 pl-9 bg-gray-50 dark:bg-black border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none font-mono text-sm"
                    />
                    <Server className="absolute left-3 top-2.5 text-gray-400" size={16} />
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1">Use for DeepSeek, Mistral, Ollama, etc.</p>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Model Name (Optional)</label>
                <input
                  type="text"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  placeholder={
                    provider === 'gemini' ? "gemini-2.0-flash-exp" :
                    provider === 'anthropic' ? "claude-3-5-sonnet-20240620" :
                    "gpt-4o"
                  }
                  className="w-full p-2.5 bg-gray-50 dark:bg-black border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none font-mono text-sm"
                />
              </div>
            </div>

            <button
              onClick={handleSave}
              className={`w-full py-2.5 rounded-lg font-medium text-sm transition-all ${
                saved ? 'bg-green-500 text-white' : 'bg-gray-900 dark:bg-white text-white dark:text-black hover:opacity-90'
              }`}
            >
              {saved ? 'Settings Saved' : 'Save Configuration'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
