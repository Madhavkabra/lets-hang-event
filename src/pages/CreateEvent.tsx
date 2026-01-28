import { useRef } from 'react';
import { useRecoilState } from 'recoil';
import { Rocket } from 'lucide-react';
import { eventFormState } from '../store/eventAtoms';
import PreviewCard from '../components/event/PreviewCard';
import ChangeBackgroundButton from '../components/event/ChangeBackgroundButton';
import PhoneInput from '../components/event/PhoneInput';
import DetailsGroup from '../components/event/DetailsGroup';
import ActionChips from '../components/event/ActionChips';
import CustomizeBanner from '../components/event/CustomizeBanner';
import Button from '../components/ui/Button';
import Textarea from '../components/ui/Textarea';

const CreateEvent = () => {
    const [eventData, setEventData] = useRecoilState(eventFormState);
    const previewInputRef = useRef<HTMLInputElement>(null);
    const backgroundInputRef = useRef<HTMLInputElement>(null);

    const handlePreviewImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEventData(prev => ({ ...prev, previewImage: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleBackgroundImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEventData(prev => ({ ...prev, backgroundImage: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (field: keyof typeof eventData, value: string) => {
        setEventData(prev => ({ ...prev, [field]: value }));
    };

    const triggerPreviewUpload = () => {
        previewInputRef.current?.click();
    };

    const triggerBackgroundUpload = () => {
        backgroundInputRef.current?.click();
    };

    const handleSubmit = async () => {
        // This function can be called to submit the data to your API
        console.log('Event Data to submit:', eventData);

        // Example API call structure:
        // try {
        //   const response = await fetch('/api/events', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(eventData),
        //   });
        //   const result = await response.json();
        //   console.log('Event created:', result);
        // } catch (error) {
        //   console.error('Error creating event:', error);
        // }
    };

    return (
        <div
            className="min-h-screen bg-cover bg-center bg-no-repeat"
            style={eventData.backgroundImage ? { backgroundImage: `url(${eventData.backgroundImage})` } : {}}
        >
            {/* Hidden file inputs */}
            <input
                ref={previewInputRef}
                type="file"
                accept="image/*"
                onChange={handlePreviewImageChange}
                className="hidden"
            />
            <input
                ref={backgroundInputRef}
                type="file"
                accept="image/*"
                onChange={handleBackgroundImageChange}
                className="hidden"
            />

            {/* Header */}
            <header className="h-20 flex items-center px-[95px]">
                <h1 className="font-syne text-header-brand text-white text-center">let's hang</h1>
            </header>

            {/* Main Content */}
            <main className="px-[95px] pb-12">
                {/* Two Column Layout */}
                <div className="flex gap-12">
                    {/* Left Column - 43% width, max 520px */}
                    <div className="w-[43%] max-w-[520px] flex-shrink-0 space-y-4">
                        <PreviewCard previewImage={eventData.previewImage} onEditClick={triggerPreviewUpload} />
                        <ChangeBackgroundButton onClick={triggerBackgroundUpload} />
                    </div>

                    {/* Right Column - Remaining width */}
                    <div className="flex-1 space-y-6">
                        {/* Event Title Input */}
                        <input
                            type="text"
                            placeholder="Name your event"
                            value={eventData.eventName}
                            onChange={(e) => handleInputChange('eventName', e.target.value)}
                            className="w-full font-sf-pro text-event-title text-white placeholder:text-white/60 bg-transparent focus:outline-none"
                        />

                        {/* Phone Input */}
                        <PhoneInput />

                        {/* Details Group */}
                        <DetailsGroup />

                        {/* Description */}
                        <Textarea
                            placeholder="Describe your event"
                            value={eventData.description}
                            onChange={(e) => handleInputChange('description', e.target.value)}
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
                            onClick={handleSubmit}
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

