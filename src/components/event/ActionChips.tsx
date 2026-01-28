import { useState } from 'react';
import { Plus } from 'lucide-react';
import Button from '../ui/Button';

interface ActionChipsProps {
  onChipClick: (chip: string) => void;
  activeChips: string[];
}

const allChips = [
  'Capacity',
  'Photo gallery',
  'Links',
  'Privacy',
  'Announcements',
];

const ActionChips = ({ onChipClick, activeChips }: ActionChipsProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  
  // Filter out active chips
  const availableChips = allChips.filter(chip => !activeChips.includes(chip));
  
  // Show first 3 available chips
  const visibleChips = availableChips.slice(0, 3);
  const hiddenChips = availableChips.slice(3);

  return (
    <div className="relative">
      <div className="flex flex-wrap gap-2">
        {visibleChips.map((chip) => (
          <Button
            key={chip}
            size="lg"
            stroke={true}
            variant="glass"
            icon={Plus}
            iconPosition="left"
            onClick={() => onChipClick(chip)}
          >
            {chip}
          </Button>
        ))}
        
        {hiddenChips.length > 0 && (
          <div className="relative">
            <Button
              size="lg"
              variant="ghost"
              iconPosition="right"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              Show more
            </Button>
            
            {showDropdown && (
              <div className="absolute top-full left-0 mt-2 bg-black/20 backdrop-blur-md rounded-2xl p-2 space-y-1 z-10" style={{ border: '1px solid rgba(255, 255, 255, 0.2)' }}>
                {hiddenChips.map((chip) => (
                  <button
                    key={chip}
                    onClick={() => {
                      onChipClick(chip);
                      setShowDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 rounded-lg text-white hover:bg-white/10 transition-all font-sf-pro text-callout"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActionChips;

