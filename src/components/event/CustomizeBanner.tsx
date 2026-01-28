import { useState } from 'react';
import { Megaphone, Mic, Calculator, Link2, Image } from 'lucide-react';
import Button from '../ui/Button';
import CustomizeModal from './CustomizeModal';

const CustomizeBanner = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className="relative rounded-2xl p-[1px]">
                {/* Main content with original background */}
                <div className="rounded-2xl backdrop-blur-md bg-black/20 p-4 overflow-hidden flex flex-col items-center justify-center h-[242px]" style={{ border: '1px solid rgba(255, 255, 255, 0.2)' }}>
                    {/* Floating decorative icons */}
                    <div className='relative w-full flex h-[146px]'>
                        {/* Left side triangle - top to bottom */}
                        <div className="absolute top-8 left-18 opacity-30">
                            <Megaphone className="w-8 h-8 text-white rotate-12" />
                        </div>
                        <div className="absolute top-15 left-6 opacity-30">
                            <Mic className="w-7 h-7 text-white -rotate-6" />
                        </div>
                        <div className="absolute bottom-8 left-18 opacity-30">
                            <Calculator className="w-7 h-7 text-white rotate-6" />
                        </div>

                        {/* Right side triangle - top to bottom */}
                        <div className="absolute top-8 right-18 opacity-30">
                            <Link2 className="w-8 h-8 text-white -rotate-12" />
                        </div>
                        <div className="absolute top-15 right-6 opacity-30">
                            <Image className="w-7 h-7 text-white rotate-6" />
                        </div>
                        <div className="absolute bottom-8 right-18 opacity-30">
                            <span className="text-md font-bold text-white rotate-6">RSVP</span>
                        </div>

                        <div className="font-sf-pro text-title-1 text-white max-w-[186px] flex mx-auto items-center justify-center">
                            Customize your event your way
                        </div>
                    </div>

                    {/* Button */}
                    <div className="relative text-center space-y-4 w-full flex flex-col items-center">
                        <Button
                            variant="glass"
                            size="lg"
                            fullWidth
                            emoji="🎨"
                            onClick={() => setShowModal(true)}
                        >
                            Customize
                        </Button>
                    </div>
                </div>
            </div>

            {/* Customize Modal */}
            <CustomizeModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
            />
        </>
    );
};

export default CustomizeBanner;

