import { Save, ArrowRight } from 'lucide-react';
import Card from '../ui/Card';

const PhoneInput = () => {
  return (
    <Card variant="glass-dark" className="flex items-center gap-3 px-4 py-3">
      <Save className="w-5 h-5 text-white/80 flex-shrink-0" />
      <input
        type="tel"
        placeholder="Enter phone number to save the draft"
        className="flex-1 bg-transparent text-white placeholder:text-white/60 focus:outline-none"
      />
      <button className="p-2 hover:bg-white/10 rounded-lg transition-all">
        <ArrowRight className="w-5 h-5 text-white" />
      </button>
    </Card>
  );
};

export default PhoneInput;

