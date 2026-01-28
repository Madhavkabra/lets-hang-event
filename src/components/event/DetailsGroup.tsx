import { Calendar, MapPin, Banknote } from 'lucide-react';
import Card from '../ui/Card';

const DetailsGroup = () => {
  return (
    <Card variant="glass-dark" className="divide-y divide-white/10">
      {/* Date and time */}
      <div className="flex items-center gap-3 px-4 py-4">
        <Calendar className="w-5 h-5 text-white/80 flex-shrink-0" />
        <input
          type="text"
          placeholder="Date and time"
          className="flex-1 bg-transparent text-white placeholder:text-white/60 focus:outline-none"
        />
      </div>

      {/* Location */}
      <div className="flex items-center gap-3 px-4 py-4">
        <MapPin className="w-5 h-5 text-white/80 flex-shrink-0" />
        <input
          type="text"
          placeholder="Location"
          className="flex-1 bg-transparent text-white placeholder:text-white/60 focus:outline-none"
        />
      </div>

      {/* Cost per person */}
      <div className="flex items-center gap-3 px-4 py-4">
        <Banknote className="w-5 h-5 text-white/80 flex-shrink-0" />
        <input
          type="text"
          placeholder="Cost per person"
          className="flex-1 bg-transparent text-white placeholder:text-white/60 focus:outline-none"
        />
      </div>
    </Card>
  );
};

export default DetailsGroup;

