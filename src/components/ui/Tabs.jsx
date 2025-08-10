// src/components/ui/tabs.jsx
import React,{ useState } from "react";

export function Tabs({ children, defaultValue, onValueChange, className = '' }) {
  const [selected, setSelected] = useState(defaultValue);

  const handleChange = (value) => {
    setSelected(value);
    onValueChange?.(value);
  };

  // Split out triggers and content
  const triggers = [];
  const contents = [];

  children.forEach((child) => {
    if (child.type.displayName === 'TabsList') triggers.push(child);
    if (child.type.displayName === 'TabsContent') contents.push(child);
  });

  return (
    <div className={className}>
      {triggers.map(trigger =>
        React.cloneElement(trigger, { selected, onSelect: handleChange })
      )}
      {contents.map(content =>
        content.props.value === selected ? content : null
      )}
    </div>
  );
}

export function TabsList({ children, selected, onSelect, className = '' }) {
  return (
    <div className={`flex gap-2 ${className}`}>
      {children.map(child =>
        React.cloneElement(child, {
          selected,
          onSelect,
        })
      )}
    </div>
  );
}

export function TabsTrigger({ value, children, selected, onSelect }) {
  const isActive = selected === value;
  return (
    <button
      className={`flex-1 py-2 font-medium text-sm rounded-xl transition ${
        isActive
          ? "bg-sky-500 text-white"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
      onClick={() => onSelect(value)}
    >
      {children}
    </button>
  );
}

export function TabsContent({ children }) {
  return <div className="mt-4">{children}</div>;
}

TabsList.displayName = 'TabsList';
TabsTrigger.displayName = 'TabsTrigger';
TabsContent.displayName = 'TabsContent';
