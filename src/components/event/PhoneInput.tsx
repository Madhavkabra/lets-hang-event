import { useRecoilState } from 'recoil';
import { ArrowRight } from 'lucide-react';
import { eventFormState } from '../../store/eventAtoms';
import Button from '../ui/Button';

const PhoneInput = () => {
    const [eventData, setEventData] = useRecoilState(eventFormState);

    const handleSaveDraft = () => {
        // Save draft logic - could save to localStorage or API
        console.log('Saving draft:', eventData);
    };

    return (
        <div className="relative rounded-2xl">
            {/* Inner background */}
            <div
                className="relative flex items-center gap-2 p-4 min-h-[64px] rounded-2xl bg-black/20 backdrop-blur-md"
                style={{ border: '1px solid rgba(255, 255, 255, 0.2)' }}
            >
                <span className="flex-shrink-0" style={{ fontSize: '16px', lineHeight: '16px' }}>💾</span>
                <input
                    type="tel"
                    placeholder="Enter phone number to save the draft"
                    value={eventData.phoneNumber}
                    onChange={(e) => setEventData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                    className="flex-1 bg-transparent text-white placeholder:text-white/60 focus:outline-none font-sf-pro text-callout"
                />
                <Button
                    size="sm"
                    labelType="symbol"
                    stroke={false}
                    icon={ArrowRight}
                    onClick={handleSaveDraft}
                    className="rounded-lg"
                />
            </div>
        </div>
    );
};

export default PhoneInput;

