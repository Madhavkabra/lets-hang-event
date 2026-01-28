import { Edit } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface PreviewCardProps {
    previewImage: string | null;
    onEditClick: () => void;
}

const PreviewCard = ({ previewImage, onEditClick }: PreviewCardProps) => {
    return (
        <div className="space-y-4">
            <Card className="relative aspect-square overflow-hidden rounded-[24px]">
                {previewImage ? (
                    /* Uploaded image */
                    <img
                        src={previewImage}
                        alt="Preview"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                ) : (
                    <>
                        {/* Abstract gradient background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
                            {/* Abstract shapes */}
                            <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                            <div className="absolute bottom-20 left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
                        </div>

                        {/* Text overlay */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <h1 className="text-6xl md:text-7xl lg:text-8xl font-sf-pro font-black text-white text-center tracking-tighter leading-none">
                                YOU'RE
                                <br />
                                INVITED
                            </h1>
                        </div>
                    </>
                )}

                {/* Edit button - Size: Large, State: Enabled, Label Type: Symbol, Stroke: Off */}
                <Button
                    variant="material"
                    size="lg"
                    labelType="symbol"
                    stroke="off"
                    icon={Edit}
                    onClick={onEditClick}
                    className="absolute bottom-5 right-5"
                />
            </Card>
        </div>
    );
};

export default PreviewCard;

