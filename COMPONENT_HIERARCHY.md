# Component Hierarchy Visualization

## 🌳 Component Tree

```
App.jsx (Root)
│
├─ SettingsModal
│  ├─ IconButton (X close)
│  ├─ Input (API Key)
│  ├─ Select (Provider)
│  └─ Button (Save)
│
└─ MainLayout
   ├─ Header
   │  ├─ Logo (Wand2 icon + text)
   │  ├─ IconButton (Settings)
   │  └─ IconButton (Theme toggle)
   │
   ├─ MobileNav (mobile only)
   │  └─ NavButton × 5 (tools)
   │
   ├─ Sidebar (desktop only)
   │  ├─ NavButton × 5 (tools)
   │  └─ History Panel
   │
   ├─ Main Content Area
   │  ├─ Tool Header
   │  │  ├─ Title
   │  │  ├─ Description
   │  │  ├─ Button (Export)
   │  │  └─ IconButton (Clear)
   │  │
   │  └─ Active Builder (conditional)
   │     │
   │     ├─ VideoBuilder (Sora/Veo)
   │     │  ├─ SectionHeader
   │     │  ├─ TextArea (main prompt)
   │     │  ├─ EnhanceButton
   │     │  ├─ FormField (Duration)
   │     │  ├─ FormField (Aspect Ratio)
   │     │  └─ TagGroup × 6 (categories)
   │     │     └─ Tag × N (per group)
   │     │
   │     ├─ GrokBuilder
   │     │  ├─ SectionHeader
   │     │  ├─ TextArea (console style)
   │     │  ├─ EnhanceButton
   │     │  ├─ Badge × 3 (tone selectors)
   │     │  └─ Tag × N (helper badges)
   │     │
   │     └─ SDBuilder (ComfyUI/A1111)
   │        ├─ SectionHeader (Positive)
   │        │  ├─ EnhanceButton
   │        │  ├─ Button × 3 (weight tools)
   │        │  └─ TextArea
   │        │
   │        ├─ SectionHeader (Negative)
   │        │  ├─ EnhanceButton (auto-gen)
   │        │  └─ TextArea
   │        │
   │        ├─ A1111Params (if A1111)
   │        │  ├─ Select (Sampler)
   │        │  ├─ Input (Steps)
   │        │  ├─ Input (CFG)
   │        │  ├─ Input (Width)
   │        │  └─ Input (Height)
   │        │
   │        ├─ ComfyUI Workflow (if ComfyUI)
   │        │  ├─ Button (Add Node)
   │        │  └─ ComfyNode × N
   │        │     ├─ NodeHeader
   │        │     │  ├─ Badge (type indicator)
   │        │     │  └─ IconButton (remove)
   │        │     └─ FormField × N (dynamic)
   │        │
   │        └─ TagGroup × 6 (style categories)
   │           └─ Tag × N (per group)
   │
   └─ PromptFooter
      ├─ DragHandle (mobile)
      ├─ Label (Final Output)
      ├─ TextArea (read-only output)
      ├─ Button (Copy)
      └─ IconButton (Share)
```

---

## 🎨 Atomic Design Layers

### Layer 1: Atoms (9 components)

```
┌─────────────────────────────────────────────────────────────┐
│                         ATOMS                               │
├─────────────────────────────────────────────────────────────┤
│  Button  │  IconButton  │  Input  │  TextArea  │  Select   │
│  Badge   │  Tag         │  Label  │  FieldLabel             │
└─────────────────────────────────────────────────────────────┘
```

### Layer 2: Molecules (4 components)

```
┌─────────────────────────────────────────────────────────────┐
│                       MOLECULES                             │
├─────────────────────────────────────────────────────────────┤
│  SectionHeader = Icon + Label + Button (optional)          │
│  TagGroup = Label + Tag[] + AddButton                      │
│  EnhanceButton = Button + Icon + LoadingState              │
│  FormField = Label + (Input | TextArea | Select)           │
└─────────────────────────────────────────────────────────────┘
```

### Layer 3: Organisms (7 components)

```
┌─────────────────────────────────────────────────────────────┐
│                      ORGANISMS                              │
├─────────────────────────────────────────────────────────────┤
│  SettingsModal                                              │
│  ├─ Inputs, Buttons, Selects                                │
│  └─ State: provider, key, model                             │
│                                                              │
│  VideoBuilder (Sora/Veo)                                    │
│  ├─ TextArea, EnhanceButton, Selects, TagGroups            │
│  └─ State: prompt, modifiers, categories                    │
│                                                              │
│  GrokBuilder                                                │
│  ├─ TextArea, EnhanceButton, Badges, Tags                  │
│  └─ State: prompt, tone, helperBadges                       │
│                                                              │
│  SDBuilder                                                  │
│  ├─ TextAreas, EnhanceButtons, TagGroups                   │
│  ├─ ComfyNode (sub-component)                               │
│  ├─ A1111Params (sub-component)                             │
│  └─ State: prompts, nodes, params, categories               │
│                                                              │
│  Sidebar                                                    │
│  ├─ NavButtons, History list                                │
│  └─ Props: activeTool, history                              │
│                                                              │
│  MobileNav                                                  │
│  ├─ NavButtons (icon + label)                               │
│  └─ Props: activeTool                                       │
│                                                              │
│  PromptFooter                                               │
│  ├─ DragHandle, TextArea, Buttons                           │
│  └─ State: footerHeight, dragging refs                      │
└─────────────────────────────────────────────────────────────┘
```

### Layer 4: Templates (1 component)

```
┌─────────────────────────────────────────────────────────────┐
│                       TEMPLATE                              │
├─────────────────────────────────────────────────────────────┤
│  MainLayout                                                 │
│  ├─ Header (Logo + IconButtons)                             │
│  ├─ MobileNav                                                │
│  ├─ Sidebar                                                  │
│  ├─ Content Area (Tool Header + {children})                 │
│  └─ PromptFooter                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔄 Data Flow

```
┌──────────────────────────────────────────────────────────────┐
│                          App.jsx                             │
│  • useState: activeTool, darkMode, showSettings             │
│  • usePromptManager(): prompts, updatePrompt                │
│  • useDraggable(): footerHeight                             │
│  • useHistory(): history                                    │
└────────────────────┬─────────────────────────────────────────┘
                     │
                     ↓ props
┌──────────────────────────────────────────────────────────────┐
│                       MainLayout                             │
│  Receives: activeTool, history, handlers, footerHeight      │
└────────┬────────────────────────────┬────────────────────────┘
         │                            │
         ↓ props                      ↓ props
┌────────────────────┐      ┌─────────────────────────────────┐
│ Navigation         │      │ Active Builder (VideoBuilder,   │
│ (Sidebar/MobileNav)│      │  GrokBuilder, or SDBuilder)     │
│                    │      │                                 │
│ Receives:          │      │ Receives:                       │
│ • activeTool       │      │ • prompt                        │
│ • setActiveTool    │      │ • setPrompt                     │
│ • history          │      │ • modifiers/nodes/params        │
└────────────────────┘      │ • update handlers               │
                            └────────┬────────────────────────┘
                                     │
                                     ↓ props
                            ┌────────────────────────────────┐
                            │ Molecules & Atoms              │
                            │ • SectionHeader                │
                            │ • TagGroup → Tag               │
                            │ • EnhanceButton                │
                            │ • FormField → Input/Select     │
                            └────────────────────────────────┘
```

---

## 🎯 Component Relationships

### Parent-Child Relationships

```
App
└─ MainLayout
   ├─ Sidebar
   ├─ MobileNav
   ├─ VideoBuilder
   │  ├─ SectionHeader
   │  ├─ EnhanceButton
   │  ├─ TextArea
   │  ├─ Select
   │  └─ TagGroup
   │     └─ Tag
   ├─ GrokBuilder
   │  ├─ SectionHeader
   │  ├─ EnhanceButton
   │  ├─ TextArea
   │  └─ Badge
   ├─ SDBuilder
   │  ├─ SectionHeader
   │  ├─ EnhanceButton
   │  ├─ TextArea
   │  ├─ A1111Params
   │  │  ├─ Select
   │  │  └─ Input
   │  ├─ ComfyNode
   │  │  ├─ FieldLabel
   │  │  ├─ Input
   │  │  ├─ TextArea
   │  │  └─ Select
   │  └─ TagGroup
   │     └─ Tag
   └─ PromptFooter
      ├─ Label
      ├─ TextArea
      └─ Button
```

---

## 📦 Import Dependencies

### Component Dependencies

```
App.jsx
├── imports: MainLayout, SettingsModal, Builders
├── imports: usePromptManager, useDraggable, useHistory
└── imports: exportPromptToMarkdown, copyToClipboard

MainLayout
├── imports: Sidebar, MobileNav, PromptFooter
├── imports: IconButton (atom)
└── imports: NAV_ITEMS, TOOL_DESCRIPTIONS (constants)

VideoBuilder
├── imports: TextArea, Select (atoms)
├── imports: SectionHeader, TagGroup, EnhanceButton (molecules)
├── imports: VIDEO_CATEGORIES (constants)
└── imports: callAI (utils)

SDBuilder
├── imports: TextArea (atoms)
├── imports: SectionHeader, TagGroup, EnhanceButton (molecules)
├── imports: ComfyNode, A1111Params (sub-organisms)
├── imports: SD_CATEGORIES, NODE_TEMPLATES (constants)
└── imports: callAI (utils)
```

---

## 🎪 State Management

### Hook Usage Map

```
usePromptManager (App.jsx)
├─ Used by: App.jsx
└─ Manages: All tool prompts, modifiers, nodes, params

useDraggable (App.jsx)
├─ Used by: App.jsx → MainLayout → PromptFooter
└─ Manages: Footer height for mobile dragging

useHistory (App.jsx)
├─ Used by: App.jsx → MainLayout → Sidebar
└─ Manages: Prompt generation history

[Internal component state]
├─ SettingsModal: provider, key, model, saved
├─ VideoBuilder: isEnhancing, categories
├─ GrokBuilder: tone, isEnhancing, helperBadges
├─ SDBuilder: activeField, isEnhancing, showNodeMenu
└─ TagGroup: isOpen, isAdding, newTag
```

---

## 🔌 External Dependencies

### Utils Called by Components

```
callAI (from utils/aiApi.js)
├─ Called by: VideoBuilder, GrokBuilder, SDBuilder
└─ Purpose: AI prompt enhancement

exportPromptToMarkdown (from utils/exportHelper.js)
├─ Called by: App.jsx
└─ Purpose: Export functionality

copyToClipboard (from utils/exportHelper.js)
├─ Called by: App.jsx
└─ Purpose: Copy to clipboard
```

### Constants Used by Components

```
NAV_ITEMS (from constants/navItems.js)
├─ Used by: Sidebar, MobileNav, MainLayout
└─ Defines: Tool navigation items

NODE_TEMPLATES (from constants/nodeTemplates.js)
├─ Used by: SDBuilder, usePromptManager
└─ Defines: ComfyUI node structure

VIDEO_CATEGORIES (from constants/tagCategories.js)
├─ Used by: VideoBuilder
└─ Defines: Video enhancement tags

SD_CATEGORIES (from constants/tagCategories.js)
├─ Used by: SDBuilder
└─ Defines: SD style tags
```

---

**This hierarchy ensures:**
- ✅ Clear separation of concerns
- ✅ Unidirectional data flow
- ✅ Reusable atomic components
- ✅ Maintainable structure
- ✅ Easy testing at each level
