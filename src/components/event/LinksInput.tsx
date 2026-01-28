import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import Button from '../ui/Button';

const LinksInput = () => {
    const [links, setLinks] = useState(['']);
    const [invalidLinks, setInvalidLinks] = useState<Set<number>>(new Set());

    const validateURL = (url: string): boolean => {
        // Empty field is valid (not required)
        if (!url.trim()) {
            return true;
        }

        // URL validation regex - checks for http(s)://, www., or common TLDs
        const urlPattern = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/;
        
        return urlPattern.test(url);
    };

    const addLink = () => {
        setLinks([...links, '']);
    };

    const updateLink = (index: number, value: string) => {
        const newLinks = [...links];
        newLinks[index] = value;
        setLinks(newLinks);

        // Clear error when user starts typing
        if (invalidLinks.has(index)) {
            const newInvalidLinks = new Set(invalidLinks);
            newInvalidLinks.delete(index);
            setInvalidLinks(newInvalidLinks);
        }
    };

    const handleBlur = (index: number) => {
        const isValid = validateURL(links[index]);
        const newInvalidLinks = new Set(invalidLinks);
        
        if (!isValid) {
            newInvalidLinks.add(index);
        } else {
            newInvalidLinks.delete(index);
        }
        
        setInvalidLinks(newInvalidLinks);
    };

    const deleteLink = (index: number) => {
        if (links.length > 1) {
            const newLinks = links.filter((_, i) => i !== index);
            setLinks(newLinks);
            
            // Update invalid links indices
            const newInvalidLinks = new Set<number>();
            invalidLinks.forEach(invalidIndex => {
                if (invalidIndex < index) {
                    newInvalidLinks.add(invalidIndex);
                } else if (invalidIndex > index) {
                    newInvalidLinks.add(invalidIndex - 1);
                }
            });
            setInvalidLinks(newInvalidLinks);
        }
    };

    return (
        <div className="relative rounded-2xl" style={{ border: '1px solid rgba(255, 255, 255, 0.2)' }}>
            <div className="rounded-2xl bg-black/20 backdrop-blur-md p-4 space-y-3">
                {links.map((link, index) => {
                    const isInvalid = invalidLinks.has(index);
                    return (
                        <div key={index} className="space-y-1">
                            <div 
                                className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200"
                                style={{
                                    backgroundColor: isInvalid ? 'rgba(239, 68, 68, 0.1)' : 'transparent',
                                    border: isInvalid ? '1px solid rgba(239, 68, 68, 0.8)' : '1px solid transparent',
                                }}
                            >
                                <span className="shrink-0" style={{ fontSize: '16px', lineHeight: '16px' }}>🔗</span>
                                <input
                                    type="url"
                                    placeholder="Enter link"
                                    value={link}
                                    onChange={(e) => updateLink(index, e.target.value)}
                                    onBlur={() => handleBlur(index)}
                                    className="flex-1 bg-transparent text-white placeholder:text-white/60 focus:outline-none font-sf-pro text-callout"
                                />
                                {links.length > 1 && (
                                    <button
                                        onClick={() => deleteLink(index)}
                                        className="p-1 hover:bg-white/10 rounded transition-all"
                                    >
                                        <Trash2 className="w-4 h-4 text-white/60" />
                                    </button>
                                )}
                            </div>
                            {isInvalid && (
                                <p className="text-red-400 text-xs ml-3">Please enter a valid URL</p>
                            )}
                        </div>
                    );
                })}
                <Button
                    variant="ghost"
                    size="lg"
                    onClick={addLink}
                    className="w-full"
                >
                    + Add another link
                </Button>
            </div>
        </div>
    );
};

export default LinksInput;

