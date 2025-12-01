import React, { useState, useEffect } from 'react';
import { MainLayout } from './components/templates/MainLayout';
import { SettingsModal, VideoBuilder, GrokBuilder, SDBuilder } from './components/organisms';
import { MidjourneyBuilder } from './components/organisms/MidjourneyBuilder';
import { usePromptManager, useDraggable, useHistory } from './hooks';
import { exportPromptToMarkdown, copyToClipboard } from './utils/exportHelper';

/**
 * Main PromptCraft Application
 */
export default function PromptCraft() {
  const [activeTool, setActiveTool] = useState('sora');
  const [darkMode, setDarkMode] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  // Custom Hooks
  const {
    prompts,
    updatePrompt,
    clearPrompt,
    getCurrentPromptText,
    deleteEnhancer,
    editEnhancer,
    syncEnhancerAcrossBuilders
  } = usePromptManager();
  const { footerHeight, setFooterHeight } = useDraggable(85);
  const { history, addToHistory } = useHistory();

  // Dark mode effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Handlers
  const handleCopy = async () => {
    const text = getCurrentPromptText(activeTool);
    const success = await copyToClipboard(text);
    if (success) {
      addToHistory(activeTool, text);
    }
  };

  const handleExport = () => {
    const text = getCurrentPromptText(activeTool);
    exportPromptToMarkdown(activeTool, prompts[activeTool], text);
  };

  const handleClear = () => {
    clearPrompt(activeTool);
  };

  // Get final prompt text
  const finalPromptText = getCurrentPromptText(activeTool);

  return (
    <>
      {/* Settings Modal */}
      <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />

      {/* Main Layout */}
      <MainLayout
        activeTool={activeTool}
        setActiveTool={setActiveTool}
        history={history}
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode(!darkMode)}
        openSettings={() => setShowSettings(true)}
        finalPromptText={finalPromptText}
        onCopy={handleCopy}
        onExport={handleExport}
        onClear={handleClear}
        footerHeight={footerHeight}
        setFooterHeight={setFooterHeight}
      >
        {/* Render appropriate builder based on active tool */}
        {activeTool === 'sora' && (
          <VideoBuilder
            type="sora"
            prompt={prompts.sora.main}
            setPrompt={(val) => updatePrompt('sora', 'main', val)}
            modifiers={prompts.sora.modifiers}
            setModifiers={(val) => updatePrompt('sora', 'modifiers', val)}
            deleteEnhancer={deleteEnhancer}
            editEnhancer={editEnhancer}
            syncEnhancer={syncEnhancerAcrossBuilders}
          />
        )}

        {activeTool === 'veo' && (
          <VideoBuilder
            type="veo"
            prompt={prompts.veo.main}
            setPrompt={(val) => updatePrompt('veo', 'main', val)}
            modifiers={prompts.veo.modifiers}
            setModifiers={(val) => updatePrompt('veo', 'modifiers', val)}
            deleteEnhancer={deleteEnhancer}
            editEnhancer={editEnhancer}
            syncEnhancer={syncEnhancerAcrossBuilders}
          />
        )}

        {activeTool === 'grok' && (
          <GrokBuilder
            prompt={prompts.grok.main}
            setPrompt={(val) => updatePrompt('grok', 'main', val)}
          />
        )}

        {activeTool === 'midjourney' && (
          <MidjourneyBuilder
            prompt={prompts.midjourney.main}
            setPrompt={(val) => updatePrompt('midjourney', 'main', val)}
            modifiers={prompts.midjourney.modifiers}
            setModifiers={(val) => updatePrompt('midjourney', 'modifiers', val)}
            deleteEnhancer={deleteEnhancer}
            editEnhancer={editEnhancer}
            syncEnhancer={syncEnhancerAcrossBuilders}
          />
        )}

        {(activeTool === 'comfy' || activeTool === 'a1111') && (
          <SDBuilder
            type={activeTool}
            prompt={prompts[activeTool].main}
            setPrompt={(val) => updatePrompt(activeTool, 'main', val)}
            negativePrompt={prompts[activeTool].negative}
            setNegativePrompt={(val) => updatePrompt(activeTool, 'negative', val)}
            modifiers={prompts[activeTool].modifiers}
            setModifiers={(val) => updatePrompt(activeTool, 'modifiers', val)}
            nodes={prompts[activeTool].nodes}
            setNodes={(val) => updatePrompt(activeTool, 'nodes', val)}
            params={prompts[activeTool].params}
            setParams={(val) => updatePrompt(activeTool, 'params', val)}
            deleteEnhancer={deleteEnhancer}
            editEnhancer={editEnhancer}
            syncEnhancer={syncEnhancerAcrossBuilders}
          />
        )}
      </MainLayout>
    </>
  );
}
