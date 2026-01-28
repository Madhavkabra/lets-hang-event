import { useRecoilState } from 'recoil';
import { eventFormState } from '../../store/eventAtoms';
import Card from '../ui/Card';
import DateTimePicker from '../ui/DateTimePicker';
import LocationInput from './LocationInput';

const DetailsGroup = () => {
    const [eventData, setEventData] = useRecoilState(eventFormState);

    const handleCostChange = (value: string) => {
        // Remove any non-numeric characters except decimal point
        const numericValue = value.replace(/[^0-9.]/g, '');

        // Ensure only one decimal point
        const parts = numericValue.split('.');
        const formattedValue = parts.length > 2
            ? parts[0] + '.' + parts.slice(1).join('')
            : numericValue;

        setEventData(prev => ({ ...prev, costPerPerson: formattedValue }));
    };

    // Format display value with $ sign
    const displayCost = eventData.costPerPerson ? `$ ${eventData.costPerPerson}` : '';

    return (
        <Card variant="glass-dark" className="py-[4px] overflow-visible" style={{ border: '1px solid rgba(255, 255, 255, 0.2)' }}>
            {/* Date and time */}
            <div className="mt-4">
                <DateTimePicker
                    value={eventData.dateTime}
                    onChange={(value) => setEventData(prev => ({ ...prev, dateTime: value }))}
                    placeholder="Date and time"
                />
            </div>

            {/* Separator */}
            <div className="h-px mx-4 my-4" style={{ background: 'rgba(255, 255, 255, 0.2)' }}></div>

            {/* Location */}
            <LocationInput />

            {/* Separator */}
            <div className="h-px mx-4 my-4" style={{ background: 'rgba(255, 255, 255, 0.2)' }}></div>

            {/* Cost per person */}
            <div className="flex items-center gap-3 px-4 h-[36px] mb-4">
                <span className="shrink-0" style={{ fontSize: '16px', lineHeight: '16px' }}>💵</span>
                <input
                    type="text"
                    inputMode="decimal"
                    placeholder="Cost per person"
                    value={displayCost}
                    onChange={(e) => handleCostChange(e.target.value)}
                    className="flex-1 bg-transparent text-white placeholder:text-white/60 focus:outline-none font-sf-pro text-callout"
                />
            </div>
        </Card>
    );
};

export default DetailsGroup;

