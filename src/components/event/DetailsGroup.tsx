import { useRecoilState } from 'recoil';
import { Calendar, MapPin, Banknote } from 'lucide-react';
import { eventFormState } from '../../store/eventAtoms';
import Card from '../ui/Card';

const DetailsGroup = () => {
    const [eventData, setEventData] = useRecoilState(eventFormState);

    return (
        <Card variant="glass-dark" className="py-[4px]" style={{ border: '1px solid rgba(255, 255, 255, 0.2)' }}>
            {/* Date and time */}
            <div className="flex items-center gap-3 px-4 h-[36px] mt-4">
                <span className="flex-shrink-0" style={{ fontSize: '16px', lineHeight: '16px' }}>📅</span>
                <input
                    type="text"
                    placeholder="Date and time"
                    value={eventData.dateTime}
                    onChange={(e) => setEventData(prev => ({ ...prev, dateTime: e.target.value }))}
                    className="flex-1 bg-transparent text-white placeholder:text-white/60 focus:outline-none font-sf-pro text-callout"
                />
            </div>

            {/* Separator */}
            <div className="h-[1px] mx-4 my-4" style={{ background: 'rgba(127, 127, 127, 0.2)' }}></div>

            {/* Location */}
            <div className="flex items-center gap-3 px-4 h-[36px]">
                <span className="flex-shrink-0" style={{ fontSize: '16px', lineHeight: '16px' }}>📍</span>
                <input
                    type="text"
                    placeholder="Location"
                    value={eventData.location}
                    onChange={(e) => setEventData(prev => ({ ...prev, location: e.target.value }))}
                    className="flex-1 bg-transparent text-white placeholder:text-white/60 focus:outline-none font-sf-pro text-callout"
                />
            </div>

            {/* Separator */}
            <div className="h-[1px] mx-4 my-4" style={{ background: 'rgba(127, 127, 127, 0.2)' }}></div>

            {/* Cost per person */}
            <div className="flex items-center gap-3 px-4 h-[36px] mb-4">
                <span className="flex-shrink-0" style={{ fontSize: '16px', lineHeight: '16px' }}>💵</span>
                <input
                    type="text"
                    placeholder="Cost per person"
                    value={eventData.costPerPerson}
                    onChange={(e) => setEventData(prev => ({ ...prev, costPerPerson: e.target.value }))}
                    className="flex-1 bg-transparent text-white placeholder:text-white/60 focus:outline-none font-sf-pro text-callout"
                />
            </div>
        </Card>
    );
};

export default DetailsGroup;

