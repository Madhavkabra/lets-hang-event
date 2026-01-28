import { Plus } from 'lucide-react';

const chips = [
  'Capacity',
  'Photo gallery',
  'Links',
  'Show more',
];

const ActionChips = () => {
  return (
    <div className="flex flex-wrap gap-2">
      {chips.map((chip, index) => (
        <button
          key={index}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full font-sf-pro text-callout text-white hover:bg-white/20 transition-all"
        >
          {index < 3 && <Plus className="w-4 h-4" />}
          {chip}
        </button>
      ))}
    </div>
  );
};

export default ActionChips;

