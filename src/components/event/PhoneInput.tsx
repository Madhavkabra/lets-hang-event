import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { ArrowRight } from 'lucide-react';
import { eventFormState } from '../../store/eventAtoms';
import { saveDraftAPI } from '../../api';
import Button from '../ui/Button';

const PhoneInput = () => {
    const [eventData, setEventData] = useRecoilState(eventFormState);
    const [isInvalid, setIsInvalid] = useState(false);

    const validatePhoneNumber = (phone: string): boolean => {
        // Empty field is considered valid (not required)
        if (!phone.trim()) {
            return true;
        }

        // Regex for international phone numbers
        // Accepts: +1234567890, (123) 456-7890, 123-456-7890, 123.456.7890, 1234567890
        const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/;
        return phoneRegex.test(phone.replace(/\s+/g, ''));
    };

    const handleBlur = () => {
        const isValid = validatePhoneNumber(eventData.phoneNumber);
        setIsInvalid(!isValid);
    };

    const handleChange = (value: string) => {
        setEventData(prev => ({ ...prev, phoneNumber: value }));
        // Clear error when user starts typing
        if (isInvalid) {
            setIsInvalid(false);
        }
    };

    const handleSaveDraft = async () => {
        // Validate before saving
        const isValid = validatePhoneNumber(eventData.phoneNumber);
        if (!isValid) {
            setIsInvalid(true);
            return;
        }
        
        try {
            const result = await saveDraftAPI(eventData);
            if (result.success) {
                alert(`Draft saved successfully! Draft ID: ${result.draftId}`);
            }
        } catch (error) {
            console.error('Failed to save draft:', error);
            alert('Failed to save draft. Please try again.');
        }
    };

    return (
        <div className="relative rounded-2xl">
            {/* Inner background */}
            <div
                className="relative flex items-center gap-2 p-4 min-h-[64px] rounded-2xl bg-black/20 backdrop-blur-md transition-all duration-200"
                style={{
                    border: isInvalid
                        ? '1px solid rgba(239, 68, 68, 0.8)'
                        : '1px solid rgba(255, 255, 255, 0.2)',
                    backgroundColor: isInvalid
                        ? 'rgba(239, 68, 68, 0.1)'
                        : 'rgba(0, 0, 0, 0.2)'
                }}
            >
                <span className="shrink-0" style={{ fontSize: '16px', lineHeight: '16px' }}>💾</span>
                <input
                    type="tel"
                    placeholder="Enter phone number to save the draft"
                    value={eventData.phoneNumber}
                    onChange={(e) => handleChange(e.target.value)}
                    onBlur={handleBlur}
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
            {isInvalid && (
                <p className="text-red-400 text-xs mt-1 ml-4">Please enter a valid phone number</p>
            )}
        </div>
    );
};

export default PhoneInput;

