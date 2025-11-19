import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { track } from '@/lib/analytics';
import { X, Settings } from 'lucide-react';

export const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true, // Always true
    analytics: false,
    marketing: false
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    } else {
      const savedPreferences = JSON.parse(consent);
      setPreferences(savedPreferences);
      track('consent_updated', { analytics: savedPreferences.analytics || savedPreferences.marketing });
    }
  }, []);

  const handleAcceptAll = () => {
    const newPreferences = { essential: true, analytics: true, marketing: true };
    setPreferences(newPreferences);
    saveConsent(newPreferences);
  };

  const handleRejectAll = () => {
    const newPreferences = { essential: true, analytics: false, marketing: false };
    setPreferences(newPreferences);
    saveConsent(newPreferences);
  };

  const handleSavePreferences = () => {
    saveConsent(preferences);
  };

  const saveConsent = (prefs: typeof preferences) => {
    localStorage.setItem('cookie-consent', JSON.stringify(prefs));
    track('consent_updated', { analytics: prefs.analytics, marketing: prefs.marketing });
    setIsVisible(false);
    setShowSettings(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/95 backdrop-blur-sm border-t">
      <Card className="max-w-4xl mx-auto p-6">
        {!showSettings ? (
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <div className="flex-1">
              <h3 className="font-semibold mb-2">Gestion des cookies</h3>
              <p className="text-sm text-muted-foreground">
                Nous utilisons des cookies pour améliorer votre expérience et analyser notre trafic. 
                Vous pouvez choisir quels cookies accepter.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSettings(true)}
                className="text-xs"
              >
                <Settings className="w-3 h-3 mr-1" />
                Paramètres
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRejectAll}
                className="text-xs"
              >
                Refuser tout
              </Button>
              <Button
                size="sm"
                onClick={handleAcceptAll}
                className="text-xs bg-brand hover:bg-brand/90"
              >
                Accepter tout
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Paramètres des cookies</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSettings(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">Cookies essentiels</h4>
                  <p className="text-sm text-muted-foreground">
                    Nécessaires au fonctionnement du site
                  </p>
                </div>
                <div className="text-sm text-muted-foreground">Toujours actifs</div>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">Cookies analytiques</h4>
                  <p className="text-sm text-muted-foreground">
                    Google Analytics pour améliorer notre site
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) => setPreferences(prev => ({ ...prev, analytics: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">Cookies marketing</h4>
                  <p className="text-sm text-muted-foreground">
                    LinkedIn Insight Tag pour le reciblage
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={(e) => setPreferences(prev => ({ ...prev, marketing: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand"></div>
                </label>
              </div>
            </div>
            
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={handleRejectAll}>
                Refuser tout
              </Button>
              <Button onClick={handleSavePreferences} className="bg-brand hover:bg-brand/90">
                Enregistrer
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};