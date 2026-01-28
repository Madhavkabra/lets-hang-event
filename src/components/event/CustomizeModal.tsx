import { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Search } from 'lucide-react';
import SignupModal from './SignupModal';

interface CustomizeOption {
    id: string;
    icon: string;
    title: string;
    description: string;
    isPaid: boolean;
    eventCount: string;
    likes: string;
}

const customizeOptions: CustomizeOption[] = [
    {
        id: 'questionnaires',
        icon: '📋',
        title: 'Questionnaires',
        description: 'Create questionnaires for your event. Hosts can create questions and view respon...',
        isPaid: false,
        eventCount: '446 events',
        likes: '406',
    },
    {
        id: 'new-section',
        icon: '📄',
        title: 'New section',
        description: 'Add a custom section to showcase anything you want on your event page.',
        isPaid: false,
        eventCount: '817 events',
        likes: '277',
    },
    {
        id: 'invite',
        icon: '✉️',
        title: 'Invite',
        description: 'Personally invite each and every guest within seconds',
        isPaid: true,
        eventCount: '340k events',
        likes: '150k',
    },
    {
        id: 'photo-gallery',
        icon: '🖼️',
        title: 'Photo Gallery',
        description: 'Add photos for guests to view and relive the vibe.',
        isPaid: false,
        eventCount: '342 events',
        likes: '302',
    },
    {
        id: 'links',
        icon: '🔗',
        title: 'Links',
        description: 'Share links to event guides, menus, playlists, and more.',
        isPaid: false,
        eventCount: '832 events',
        likes: '292',
    },
    {
        id: 'announcements',
        icon: '⚡',
        title: 'Announcements',
        description: 'Post updates & messages to keep your guests informed.',
        isPaid: false,
        eventCount: '686 events',
        likes: '146',
    },
];

interface CustomizeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CustomizeModal = ({ isOpen, onClose }: CustomizeModalProps) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showSignupModal, setShowSignupModal] = useState(false);

    if (!isOpen) return null;

    const filteredOptions = customizeOptions.filter(option =>
        option.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        option.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleAddOption = () => {
        setShowSignupModal(true);
    };

    return createPortal(
        <>
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[10000]"
                onClick={onClose}
            />
            <div
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] max-h-[90vh] bg-black/20 backdrop-blur-md rounded-3xl shadow-2xl z-[10001] overflow-hidden border border-white/20"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/20">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl">🎨</span>
                        <h2 className="font-sf-pro text-title-1 text-white">Customize</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5 text-white/60" />
                    </button>
                </div>

                {/* Search Bar */}
                <div className="p-6 pb-4">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
                        <input
                            type="text"
                            placeholder="Search for anything"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-md text-white placeholder:text-white/40 rounded-2xl border border-white/20 focus:outline-none focus:bg-white/15 focus:border-white/30 transition-all font-sf-pro text-body"
                        />
                    </div>
                </div>

                {/* Options List */}
                <div className="overflow-y-auto max-h-[calc(90vh-200px)] px-6 pb-6">
                    <div className="space-y-4">
                        {filteredOptions.map((option) => (
                            <div
                                key={option.id}
                                className="bg-white/5 hover:bg-white/10 rounded-2xl p-4 transition-all border border-white/10 hover:border-white/20 backdrop-blur-sm"
                            >
                                <div className="flex items-start gap-4">
                                    {/* Icon */}
                                    <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center shrink-0 border border-white/10">
                                        <span className="text-xl">{option.icon}</span>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-sf-pro text-title-2 text-white mb-1">
                                            {option.title}
                                        </h3>
                                        <p className="font-sf-pro text-callout text-white/60 mb-3 line-clamp-2">
                                            {option.description}
                                        </p>
                                        <div className="flex items-center gap-4 text-white/40 font-sf-pro text-callout">
                                            <span className={option.isPaid ? 'text-green-400' : ''}>
                                                {option.isPaid ? '$ Paid' : 'Free'}
                                            </span>
                                            <div className="flex items-center gap-1">
                                                <span>👥</span>
                                                <span>{option.eventCount}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <span>❤️</span>
                                                <span>{option.likes}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Add Button */}
                                    <button
                                        onClick={handleAddOption}
                                        className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center shrink-0 transition-all backdrop-blur-sm border border-white/10 hover:border-white/20"
                                    >
                                        <span className="text-white text-xl leading-none">+</span>
                                    </button>
                                </div>
                            </div>
                        ))}

                        {filteredOptions.length === 0 && (
                            <div className="text-center py-12 text-white/40 font-sf-pro text-body">
                                No options found
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Signup Modal */}
            <SignupModal
                isOpen={showSignupModal}
                onClose={() => setShowSignupModal(false)}
            />
        </>,
        document.body
    );
};

export default CustomizeModal;

