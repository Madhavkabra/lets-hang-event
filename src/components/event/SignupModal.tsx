import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import Button from '../ui/Button';

interface SignupModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SignupModal = ({ isOpen, onClose }: SignupModalProps) => {
    if (!isOpen) return null;

    const handleSignup = () => {
        // Handle signup logic
        console.log('User wants to sign up');
        // In production, this would redirect to signup/login page
        onClose();
    };

    return createPortal(
        <>
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[10002]"
                onClick={onClose}
            />
            <div
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[450px] bg-black/20 backdrop-blur-md rounded-3xl shadow-2xl z-[10003] overflow-hidden border border-white/20"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/20">
                    <h2 className="font-sf-pro text-title-1 text-white">Sign up to continue</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5 text-white/60" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    <div className="text-center mb-6">
                        <div className="w-20 h-20 mx-auto mb-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center">
                            <span className="text-4xl">🎉</span>
                        </div>
                        <h3 className="font-sf-pro text-title-2 text-white mb-2">
                            Unlock Premium Features
                        </h3>
                        <p className="font-sf-pro text-callout text-white/60">
                            Create an account to access all customization options and make your event unforgettable.
                        </p>
                    </div>

                    {/* Features List */}
                    <div className="space-y-3 mb-6">
                        {[
                            'Access to premium features',
                            'Unlimited customization options',
                            'Advanced event analytics',
                            'Priority support',
                        ].map((feature, index) => (
                            <div key={index} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
                                <div className="w-5 h-5 bg-green-500/20 border border-green-500/40 rounded-full flex items-center justify-center shrink-0">
                                    <span className="text-green-400 text-sm">✓</span>
                                </div>
                                <span className="font-sf-pro text-callout text-white/80">
                                    {feature}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="space-y-3">
                        <Button
                            variant="glass"
                            fullWidth
                            size="lg"
                            onClick={handleSignup}
                            className="bg-white/20 hover:bg-white/30"
                        >
                            Sign Up
                        </Button>
                        <Button
                            variant="glass"
                            fullWidth
                            size="lg"
                            onClick={onClose}
                            className="bg-white/5 hover:bg-white/10"
                        >
                            Maybe Later
                        </Button>
                    </div>
                </div>
            </div>
        </>,
        document.body
    );
};

export default SignupModal;

