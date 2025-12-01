# Migration Guide: Monolithic → Atomic Structure

## Overview

Your original single-file component has been refactored into a maintainable atomic design structure.

## What Changed?

### Before (Single File)
```jsx
// All code in one 2000+ line file
import React from 'react';
const NODE_TEMPLATES = { ... }
const SettingsModal = () => { ... }
const VideoBuilder = () => { ... }
export default function PromptCraft() { ... }
```

### After (Atomic Structure)
```jsx
// Clean, modular imports
import { VideoBuilder, SDBuilder } from './components/organisms';
import { usePromptManager } from './hooks';
import { NODE_TEMPLATES } from './constants/nodeTemplates';
```

---

## File Mapping

### Constants
| Old Location | New Location |
|--------------|--------------|
| `NODE_TEMPLATES` constant | `src/constants/nodeTemplates.js` |
| `A1111_SAMPLERS` constant | `src/constants/samplers.js` |
| Category objects | `src/constants/tagCategories.js` |
| Nav items array | `src/constants/navItems.js` |

### Components
| Old Component | New Location |
|---------------|--------------|
| `SettingsModal` | `src/components/organisms/SettingsModal.jsx` |
| `SectionHeader` | `src/components/molecules/SectionHeader.jsx` |
| `TagGroup` | `src/components/molecules/TagGroup.jsx` |
| `VideoBuilder` | `src/components/organisms/VideoBuilder.jsx` |
| `GrokBuilder` | `src/components/organisms/GrokBuilder.jsx` |
| `SDBuilder` | `src/components/organisms/SDBuilder/index.jsx` |
| Sidebar nav | `src/components/organisms/Navigation/Sidebar.jsx` |
| Mobile nav | `src/components/organisms/Navigation/MobileNav.jsx` |
| Footer | `src/components/organisms/PromptFooter.jsx` |

### Utilities
| Old Function | New Location |
|--------------|--------------|
| `callAI()` | `src/utils/aiApi.js` |
| `exportPromptToMarkdown()` | `src/utils/exportHelper.js` |
| `copyToClipboard()` | `src/utils/exportHelper.js` |

### State Management
| Old State | New Location |
|-----------|--------------|
| `prompts` state | `src/hooks/usePromptManager.js` |
| Footer drag logic | `src/hooks/useDraggable.js` |
| History state | `src/hooks/useHistory.js` |

---

## How to Use the New Structure

### Import Components

```jsx
// Instead of having everything in one file:
import { Button, Input, TextArea } from './components/atoms';
import { SectionHeader, TagGroup } from './components/molecules';
import { VideoBuilder, SettingsModal } from './components/organisms';
```

### Import Utilities

```jsx
import { callAI, loadAISettings } from './utils/aiApi';
import { exportPromptToMarkdown } from './utils/exportHelper';
```

### Import Constants

```jsx
import { NODE_TEMPLATES } from './constants/nodeTemplates';
import { A1111_SAMPLERS } from './constants/samplers';
import { NAV_ITEMS } from './constants/navItems';
```

### Use Custom Hooks

```jsx
function MyComponent() {
  const { prompts, updatePrompt } = usePromptManager();
  const { history, addToHistory } = useHistory();
  const { footerHeight, setFooterHeight } = useDraggable();

  // ... component logic
}
```

---

## Benefits of the New Structure

### 🎯 Maintainability
- **Before**: Find code in 2000+ line file
- **After**: Navigate to specific component file

### 🔄 Reusability
- **Before**: Copy/paste code blocks
- **After**: Import and reuse components

### 🧪 Testability
- **Before**: Hard to test individual pieces
- **After**: Test atoms, molecules, organisms separately

### 👥 Collaboration
- **Before**: Merge conflicts on single file
- **After**: Work on different components simultaneously

### 📦 Bundle Size
- **Before**: Import everything at once
- **After**: Tree-shaking removes unused code

### 🔍 Debugging
- **Before**: Search through massive file
- **After**: Error points to specific component file

---

## Development Workflow

### Adding a New Feature

1. **Identify the level**: Is it an atom, molecule, or organism?
2. **Check existing components**: Can you reuse what's there?
3. **Create the component**: Follow naming conventions
4. **Export from index.js**: Add to barrel export
5. **Import and use**: Clean, simple imports

### Modifying Existing Components

1. **Locate the component**: Use file structure
2. **Check dependencies**: See what uses this component
3. **Make changes**: Modify the specific file
4. **Test**: Ensure no breaking changes

### Adding New Constants

1. Create/update file in `src/constants/`
2. Export the constant
3. Import where needed

---

## Common Tasks

### Creating a New Button Style

**File**: `src/components/atoms/Button.jsx`

```jsx
const variants = {
  primary: '...',
  secondary: '...',
  myNewStyle: 'bg-purple-500 text-white' // Add here
};
```

### Adding a New AI Provider

**File**: `src/utils/aiApi.js`

```jsx
case 'my-provider':
  // Add provider logic
  break;
```

### Creating a New Builder

1. Create `src/components/organisms/MyBuilder.jsx`
2. Use existing atoms/molecules
3. Add to `src/constants/navItems.js`
4. Import in `src/App.jsx`
5. Add conditional render in App

---

## Rollback Plan

If needed, the original file is preserved. However, the new structure provides:
- Better organization
- Easier debugging
- Improved performance
- Simplified testing

---

## Next Steps

1. ✅ Familiarize yourself with the directory structure
2. ✅ Read `ATOMIC_STRUCTURE.md` for detailed architecture
3. ✅ Start with atoms, understand the building blocks
4. ✅ Explore how molecules compose atoms
5. ✅ See how organisms use molecules
6. ✅ Review custom hooks for state management
7. ✅ Begin development with the new structure

---

## Support

Questions about the new structure? Check:
- `ATOMIC_STRUCTURE.md` - Detailed architecture
- Component JSDoc comments - Inline documentation
- File organization - Self-documenting structure
