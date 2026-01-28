import { useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { eventFormState } from '../store/eventAtoms';
import { createEventAPI } from '../api';
import PreviewCard from '../components/event/PreviewCard';
import ChangeBackgroundButton from '../components/event/ChangeBackgroundButton';
import PhoneInput from '../components/event/PhoneInput';
import DetailsGroup from '../components/event/DetailsGroup';
import ActionChips from '../components/event/ActionChips';
import CustomizeBanner from '../components/event/CustomizeBanner';
import CapacityInput from '../components/event/CapacityInput';
import LinksInput from '../components/event/LinksInput';
import PhotoGalleryInput from '../components/event/PhotoGalleryInput';
import PrivacyInput from '../components/event/PrivacyInput';
import AnnouncementsInput from '../components/event/AnnouncementsInput';
import Button from '../components/ui/Button';
import Textarea from '../components/ui/Textarea';

const CreateEvent = () => {
    const [eventData, setEventData] = useRecoilState(eventFormState);
    const [activeFields, setActiveFields] = useState<string[]>([]);
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

    const handleChipClick = (chip: string) => {
        if (!activeFields.includes(chip)) {
            setActiveFields([...activeFields, chip]);
        }
    };

    const handleSubmit = async () => {
        try {
            const result = await createEventAPI(eventData);
            
            if (result.success) {
                alert(`🎉 Event published successfully!\n\nEvent ID: ${result.eventId}\nEvent URL: ${result.eventUrl}`);
                
                // Optionally reset form or redirect
                // setEventData(defaultEventData);
                // window.location.href = result.eventUrl;
            }
        } catch (error) {
            console.error('Failed to create event:', error);
            alert('Failed to publish event. Please try again.');
        }
    };

    return (
        <div
            className="min-h-screen bg-cover bg-center bg-no-repeat"
            style={eventData.backgroundImage
                ? { backgroundImage: `url(${eventData.backgroundImage})` }
                : { background: 'linear-gradient(180deg, #F1C2DB 0%, #46497C 100%)' }
            }
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
            <header className="h-20 px-[95px]">
                <div className="h-full flex items-center max-w-[1250px] mx-auto">
                    <h1 className="font-syne text-header-brand text-white text-center">let's hang</h1>
                </div>
            </header>

            {/* Main Content */}
            <main className="px-[95px] pb-12">
                {/* Two Column Layout */}
                <div className="flex gap-12 max-w-[1250px] mx-auto">
                    {/* Left Column - 43% width */}
                    <div className="w-[43%] shrink-0 space-y-4">
                        <PreviewCard previewImage={eventData.previewImage} onEditClick={triggerPreviewUpload} />
                        <ChangeBackgroundButton onClick={triggerBackgroundUpload} />
                    </div>

                    {/* Right Column - Remaining width */}
                    <div className="flex-1">
                        {/* Event Title Input */}
                        <input
                            type="text"
                            placeholder="Name your event"
                            value={eventData.eventName}
                            onChange={(e) => handleInputChange('eventName', e.target.value)}
                            className="w-full font-sf-pro text-event-title text-white placeholder:text-white/50 bg-transparent focus:outline-none mb-8"
                        />

                        {/* Phone Input */}
                        <div className="mb-6">
                            <PhoneInput />
                        </div>

                        {/* Details Group */}
                        <div className="mb-4">
                            <DetailsGroup />
                        </div>

                        {/* Description */}
                        <Textarea
                            placeholder="Describe your event"
                            value={eventData.description}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                            className="mb-4"
                        />

                        {/* Dynamic Fields */}
                        {activeFields.includes('Capacity') && (
                            <div className="mb-4">
                                <CapacityInput />
                            </div>
                        )}
                        {activeFields.includes('Links') && (
                            <div className="mb-4">
                                <LinksInput />
                            </div>
                        )}
                        {activeFields.includes('Photo gallery') && (
                            <div className="mb-4">
                                <PhotoGalleryInput />
                            </div>
                        )}
                        {activeFields.includes('Privacy') && (
                            <div className="mb-4">
                                <PrivacyInput />
                            </div>
                        )}
                        {activeFields.includes('Announcements') && (
                            <div className="mb-4">
                                <AnnouncementsInput />
                            </div>
                        )}

                        {/* Action Chips */}
                        <div className="mb-6">
                            <ActionChips onChipClick={handleChipClick} activeChips={activeFields} />
                        </div>

                        {/* Customize Banner */}
                        <CustomizeBanner />

                        {/* Go Live Button */}
                        <Button
                            variant="glass"
                            fullWidth
                            size="lg"
                            stroke={true}
                            emoji="🚀"
                            direction="vertical"
                            onClick={handleSubmit}
                            className="mt-8 font-sf-pro text-title-2-medium h-[71px]"
                            style={{ color: 'rgba(52, 199, 89, 1)' }}
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

