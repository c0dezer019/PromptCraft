import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Plus, Check, X } from 'lucide-react';
import { Tag } from '../atoms';

/**
 * TagGroup Component - Collapsible group of tags
 * @param {string} title - Group title
 * @param {Array} tags - Array of tag strings
 * @param {function} onSelect - Handler when tag is selected
 * @param {function} onAdd - Handler to add new tag (optional)
 */
export const TagGroup = ({ title, tags, onSelect, onAdd }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [newTag, setNewTag] = useState('');

  const handleAddSubmit = () => {
    if (newTag.trim()) {
      onAdd(newTag.trim());
      setNewTag('');
      setIsAdding(false);
    }
  };

  return (
    <div className="mb-2 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
      >
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{title}</span>
        {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
      </button>

      {isOpen && (
        <div className="p-3 bg-gray-50 dark:bg-gray-900 flex flex-wrap gap-2">
          {tags.map((tag, idx) => (
            <Tag key={idx} onClick={() => onSelect(tag)}>
              {tag}
            </Tag>
          ))}

          {onAdd && (
            isAdding ? (
              <div className="flex items-center gap-1 animate-fadeIn w-full sm:w-auto">
                <input
                  autoFocus
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleAddSubmit();
                    if (e.key === 'Escape') setIsAdding(false);
                  }}
                  placeholder="New tag..."
                  className="flex-1 sm:flex-none text-xs px-2 py-1 w-full sm:w-24 bg-white dark:bg-gray-950 border border-indigo-500 rounded outline-none text-gray-800 dark:text-gray-200"
                />
                <button
                  onClick={handleAddSubmit}
                  className="p-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors"
                >
                  <Check size={10} />
                </button>
                <button
                  onClick={() => setIsAdding(false)}
                  className="p-1 bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  <X size={10} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAdding(true)}
                className="text-xs px-2 py-1 flex items-center gap-1 text-gray-400 border border-dashed border-gray-300 dark:border-gray-700 rounded hover:text-indigo-500 hover:border-indigo-300 transition-all"
              >
                <Plus size={10} /> Add
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
};
