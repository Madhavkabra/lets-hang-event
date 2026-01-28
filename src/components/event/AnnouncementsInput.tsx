import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import Button from '../ui/Button';

const AnnouncementsInput = () => {
    const [announcements, setAnnouncements] = useState(['']);

    const addAnnouncement = () => {
        setAnnouncements([...announcements, '']);
    };

    const updateAnnouncement = (index: number, value: string) => {
        const newAnnouncements = [...announcements];
        newAnnouncements[index] = value;
        setAnnouncements(newAnnouncements);
    };

    const deleteAnnouncement = (index: number) => {
        if (announcements.length > 1) {
            const newAnnouncements = announcements.filter((_, i) => i !== index);
            setAnnouncements(newAnnouncements);
        }
    };

    return (
        <div className="relative rounded-2xl" style={{ border: '1px solid rgba(255, 255, 255, 0.2)' }}>
            <div className="rounded-2xl bg-black/20 backdrop-blur-md p-4 space-y-3">
                {announcements.map((announcement, index) => (
                    <div key={index} className="flex items-start gap-2">
                        <span className="flex-shrink-0 mt-1" style={{ fontSize: '16px', lineHeight: '16px' }}>📢</span>
                        <textarea
                            placeholder="Add announcement"
                            value={announcement}
                            onChange={(e) => updateAnnouncement(index, e.target.value)}
                            className="flex-1 bg-transparent text-white placeholder:text-white/60 focus:outline-none font-sf-pro text-body resize-none"
                            rows={2}
                        />
                        {announcements.length > 1 && (
                            <button
                                onClick={() => deleteAnnouncement(index)}
                                className="p-1 hover:bg-white/10 rounded transition-all mt-1"
                            >
                                <Trash2 className="w-4 h-4 text-white/60" />
                            </button>
                        )}
                    </div>
                ))}
                <Button
                    variant="ghost"
                    size="lg"
                    onClick={addAnnouncement}
                    className="w-full"
                >
                    + Add another announcement
                </Button>
            </div>
        </div>
    );
};

export default AnnouncementsInput;

