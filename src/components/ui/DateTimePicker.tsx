import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Clock } from 'lucide-react';

interface DateTimePickerProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

const DateTimePicker = ({ value, onChange, placeholder = 'Date and time' }: DateTimePickerProps) => {
    // Initialize state from value prop
    const getInitialState = () => {
        if (value) {
            try {
                const date = new Date(value);
                if (!isNaN(date.getTime())) {
                    const hours = date.getHours();
                    const period = hours >= 12 ? 'PM' : 'AM';
                    const hour12 = hours % 12 || 12;
                    return {
                        date,
                        time: {
                            hour: hour12.toString().padStart(2, '0'),
                            minute: date.getMinutes().toString().padStart(2, '0'),
                            period,
                        }
                    };
                }
            } catch {
                // Invalid date string, ignore
            }
        }
        return {
            date: null,
            time: { hour: '12', minute: '00', period: 'PM' }
        };
    };

    const initialState = getInitialState();
    const [showPicker, setShowPicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(initialState.date);
    const [selectedTime, setSelectedTime] = useState(initialState.time);
    const [pickerPosition, setPickerPosition] = useState({ top: 0, left: 0, width: 0 });
    const containerRef = useRef<HTMLDivElement>(null);
    const pickerRef = useRef<HTMLDivElement>(null);

    // Update picker position
    const updatePickerPosition = () => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            setPickerPosition({
                top: rect.bottom + window.scrollY + 8,
                left: rect.left + window.scrollX,
                width: rect.width,
            });
        }
    };

    // Handle click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                pickerRef.current &&
                !pickerRef.current.contains(event.target as Node) &&
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setShowPicker(false);
            }
        };

        const handleScroll = () => {
            if (showPicker) {
                updatePickerPosition();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        window.addEventListener('scroll', handleScroll, true);
        window.addEventListener('resize', handleScroll);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('scroll', handleScroll, true);
            window.removeEventListener('resize', handleScroll);
        };
    }, [showPicker]);

    const handleInputFocus = () => {
        updatePickerPosition();
        setShowPicker(true);
    };

    // Generate calendar days
    const generateCalendar = () => {
        const now = new Date();
        const currentMonth = selectedDate || now;
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();

        const firstDay = new Date(year, month, 1);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());

        const days: Date[] = [];
        const current = new Date(startDate);

        for (let i = 0; i < 42; i++) {
            days.push(new Date(current));
            current.setDate(current.getDate() + 1);
        }

        return { days, currentMonth: new Date(year, month, 1) };
    };

    const { days, currentMonth } = generateCalendar();

    const handleDateClick = (date: Date) => {
        setSelectedDate(date);
    };

    const handleTimeChange = (type: 'hour' | 'minute' | 'period', value: string) => {
        setSelectedTime(prev => ({ ...prev, [type]: value }));
    };

    const handleConfirm = () => {
        if (selectedDate) {
            const date = new Date(selectedDate);
            let hour = parseInt(selectedTime.hour);
            if (selectedTime.period === 'PM' && hour !== 12) hour += 12;
            if (selectedTime.period === 'AM' && hour === 12) hour = 0;

            date.setHours(hour, parseInt(selectedTime.minute), 0, 0);

            const formattedDate = date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            });
            const formattedTime = `${selectedTime.hour}:${selectedTime.minute} ${selectedTime.period}`;

            onChange(`${formattedDate} at ${formattedTime}`);
            setShowPicker(false);
        }
    };

    const changeMonth = (delta: number) => {
        const newDate = new Date(currentMonth);
        newDate.setMonth(newDate.getMonth() + delta);
        setSelectedDate(newDate);
    };

    const handleMonthChange = (month: number) => {
        const newDate = new Date(currentMonth);
        newDate.setMonth(month);
        setSelectedDate(newDate);
    };

    const handleYearChange = (year: number) => {
        const newDate = new Date(currentMonth);
        newDate.setFullYear(year);
        setSelectedDate(newDate);
    };

    // Generate year range (current year - 1 to current year + 10)
    const currentYear = new Date().getFullYear();
    const yearRange = Array.from({ length: 12 }, (_, i) => currentYear - 1 + i);

    const isToday = (date: Date) => {
        const today = new Date();
        return date.toDateString() === today.toDateString();
    };

    const isSameMonth = (date: Date) => {
        return date.getMonth() === currentMonth.getMonth();
    };

    const isSelected = (date: Date) => {
        return selectedDate && date.toDateString() === selectedDate.toDateString();
    };

    return (
        <>
            <div ref={containerRef} className="flex items-center gap-3 px-4 h-[36px] cursor-pointer" onClick={handleInputFocus}>
                <span className="shrink-0" style={{ fontSize: '16px', lineHeight: '16px' }}>📅</span>
                <input
                    type="text"
                    placeholder={placeholder}
                    value={value}
                    readOnly
                    className="flex-1 bg-transparent text-white placeholder:text-white/60 focus:outline-none font-sf-pro text-callout cursor-pointer"
                />
            </div>

            {/* Date Time Picker - rendered as Portal */}
            {showPicker && createPortal(
                <div
                    ref={pickerRef}
                    className="bg-black/20 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl p-4"
                    style={{
                        position: 'fixed',
                        top: `${pickerPosition.top}px`,
                        left: `${pickerPosition.left}px`,
                        width: `${Math.max(pickerPosition.width, 320)}px`,
                        zIndex: 9999,
                    }}
                >
                    {/* Calendar Header */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                        <button
                            onClick={() => changeMonth(-1)}
                            className="p-2 hover:bg-white/10 rounded-lg transition-colors shrink-0"
                        >
                            <span className="text-white">←</span>
                        </button>
                        <div className="flex gap-2 flex-1">
                            <select
                                value={currentMonth.getMonth()}
                                onChange={(e) => handleMonthChange(parseInt(e.target.value))}
                                className="flex-1 bg-white/10 text-white rounded-lg px-2 py-1 font-sf-pro text-callout focus:outline-none focus:bg-white/20"
                            >
                                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, index) => (
                                    <option key={index} value={index} className="bg-black">
                                        {month}
                                    </option>
                                ))}
                            </select>
                            <select
                                value={currentMonth.getFullYear()}
                                onChange={(e) => handleYearChange(parseInt(e.target.value))}
                                className="bg-white/10 text-white rounded-lg px-2 py-1 font-sf-pro text-callout focus:outline-none focus:bg-white/20"
                            >
                                {yearRange.map(year => (
                                    <option key={year} value={year} className="bg-black">
                                        {year}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button
                            onClick={() => changeMonth(1)}
                            className="p-2 hover:bg-white/10 rounded-lg transition-colors shrink-0"
                        >
                            <span className="text-white">→</span>
                        </button>
                    </div>

                    {/* Day Labels */}
                    <div className="grid grid-cols-7 gap-1 mb-2">
                        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                            <div key={day} className="text-center text-white/60 font-sf-pro text-callout py-1">
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Calendar Days */}
                    <div className="grid grid-cols-7 gap-1 mb-4">
                        {days.map((date, index) => (
                            <button
                                key={index}
                                onClick={() => handleDateClick(date)}
                                className={`
                                    p-2 rounded-lg font-sf-pro text-callout transition-colors
                                    ${!isSameMonth(date) ? 'text-white/30' : 'text-white'}
                                    ${isSelected(date) ? 'bg-white/30' : 'hover:bg-white/10'}
                                    ${isToday(date) ? 'ring-1 ring-white/40' : ''}
                                `}
                            >
                                {date.getDate()}
                            </button>
                        ))}
                    </div>

                    {/* Time Picker */}
                    <div className="border-t border-white/20 pt-4 mb-4">
                        <div className="flex items-center gap-2 mb-2">
                            <Clock className="w-4 h-4 text-white/60" />
                            <span className="font-sf-pro text-callout text-white/60">Time</span>
                        </div>
                        <div className="flex items-center gap-2 justify-center">
                            <select
                                value={selectedTime.hour}
                                onChange={(e) => handleTimeChange('hour', e.target.value)}
                                className="bg-white/10 text-white rounded-lg px-3 py-2 font-sf-pro text-callout focus:outline-none focus:bg-white/20"
                            >
                                {Array.from({ length: 12 }, (_, i) => i + 1).map(h => (
                                    <option key={h} value={h.toString().padStart(2, '0')} className="bg-black">
                                        {h.toString().padStart(2, '0')}
                                    </option>
                                ))}
                            </select>
                            <span className="text-white">:</span>
                            <select
                                value={selectedTime.minute}
                                onChange={(e) => handleTimeChange('minute', e.target.value)}
                                className="bg-white/10 text-white rounded-lg px-3 py-2 font-sf-pro text-callout focus:outline-none focus:bg-white/20"
                            >
                                {Array.from({ length: 60 }, (_, i) => i).map(m => (
                                    <option key={m} value={m.toString().padStart(2, '0')} className="bg-black">
                                        {m.toString().padStart(2, '0')}
                                    </option>
                                ))}
                            </select>
                            <select
                                value={selectedTime.period}
                                onChange={(e) => handleTimeChange('period', e.target.value)}
                                className="bg-white/10 text-white rounded-lg px-3 py-2 font-sf-pro text-callout focus:outline-none focus:bg-white/20"
                            >
                                <option value="AM" className="bg-black">AM</option>
                                <option value="PM" className="bg-black">PM</option>
                            </select>
                        </div>
                    </div>

                    {/* Confirm Button */}
                    <button
                        onClick={handleConfirm}
                        disabled={!selectedDate}
                        className="w-full bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg py-2 font-sf-pro text-callout transition-colors"
                    >
                        Confirm
                    </button>
                </div>,
                document.body
            )}
        </>
    );
};

export default DateTimePicker;

