const CapacityInput = () => {
    return (
        <div className="relative rounded-2xl" style={{ border: '1px solid rgba(255, 255, 255, 0.2)' }}>
            <div className="flex items-center gap-2 p-4 min-h-[64px] rounded-2xl bg-black/20 backdrop-blur-md">
                <span className="flex-shrink-0" style={{ fontSize: '16px', lineHeight: '16px' }}>👥</span>
                <input
                    type="number"
                    placeholder="Enter capacity"
                    className="flex-1 bg-transparent text-white placeholder:text-white/60 focus:outline-none font-sf-pro text-callout"
                    min="1"
                />
            </div>
        </div>
    );
};

export default CapacityInput;

