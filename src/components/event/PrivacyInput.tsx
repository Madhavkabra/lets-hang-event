const PrivacyInput = () => {
    return (
        <div className="relative rounded-2xl" style={{ border: '1px solid rgba(255, 255, 255, 0.2)' }}>
            <div className="rounded-2xl bg-black/20 backdrop-blur-md p-4">
                <div className="flex items-start gap-2">
                    <textarea
                        placeholder="Privacy"
                        className="flex-1 bg-transparent text-white placeholder:text-white/60 focus:outline-none font-sf-pro text-body resize-none"
                        rows={2}
                    />
                </div>
            </div>
        </div>
    );
};

export default PrivacyInput;

