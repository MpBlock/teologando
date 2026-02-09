"use client";

import { useState } from "react";

type FilterOption = {
  id: string;
  label: string;
  checked: boolean;
};

type Props = {
  title?: string;
  options: FilterOption[];
  onChange: (selectedIds: string[]) => void;
};

export default function Filters({ title = "Filtros", options, onChange }: Props) {
  const [expanded, setExpanded] = useState(true);
  const [selected, setSelected] = useState<string[]>([]);

  const handleChange = (id: string, checked: boolean) => {
    const newSelected = checked 
      ? [...selected, id]
      : selected.filter(s => s !== id);
    
    setSelected(newSelected);
    onChange(newSelected);
  };

  return (
    <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-6 mb-8">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between w-full mb-4 font-semibold text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
      >
        <span>{title}</span>
        <svg 
          className={`w-5 h-5 transition-transform ${expanded ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </button>

      {expanded && (
        <div className="space-y-3">
          {options.map(option => (
            <label key={option.id} className="flex items-center cursor-pointer hover:bg-[var(--border)] p-2 rounded transition-colors">
              <input
                type="checkbox"
                checked={selected.includes(option.id)}
                onChange={(e) => handleChange(option.id, e.target.checked)}
                className="w-4 h-4 rounded border-[var(--border)] text-[var(--accent)] cursor-pointer"
              />
              <span className="ml-3 text-[var(--foreground)]">{option.label}</span>
            </label>
          ))}

          {selected.length > 0 && (
            <button
              onClick={() => {
                setSelected([]);
                onChange([]);
              }}
              className="w-full mt-4 text-sm px-3 py-2 text-[var(--accent)] hover:bg-[var(--border)] rounded transition-colors"
            >
              Limpar filtros
            </button>
          )}
        </div>
      )}
    </div>
  );
}
