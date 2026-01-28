import { Edit } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import defaultPreviewImage from '../../assets/youAreInvite.png';

interface PreviewCardProps {
    previewImage: string | null;
    onEditClick: () => void;
}

const PreviewCard = ({ previewImage, onEditClick }: PreviewCardProps) => {
    return (
        <div className="space-y-4">
            <Card className="relative aspect-square overflow-hidden rounded-[24px]">
                {/* Default or uploaded image */}
                <img
                    src={previewImage || defaultPreviewImage}
                    alt="Preview"
                    className="absolute inset-0 w-full h-full object-cover"
                />

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

