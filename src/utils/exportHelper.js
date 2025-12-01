/**
 * Export prompt data to markdown file
 * @param {string} activeTool - Current tool ID
 * @param {object} promptData - Prompt data for the tool
 * @param {string} finalPromptText - Combined final prompt text
 */
export const exportPromptToMarkdown = (activeTool, promptData, finalPromptText) => {
  let content = `# PromptCraft Export - ${activeTool.toUpperCase()}\n`;
  content += `Date: ${new Date().toLocaleString()}\n\n`;

  content += `## Main Prompt\n${finalPromptText}\n\n`;

  if (promptData.negative) {
    content += `## Negative Prompt\n${promptData.negative}\n\n`;
  }

  if (activeTool === 'a1111' && promptData.params) {
    content += `## Generation Parameters\n`;
    Object.entries(promptData.params).forEach(([key, value]) => {
      content += `- **${key}**: ${value}\n`;
    });
  }

  if (activeTool === 'comfy' && promptData.nodes) {
    content += `## ComfyUI Node Graph\n`;
    promptData.nodes.forEach((n, i) => {
      content += `\n### [${i + 1}] ${n.title} (${n.type})\n`;
      Object.entries(n.fields).forEach(([key, field]) => {
        content += `- **${field.label || key}**: ${field.value}\n`;
      });
    });
  }

  const blob = new Blob([content], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `promptcraft_${activeTool}_${Date.now()}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} - Success status
 */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (e) {
    console.error("Clipboard not available", e);
    return false;
  }
};
