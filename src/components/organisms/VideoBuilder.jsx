import React, { useState } from 'react';
import { Video, Settings, Sparkles } from 'lucide-react';
import { TextArea, Select } from '../atoms';
import { SectionHeader, TagGroup, EnhanceButton } from '../molecules';
import { VIDEO_CATEGORIES } from '../../constants/tagCategories';
import { callAI } from '../../utils/aiApi';

/**
 * VideoBuilder Component - For Sora / Veo video generation
 * @param {string} type - 'sora' | 'veo'
 * @param {string} prompt - Main prompt text
 * @param {function} setPrompt - Prompt setter
 * @param {Array} modifiers - Modifier tags
 * @param {function} setModifiers - Modifiers setter
 */
export const VideoBuilder = ({ type, prompt, setPrompt, modifiers, setModifiers }) => {
  const isSora = type === 'sora';
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [categories, setCategories] = useState(VIDEO_CATEGORIES);

  const handleEnhance = async () => {
    if (!prompt) return;
    setIsEnhancing(true);
    const systemPrompt = isSora
      ? "You are an expert prompt engineer for OpenAI Sora. Take the user's concept and rewrite it into a highly detailed, physically accurate video description. Focus on lighting, camera movement, texture, and temporal consistency. Keep it under 100 words. Return ONLY the prompt."
      : "You are an expert prompt engineer for Google Veo. Rewrite the user's concept into a cinematic 1080p video description. Focus on composition, color grading, and smooth motion. Return ONLY the prompt.";

    const result = await callAI(prompt, systemPrompt);
    setPrompt(result);
    setIsEnhancing(false);
  };

  const addModifier = (tag) => {
    if (!modifiers.includes(tag)) setModifiers([...modifiers, tag]);
  };

  const handleAddTag = (category, newTag) => {
    setCategories(prev => ({
      ...prev,
      [category]: [...prev[category], newTag]
    }));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 relative">
            <SectionHeader
              icon={Video}
              title={`Main ${isSora ? 'Sora' : 'Veo'} Prompt`}
              extra={
                <EnhanceButton
                  isEnhancing={isEnhancing}
                  disabled={!prompt}
                  onClick={handleEnhance}
                  variant="enhance"
                  label="Enhance"
                />
              }
            />
            <TextArea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={`Describe the video in detail...`}
              rows={12}
            />
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <SectionHeader icon={Settings} title="Parameters" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase">Duration</label>
                <Select
                  className="mt-1"
                  options={['5 Seconds', '10 Seconds', '20 Seconds', '60 Seconds (Max)']}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase">Aspect Ratio</label>
                <Select
                  className="mt-1"
                  options={['16:9 (Widescreen)', '9:16 (Vertical)', '1:1 (Square)', '2.35:1 (Cinematic)']}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2 h-full overflow-y-auto pr-2 custom-scrollbar">
          <SectionHeader icon={Sparkles} title="Enhancers" />
          {Object.entries(categories).map(([key, tags]) => (
            <TagGroup
              key={key}
              title={key.charAt(0).toUpperCase() + key.slice(1)}
              tags={tags}
              onSelect={addModifier}
              onAdd={(newTag) => handleAddTag(key, newTag)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
