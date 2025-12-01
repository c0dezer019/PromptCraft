# 🎨 PromptCraft

> **Professional AI Prompt Engineering Suite** - Built with Atomic Design Principles

A powerful, modular React application for crafting prompts across multiple AI platforms: Sora, Veo, Grok/Flux, and Stable Diffusion (ComfyUI & Automatic1111).

[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)
[![Atomic Design](https://img.shields.io/badge/Architecture-Atomic%20Design-green.svg)](https://atomicdesign.bradfrost.com/)
[![Deploy Status](https://github.com/c0dezer019/PromptCraft/actions/workflows/deploy.yml/badge.svg)](https://github.com/c0dezer019/PromptCraft/actions/workflows/deploy.yml)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

🚀 **[Live Demo →](https://c0dezer019.github.io/PromptCraft/)**

---

## ✨ Features

### 🎬 Multi-Platform Support
- **Sora** - OpenAI's video generation with physics simulation
- **Veo** - Google's cinematic 1080p+ video generation
- **Grok/Flux** - X.AI's witty assistant & Flux image generation
- **ComfyUI** - Node-based Stable Diffusion workflows
- **Automatic1111** - Classic tag-based SD prompting

### 🤖 AI Enhancement
- Multi-provider support (Gemini, OpenAI, Anthropic)
- Magic Enhance for prompts
- Auto-negative prompt generation
- Context-aware refinement

### 🎯 Professional Features
- Tag-based enhancement system
- Customizable tag categories
- Prompt history tracking
- Export to Markdown
- Dark/Light mode
- Mobile-responsive design
- Draggable output footer

---

## 🏗️ Architecture

This project follows **Atomic Design Methodology** for maximum maintainability:

```
🔹 Atoms       → Basic UI elements (Button, Input, Badge)
🔸 Molecules   → Composed patterns (SectionHeader, TagGroup)
🔶 Organisms   → Complex features (VideoBuilder, SDBuilder)
🔷 Templates   → Page layouts (MainLayout)
```

### Project Structure
```
src/
├── components/
│   ├── atoms/          # 9 basic UI components
│   ├── molecules/      # 4 composed patterns
│   ├── organisms/      # 7 complex features
│   └── templates/      # 1 main layout
├── constants/          # 4 configuration modules
├── utils/              # 2 helper modules
├── hooks/              # 3 custom hooks
└── App.jsx             # Clean, 80-line entry point
```

**📚 [Read Full Architecture Guide →](ATOMIC_STRUCTURE.md)**

---

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/promptcraft.git
cd promptcraft

# Install dependencies
npm install

# Start development server
npm start
```

### Usage

```jsx
// Import components
import { VideoBuilder, SDBuilder } from './components/organisms';
import { usePromptManager } from './hooks';

// Use in your app
function MyApp() {
  const { prompts, updatePrompt } = usePromptManager();

  return (
    <VideoBuilder
      prompt={prompts.sora.main}
      setPrompt={(val) => updatePrompt('sora', 'main', val)}
    />
  );
}
```

---

## 📖 Documentation

| Document | Description |
|----------|-------------|
| **[ATOMIC_STRUCTURE.md](ATOMIC_STRUCTURE.md)** | Complete architecture guide with component hierarchy |
| **[MIGRATION_GUIDE.md](MIGRATION_GUIDE.md)** | How to use the atomic structure |
| **[REFACTOR_SUMMARY.md](REFACTOR_SUMMARY.md)** | Overview of refactoring changes |
| **[DEPLOYMENT.md](DEPLOYMENT.md)** | GitHub Pages deployment guide |

---

## 🧩 Component Showcase

### Atoms (Basic Building Blocks)
```jsx
<Button variant="primary" size="md">Click Me</Button>
<Input type="text" placeholder="Enter prompt..." />
<Badge variant="success">New</Badge>
<Tag onClick={handleClick}>Style Tag</Tag>
```

### Molecules (Composed Patterns)
```jsx
<SectionHeader icon={Video} title="Main Prompt" />
<TagGroup title="Styles" tags={['Cinematic', '4K']} onSelect={...} />
<EnhanceButton isEnhancing={false} onClick={...} />
```

### Organisms (Complex Features)
```jsx
<VideoBuilder type="sora" prompt={...} modifiers={...} />
<SDBuilder type="comfy" prompt={...} nodes={...} />
<SettingsModal isOpen={true} onClose={...} />
```

---

## 🎣 Custom Hooks

### `usePromptManager()`
Centralized prompt state management across all tools.

```jsx
const {
  prompts,              // All prompt data
  updatePrompt,         // Update specific tool prompt
  clearPrompt,          // Clear tool prompt
  getCurrentPromptText  // Get combined output
} = usePromptManager();
```

### `useDraggable()`
Mobile-friendly draggable footer height.

```jsx
const { footerHeight, setFooterHeight } = useDraggable(85);
```

### `useHistory()`
Track prompt generation history.

```jsx
const { history, addToHistory, clearHistory } = useHistory();
```

---

## 🛠️ Utilities

### AI API Integration
```jsx
import { callAI, loadAISettings, saveAISettings } from './utils/aiApi';

// Call any AI provider
const result = await callAI(userPrompt, systemInstruction);
```

### Export & Clipboard
```jsx
import { exportPromptToMarkdown, copyToClipboard } from './utils/exportHelper';

// Export to .md file
exportPromptToMarkdown('sora', promptData, finalText);

// Copy to clipboard
await copyToClipboard(text);
```

---

## 🎨 Styling

Built with **Tailwind CSS** for:
- Responsive design (mobile-first)
- Dark/Light mode support
- Consistent design system
- Utility-first approach

---

## 📦 Build & Deploy

```bash
# Production build
npm run build

# Preview production build
npm run preview

# Deploy (configure your platform)
npm run deploy
```

---

## 🤝 Contributing

We follow atomic design principles. When contributing:

1. **Identify the level**: Atom, Molecule, or Organism?
2. **Reuse existing components**: Check atoms/molecules first
3. **Follow naming conventions**: PascalCase for components
4. **Document with JSDoc**: Add prop descriptions
5. **Export from index.js**: Add to barrel exports

---

## 📊 Project Stats

- **Total Files**: 33 organized modules
- **Components**: 20+ reusable components
- **Custom Hooks**: 3 state management hooks
- **Supported Platforms**: 5 AI tools
- **Lines of Code**: ~2000 (organized from single file!)
- **Bundle Size**: Optimized with tree-shaking

---

## 🗺️ Roadmap

- [ ] Add more AI providers (Midjourney, DALL-E)
- [ ] Prompt templates library
- [ ] Collaborative editing
- [ ] Cloud sync for prompts
- [ ] Browser extension
- [ ] API for third-party integrations

---

## 📝 License

MIT License - feel free to use in your projects!

---

## 🙏 Acknowledgments

- **Atomic Design** by Brad Frost
- **React** team for the amazing framework
- **Tailwind CSS** for utility-first styling
- **Lucide** for beautiful icons

---

**Built with ❤️ using Atomic Design Principles**

[Documentation](ATOMIC_STRUCTURE.md) • [Migration Guide](MIGRATION_GUIDE.md) • [Summary](REFACTOR_SUMMARY.md)
