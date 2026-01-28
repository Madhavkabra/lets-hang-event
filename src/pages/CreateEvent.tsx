import { Rocket } from 'lucide-react';
import PreviewCard from '../components/event/PreviewCard';
import ChangeBackgroundButton from '../components/event/ChangeBackgroundButton';
import PhoneInput from '../components/event/PhoneInput';
import DetailsGroup from '../components/event/DetailsGroup';
import ActionChips from '../components/event/ActionChips';
import CustomizeBanner from '../components/event/CustomizeBanner';
import Button from '../components/ui/Button';
import Textarea from '../components/ui/Textarea';

const CreateEvent = () => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="h-20 flex items-center px-[95px]">
        <h1 className="font-syne text-header-brand text-white text-center">let's hang</h1>
      </header>

      {/* Main Content */}
      <main className="px-[95px] pb-12">
        {/* Two Column Layout */}
        <div className="flex gap-12">
          {/* Left Column - 43% width */}
          <div className="w-[43%] flex-shrink-0 space-y-4">
            <PreviewCard />
            <ChangeBackgroundButton />
          </div>

          {/* Right Column - Remaining width */}
          <div className="flex-1 space-y-6">
            {/* Event Title Input */}
            <input
              type="text"
              placeholder="Name your event"
              className="w-full font-sf-pro text-event-title text-white placeholder:text-white/60 bg-transparent focus:outline-none"
            />

            {/* Phone Input */}
            <PhoneInput />

            {/* Details Group */}
            <DetailsGroup />

            {/* Description */}
            <Textarea
              placeholder="Describe your event"
              className="min-h-[120px]"
            />

            {/* Action Chips */}
            <ActionChips />

            {/* Customize Banner */}
            <CustomizeBanner />

            {/* Go Live Button */}
            <Button
              variant="glass"
              fullWidth
              size="lg"
              icon={Rocket}
              iconPosition="left"
              className="mt-8"
            >
              Go live
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateEvent;

