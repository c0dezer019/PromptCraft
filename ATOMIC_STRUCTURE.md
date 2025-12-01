# PromptCraft - Atomic Design Structure

## 📐 Architecture Overview

This project follows **Atomic Design Principles** for maximum maintainability, reusability, and scalability.

## 🗂️ Directory Structure

```
src/
├── components/
│   ├── atoms/              # Smallest building blocks
│   │   ├── Button.jsx      # Button variants (primary, secondary, etc.)
│   │   ├── Input.jsx       # Input, TextArea, Select components
│   │   ├── Badge.jsx       # Badge and Tag components
│   │   ├── Label.jsx       # Label components
│   │   └── index.js        # Barrel export
│   │
│   ├── molecules/          # Combinations of atoms
│   │   ├── SectionHeader.jsx    # Section header with icon & actions
│   │   ├── TagGroup.jsx         # Collapsible tag group
│   │   ├── EnhanceButton.jsx    # AI enhance button with loading
│   │   ├── FormField.jsx        # Label + Input combination
│   │   └── index.js             # Barrel export
│   │
│   ├── organisms/          # Complex component assemblies
│   │   ├── SettingsModal.jsx    # AI settings configuration
│   │   ├── VideoBuilder.jsx     # Sora/Veo builder
│   │   ├── GrokBuilder.jsx      # Grok/Flux builder
│   │   ├── SDBuilder/
│   │   │   ├── index.jsx        # Main SD builder
│   │   │   ├── ComfyNode.jsx    # ComfyUI node component
│   │   │   └── A1111Params.jsx  # A1111 parameters
│   │   ├── Navigation/
│   │   │   ├── Sidebar.jsx      # Desktop navigation
│   │   │   ├── MobileNav.jsx    # Mobile navigation
│   │   │   └── index.js
│   │   ├── PromptFooter.jsx     # Draggable output footer
│   │   └── index.js             # Barrel export
│   │
│   └── templates/          # Page layouts
│       └── MainLayout.jsx       # Main app layout
│
├── constants/              # Static configuration
│   ├── nodeTemplates.js    # ComfyUI node templates
│   ├── samplers.js         # A1111 sampler list
│   ├── tagCategories.js    # Tag categories for builders
│   └── navItems.js         # Navigation configuration
│
├── utils/                  # Helper functions
│   ├── aiApi.js           # AI provider integration
│   └── exportHelper.js    # Export & clipboard utilities
│
├── hooks/                  # Custom React hooks
│   ├── usePromptManager.js # Prompt state management
│   ├── useDraggable.js    # Draggable footer logic
│   ├── useHistory.js      # History management
│   └── index.js           # Barrel export
│
└── App.jsx                # Main application entry

```

---

## 🧩 Component Hierarchy

### **Atoms** (Level 1)
The smallest, indivisible UI elements. Should have no dependencies on other components.

- **Button**: `<Button variant="primary" size="md">Click</Button>`
- **IconButton**: `<IconButton icon={Settings} onClick={...} />`
- **Input**: `<Input type="text" value={...} onChange={...} />`
- **TextArea**: `<TextArea rows={4} ... />`
- **Select**: `<Select options={[...]} ... />`
- **Badge**: `<Badge variant="primary">New</Badge>`
- **Tag**: `<Tag onClick={...}>Tag Name</Tag>`
- **Label**: `<Label>Field Name</Label>`
- **FieldLabel**: `<FieldLabel>Input Label</FieldLabel>`

### **Molecules** (Level 2)
Combinations of atoms that form functional UI patterns.

- **SectionHeader**: `<SectionHeader icon={Video} title="Prompt" extra={<Button ... />} />`
- **TagGroup**: `<TagGroup title="Styles" tags={[...]} onSelect={...} onAdd={...} />`
- **EnhanceButton**: `<EnhanceButton isEnhancing={false} onClick={...} variant="enhance" />`
- **FormField**: `<FormField label="Steps" type="number" value={...} />`

### **Organisms** (Level 3)
Complex, feature-rich components that combine molecules and atoms.

- **SettingsModal**: AI provider configuration modal
- **VideoBuilder**: Sora/Veo video prompt builder
- **GrokBuilder**: Grok/Flux image prompt builder
- **SDBuilder**: Stable Diffusion prompt builder (A1111/ComfyUI)
  - **ComfyNode**: Individual ComfyUI workflow node
  - **A1111Params**: A1111 generation parameters
- **Navigation**:
  - **Sidebar**: Desktop navigation
  - **MobileNav**: Mobile navigation bar
- **PromptFooter**: Draggable output footer

### **Templates** (Level 4)
Page-level layouts that compose organisms.

- **MainLayout**: Main application shell with header, nav, content area, and footer

---

## 🔧 Custom Hooks

### `usePromptManager()`
Manages all prompt state across different tools.

```jsx
const { prompts, updatePrompt, clearPrompt, getCurrentPromptText } = usePromptManager();
```

### `useDraggable(initialHeight)`
Manages draggable footer height for mobile.

```jsx
const { footerHeight, setFooterHeight } = useDraggable(85);
```

### `useHistory()`
Manages prompt history.

```jsx
const { history, addToHistory, clearHistory } = useHistory();
```

---

## 🛠️ Utilities

### AI API (`utils/aiApi.js`)
- `callAI(userQuery, systemInstruction)` - Universal AI API caller
- `loadAISettings()` - Load settings from localStorage
- `saveAISettings(settings)` - Save settings to localStorage

### Export Helper (`utils/exportHelper.js`)
- `exportPromptToMarkdown(activeTool, promptData, finalText)` - Export to .md file
- `copyToClipboard(text)` - Copy to clipboard

---

## 📦 Constants

### Node Templates (`constants/nodeTemplates.js`)
ComfyUI node definitions with fields and defaults.

### Samplers (`constants/samplers.js`)
A1111 sampler method list.

### Tag Categories (`constants/tagCategories.js`)
Predefined tag groups for video and SD builders.

### Navigation Items (`constants/navItems.js`)
Tool definitions and descriptions.

---

## 🎨 Design Principles

1. **Single Responsibility**: Each component has one clear purpose
2. **Reusability**: Atoms and molecules are tool-agnostic
3. **Composability**: Components compose cleanly without tight coupling
4. **Prop Drilling Minimization**: Use custom hooks for shared state
5. **Separation of Concerns**:
   - Components = UI rendering
   - Hooks = State logic
   - Utils = Pure functions
   - Constants = Configuration

---

## 🚀 Usage Examples

### Creating a New Tool Builder

1. **Create the builder organism** in `components/organisms/`
2. **Use existing atoms/molecules** for UI elements
3. **Add tool configuration** to `constants/navItems.js`
4. **Update App.jsx** to render the new builder
5. **Add initial state** to `usePromptManager` hook

### Adding a New UI Component

1. **Determine the level**: Atom, Molecule, or Organism?
2. **Create the component** in the appropriate directory
3. **Export from index.js** for easy importing
4. **Document props** with JSDoc comments
5. **Use existing atoms** as building blocks

---

## 📝 Naming Conventions

- **Components**: PascalCase (e.g., `VideoBuilder.jsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `usePromptManager.js`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `NODE_TEMPLATES`)
- **Utils**: camelCase (e.g., `callAI`, `exportPromptToMarkdown`)

---

## 🔄 Data Flow

```
App.jsx
  ↓ (state via hooks)
MainLayout
  ↓ (props)
Builder Organisms (VideoBuilder, GrokBuilder, SDBuilder)
  ↓ (props)
Molecules (SectionHeader, TagGroup, EnhanceButton)
  ↓ (props)
Atoms (Button, Input, TextArea, Badge)
```

---

## 🧪 Testing Strategy

- **Atoms**: Unit test individual behavior
- **Molecules**: Integration test composition
- **Organisms**: E2E test user workflows
- **Hooks**: Test state transitions
- **Utils**: Test pure function logic

---

## 📚 Further Reading

- [Atomic Design Methodology](https://atomicdesign.bradfrost.com/)
- [React Component Patterns](https://reactpatterns.com/)
- [Custom Hooks Best Practices](https://react.dev/learn/reusing-logic-with-custom-hooks)
