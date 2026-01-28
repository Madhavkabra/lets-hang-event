import { useState, useRef, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { MapPin } from 'lucide-react';
import { eventFormState } from '../../store/eventAtoms';
import { searchLocationsAPI, reverseGeocodeAPI } from '../../api';

const LocationInput = () => {
    const [eventData, setEventData] = useRecoilState(eventFormState);
    const [showDropdown, setShowDropdown] = useState(false);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [isLoadingLocation, setIsLoadingLocation] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Handle click outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                inputRef.current &&
                !inputRef.current.contains(event.target as Node)
            ) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleInputChange = async (value: string) => {
        setEventData(prev => ({ ...prev, location: value }));
        
        // Show suggestions if user is typing
        if (value.trim()) {
            try {
                const results = await searchLocationsAPI(value);
                setSuggestions(results);
                setShowDropdown(true);
            } catch (error) {
                console.error('Error searching locations:', error);
                setSuggestions([]);
            }
        } else {
            setSuggestions([]);
            setShowDropdown(false);
        }
    };

    const handleInputFocus = async () => {
        // Show "Use my location" option when focused
        if (!eventData.location.trim()) {
            setShowDropdown(true);
        } else {
            try {
                const results = await searchLocationsAPI(eventData.location);
                setSuggestions(results);
                setShowDropdown(true);
            } catch (error) {
                console.error('Error searching locations:', error);
                setShowDropdown(true);
            }
        }
    };

    const handleUseMyLocation = async () => {
        setIsLoadingLocation(true);
        
        try {
            if (!navigator.geolocation) {
                alert('Geolocation is not supported by your browser');
                setIsLoadingLocation(false);
                return;
            }

            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    try {
                        const { latitude, longitude } = position.coords;
                        
                        // Use reverse geocoding API
                        const locationString = await reverseGeocodeAPI(latitude, longitude);
                        
                        setEventData(prev => ({ ...prev, location: locationString }));
                        setShowDropdown(false);
                        setIsLoadingLocation(false);
                    } catch (error) {
                        console.error('Error reverse geocoding:', error);
                        alert('Unable to get location address. Please try again.');
                        setIsLoadingLocation(false);
                    }
                },
                (error) => {
                    console.error('Error getting location:', error);
                    alert('Unable to retrieve your location. Please check your browser permissions.');
                    setIsLoadingLocation(false);
                }
            );
        } catch (error) {
            console.error('Geolocation error:', error);
            setIsLoadingLocation(false);
        }
    };

    const handleSelectLocation = (location: string) => {
        setEventData(prev => ({ ...prev, location }));
        setShowDropdown(false);
        setSuggestions([]);
    };

    return (
        <div className="relative">
            <div className="flex items-center gap-3 px-4 h-[36px]">
                <span className="shrink-0" style={{ fontSize: '16px', lineHeight: '16px' }}>📍</span>
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Location"
                    value={eventData.location}
                    onChange={(e) => handleInputChange(e.target.value)}
                    onFocus={handleInputFocus}
                    className="flex-1 bg-transparent text-white placeholder:text-white/60 focus:outline-none font-sf-pro text-callout"
                />
            </div>

            {/* Dropdown */}
            {showDropdown && (
                <div
                    ref={dropdownRef}
                    className="absolute left-0 right-0 mt-2 mx-4 bg-black/90 backdrop-blur-md rounded-lg border border-white/20 max-h-[300px] overflow-y-auto z-50"
                >
                    {/* Use my location option */}
                    <button
                        onClick={handleUseMyLocation}
                        disabled={isLoadingLocation}
                        className="w-full flex items-center gap-3 px-4 py-3 text-left text-white hover:bg-white/10 transition-colors font-sf-pro text-callout border-b border-white/10"
                    >
                        <MapPin className="w-4 h-4 text-blue-400" />
                        <span className={isLoadingLocation ? 'opacity-50' : ''}>
                            {isLoadingLocation ? 'Getting your location...' : 'Use my location'}
                        </span>
                    </button>

                    {/* Location suggestions */}
                    {suggestions.length > 0 && (
                        <div>
                            {suggestions.map((location, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleSelectLocation(location)}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-left text-white hover:bg-white/10 transition-colors font-sf-pro text-callout"
                                >
                                    <MapPin className="w-4 h-4 text-white/40" />
                                    <span>{location}</span>
                                </button>
                            ))}
                        </div>
                    )}

                    {/* No results message */}
                    {eventData.location.trim() && suggestions.length === 0 && !isLoadingLocation && (
                        <div className="px-4 py-3 text-white/60 font-sf-pro text-callout">
                            No locations found
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default LocationInput;

