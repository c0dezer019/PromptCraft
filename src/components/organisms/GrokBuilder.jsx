import React, { useState } from 'react';
import { Terminal, Sparkles, Loader2, Plus, Check, X } from 'lucide-react';
import { TextArea } from '../atoms';
import { SectionHeader, EnhanceButton } from '../molecules';
import { GROK_HELPER_BADGES } from '../../constants/tagCategories';
import { callAI } from '../../utils/aiApi';

/**
 * GrokBuilder Component - For Grok / Flux image generation
 * @param {string} prompt - Main prompt text
 * @param {function} setPrompt - Prompt setter
 */
export const GrokBuilder = ({ prompt, setPrompt }) => {
  const [tone, setTone] = useState('Standard');
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [helperBadges, setHelperBadges] = useState(GROK_HELPER_BADGES);
  const [isAddingBadge, setIsAddingBadge] = useState(false);
  const [newBadge, setNewBadge] = useState('');

  const handleAddBadge = () => {
    if (newBadge.trim()) {
      setHelperBadges([...helperBadges, newBadge.trim()]);
      setNewBadge('');
      setIsAddingBadge(false);
    }
  };

  const handleEnhance = async () => {
    if (!prompt) return;
    setIsEnhancing(true);
    let instruction = "You are an expert prompt writer for Grok (Flux) image generation. Rewrite the user's prompt to be highly descriptive, using natural language. Focus on clarity and visual fidelity.";
    if (tone === 'Fun Mode') instruction = "You are an expert prompt writer for Grok. Rewrite the user's prompt to be witty, rebellious, and humorous, while still describing an image. Make it fun.";
    if (tone === 'Technical') instruction = "You are an expert prompt writer. Rewrite the prompt to be precise, technical, and code-oriented if applicable.";

    const result = await callAI(prompt, instruction + " Return ONLY the prompt text.");
    setPrompt(result);
    setIsEnhancing(false);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
            <SectionHeader icon={Terminal} title="Grok Prompt Console" />
            <div className="flex flex-wrap gap-2 items-center">
              <EnhanceButton
                isEnhancing={isEnhancing}
                disabled={!prompt}
                onClick={handleEnhance}
                variant="refine"
                label="Refine"
                className="mr-2"
              />
              <div className="hidden sm:block h-4 w-px bg-gray-300 dark:bg-gray-600 mx-1"></div>
              {['Standard', 'Fun Mode', 'Technical'].map((m) => (
                <button
                  key={m}
                  onClick={() => setTone(m)}
                  className={`px-3 py-1 text-xs rounded-full border transition-all ${
                    tone === m
                      ? 'bg-indigo-100 border-indigo-500 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200'
                      : 'border-gray-200 dark:border-gray-600 text-gray-500'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <TextArea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask Grok something or describe an image for Flux generation..."
            className="font-mono text-sm bg-gray-900 text-green-400 border border-gray-700"
            rows={16}
          />

          <div className="mt-4 flex flex-wrap gap-2 items-center">
            {helperBadges.map((badge, i) => (
              <button
                key={i}
                onClick={() => setPrompt(prompt + (prompt ? " " : "") + badge)}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                + {badge}
              </button>
            ))}

            {isAddingBadge ? (
              <div className="flex items-center gap-1 w-full sm:w-auto mt-2 sm:mt-0">
                <input
                  autoFocus
                  value={newBadge}
                  onChange={(e) => setNewBadge(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddBadge()}
                  className="flex-1 sm:flex-none text-xs px-2 py-1 w-full sm:w-24 rounded-full bg-gray-800 text-green-400 border border-gray-600 outline-none"
                  placeholder="New..."
                />
                <button onClick={handleAddBadge} className="text-green-500 hover:text-green-400">
                  <Check size={14} />
                </button>
                <button onClick={() => setIsAddingBadge(false)} className="text-gray-500 hover:text-gray-400">
                  <X size={14} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAddingBadge(true)}
                className="px-2 py-1 border border-dashed border-gray-400 dark:border-gray-600 text-gray-400 text-xs rounded-full hover:text-indigo-500 hover:border-indigo-500 transition-colors flex items-center gap-1"
              >
                <Plus size={10} /> Add
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
