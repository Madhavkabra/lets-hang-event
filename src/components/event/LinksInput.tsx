import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import Button from '../ui/Button';

const LinksInput = () => {
    const [links, setLinks] = useState(['']);

    const addLink = () => {
        setLinks([...links, '']);
    };

    const updateLink = (index: number, value: string) => {
        const newLinks = [...links];
        newLinks[index] = value;
        setLinks(newLinks);
    };

    const deleteLink = (index: number) => {
        if (links.length > 1) {
            const newLinks = links.filter((_, i) => i !== index);
            setLinks(newLinks);
        }
    };

    return (
        <div className="relative rounded-2xl" style={{ border: '1px solid rgba(255, 255, 255, 0.2)' }}>
            <div className="rounded-2xl bg-black/20 backdrop-blur-md p-4 space-y-3">
                {links.map((link, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <span className="flex-shrink-0" style={{ fontSize: '16px', lineHeight: '16px' }}>🔗</span>
                        <input
                            type="url"
                            placeholder="Enter link"
                            value={link}
                            onChange={(e) => updateLink(index, e.target.value)}
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
                ))}
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

