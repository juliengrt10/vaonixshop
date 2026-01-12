import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            // Petit délai pour ne pas agresser l'utilisateur tout de suite
            const timer = setTimeout(() => setIsVisible(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie-consent', 'accepted');
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('cookie-consent', 'declined');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50"
                >
                    <div className="bg-white border border-border shadow-lg rounded-lg p-6 relative">
                        <button
                            onClick={() => setIsVisible(false)}
                            className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
                        >
                            <X className="h-4 w-4" />
                        </button>
                        <h3 className="font-semibold mb-2">🍪 Cookies & Confidentialité</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            Nous utilisons des cookies pour améliorer votre expérience et analyser notre trafic.
                            En continuant, vous acceptez notre utilisation des cookies.
                        </p>
                        <div className="flex gap-2 justify-end">
                            <Button variant="outline" size="sm" onClick={handleDecline}>
                                Refuser
                            </Button>
                            <Button size="sm" onClick={handleAccept}>
                                Accepter
                            </Button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
