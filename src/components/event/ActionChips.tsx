import { Plus } from 'lucide-react';
import Button from '../ui/Button';

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
        <Button
          key={index}
          size="lg"
          stroke={index < 3}
          variant={index === 3 ? 'ghost' : 'glass'}
          icon={index < 3 ? Plus : undefined}
          iconPosition="left"
        >
          {chip}
        </Button>
      ))}
    </div>
  );
};

export default ActionChips;

