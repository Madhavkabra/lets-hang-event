import { Edit } from 'lucide-react';
import Card from '../ui/Card';

const PreviewCard = () => {
  return (
    <div className="space-y-4">
      <Card className="relative aspect-square overflow-hidden">
        {/* Abstract gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
          {/* Abstract shapes */}
          <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute bottom-20 left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
        </div>

        {/* Text overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-sf-pro font-black text-white text-center tracking-tighter leading-none">
            YOU'RE
            <br />
            INVITED
          </h1>
        </div>

        {/* Edit button */}
        <button className="absolute bottom-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-lg hover:bg-white/30 transition-all">
          <Edit className="w-5 h-5 text-white" />
        </button>
      </Card>
    </div>
  );
};

export default PreviewCard;

