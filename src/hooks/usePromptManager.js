import { useState } from 'react';
import { NODE_TEMPLATES } from '../constants/nodeTemplates';

/**
 * usePromptManager Hook - Manages all prompt state
 * @returns {object} Prompt state and handlers
 */
export const usePromptManager = () => {
  const [prompts, setPrompts] = useState({
    sora: { main: '', modifiers: [] },
    veo: { main: '', modifiers: [] },
    grok: { main: '', tone: 'Standard' },
    comfy: {
      main: '',
      negative: '',
      modifiers: [],
      nodes: [
        {
          id: 1,
          templateKey: 'KSampler',
          title: 'KSampler',
          type: 'core',
          fields: JSON.parse(JSON.stringify(NODE_TEMPLATES.KSampler.fields))
        }
      ]
    },
    a1111: {
      main: '',
      negative: '',
      modifiers: [],
      params: {
        sampler: 'DPM++ 2M Karras',
        steps: 20,
        width: 512,
        height: 512,
        cfg: 7.0,
        seed: -1,
        batch_size: 1
      }
    },
  });

  const updatePrompt = (tool, field, value) => {
    setPrompts(prev => ({
      ...prev,
      [tool]: { ...prev[tool], [field]: value }
    }));
  };

  const clearPrompt = (tool) => {
    setPrompts(prev => ({
      ...prev,
      [tool]: {
        main: '',
        negative: '',
        modifiers: [],
        ...(tool === 'comfy' ? { nodes: [] } : {})
      }
    }));
  };

  const getCurrentPromptText = (activeTool) => {
    const p = prompts[activeTool];
    let text = p.main;
    if (p.modifiers && p.modifiers.length > 0) {
      const separator = (activeTool === 'sora' || activeTool === 'veo') ? '. ' : ', ';
      text += (text.endsWith('.') || text.endsWith(',') || text === '') ? ' ' : separator;
      text += p.modifiers.join(separator);
    }
    return text;
  };

  return {
    prompts,
    updatePrompt,
    clearPrompt,
    getCurrentPromptText
  };
};
