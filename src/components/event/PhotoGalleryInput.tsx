import { useRecoilState } from 'recoil';
import { eventFormState } from '../../store/eventAtoms';

const PhotoGalleryInput = () => {
    const [eventData, setEventData] = useRecoilState(eventFormState);
    const images = eventData.photoGallery || [];

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const newImages: string[] = [];
            Array.from(files).forEach(file => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    newImages.push(reader.result as string);
                    if (newImages.length === files.length) {
                        setEventData(prev => ({ ...prev, photoGallery: [...images, ...newImages] }));
                    }
                };
                reader.readAsDataURL(file);
            });
        }
    };

    return (
        <div className="relative rounded-2xl" style={{ border: '1px solid rgba(255, 255, 255, 0.2)' }}>
            <div className="rounded-2xl bg-black/20 backdrop-blur-md p-4">
                <label className="flex flex-col items-center gap-3 cursor-pointer">
                    <span className="text-2xl">📷</span>
                    <span className="font-sf-pro text-callout text-white/60">Upload photos</span>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                    />
                </label>
                {images.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 mt-4">
                        {images.map((img, idx) => (
                            <img
                                key={idx}
                                src={img}
                                alt={`Upload ${idx + 1}`}
                                className="w-full h-20 object-cover rounded-lg"
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PhotoGalleryInput;

