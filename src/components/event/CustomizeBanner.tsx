import { Megaphone, Link2, Dices } from 'lucide-react';
import Card from '../ui/Card';

const CustomizeBanner = () => {
  return (
    <Card
      variant="solid"
      className="relative py-12 px-6 overflow-hidden bg-gradient-to-br from-purple-900/90 to-purple-800/90"
    >
      {/* Floating decorative icons */}
      <div className="absolute top-4 left-8 opacity-30">
        <Megaphone className="w-8 h-8 text-white rotate-12" />
      </div>
      <div className="absolute top-6 right-12 opacity-30">
        <Link2 className="w-6 h-6 text-white -rotate-12" />
      </div>
      <div className="absolute bottom-6 right-8 opacity-30">
        <Dices className="w-7 h-7 text-white rotate-45" />
      </div>

      {/* Content */}
      <div className="relative text-center space-y-4">
        <p className="font-sf-pro text-title-1 text-white/90">
          Customize your event your way
        </p>
        <button className="px-6 py-2 bg-white/20 backdrop-blur-md rounded-lg font-inter text-button text-white hover:bg-white/30 transition-all">
          Customize
        </button>
      </div>
    </Card>
  );
};

export default CustomizeBanner;

