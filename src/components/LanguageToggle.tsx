import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/context/LanguageContext';

export function LanguageToggle() {
    const { language, setLanguage } = useLanguage();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                    <Globe className="h-4 w-4" />
                    <span className="sr-only">Toggle language</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem
                    onClick={() => setLanguage('fr')}
                    className={language === 'fr' ? 'bg-accent' : ''}
                >
                    <span className="mr-2">🇫🇷</span>
                    Français
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => setLanguage('en')}
                    className={language === 'en' ? 'bg-accent' : ''}
                >
                    <span className="mr-2">🇬🇧</span>
                    English
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
