import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useShopifyProducts } from '@/hooks/useShopifyProducts';
import { mapShopifyToUnified } from '@/lib/productMapper';
import { formatPrice } from '@/lib/utils';
import { useDebounce } from '@/hooks/useDebounce'; // Assuming this exists or I'll implement it inside

export function ProductSearch() {
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const containerRef = useRef<HTMLDivElement>(null);

    // Debounce query to avoid too many requests
    const [debouncedQuery, setDebouncedQuery] = useState(query);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedQuery(query), 300);
        return () => clearTimeout(timer);
    }, [query]);

    const { products: shopifyProducts, loading } = useShopifyProducts({
        first: 5,
        query: debouncedQuery ? `title:*${debouncedQuery}* OR sku:*${debouncedQuery}*` : ''
    });

    const products = shopifyProducts?.map(mapShopifyToUnified) || [];

    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (handle: string) => {
        setIsOpen(false);
        setQuery('');
        navigate(`/produit/${handle}`);
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            setIsOpen(false);
            navigate(`/produits/liste?q=${encodeURIComponent(query)}`);
        }
    };

    return (
        <div ref={containerRef} className="relative w-full max-w-sm hidden md:block">
            <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setIsOpen(true);
                    }}
                    onFocus={() => setIsOpen(true)}
                    placeholder="Rechercher un produit..."
                    className="pl-9 pr-4 bg-muted/50 border-transparent focus:bg-white transition-colors"
                />
                {query && (
                    <button
                        type="button"
                        onClick={() => {
                            setQuery('');
                            setIsOpen(false);
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}
            </form>

            {isOpen && query.length > 1 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-border p-2 z-50 animate-in fade-in slide-in-from-top-2">
                    {loading ? (
                        <div className="flex items-center justify-center p-4 text-muted-foreground">
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            Recherche...
                        </div>
                    ) : products.length > 0 ? (
                        <div className="space-y-1">
                            {products.map((product) => (
                                <button
                                    key={product.id}
                                    onClick={() => handleSelect(product.handle)}
                                    className="flex items-center gap-3 w-full p-2 hover:bg-muted rounded-md text-left transition-colors group"
                                >
                                    <div className="w-10 h-10 rounded bg-secondary/20 overflow-hidden flex-shrink-0">
                                        <img
                                            src={product.images[0]}
                                            alt={product.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                                            {product.title}
                                        </p>
                                        <p className="text-xs text-muted-foreground truncate">
                                            {product.pn}
                                        </p>
                                    </div>
                                    <div className="text-sm font-semibold text-primary whitespace-nowrap">
                                        {formatPrice(product.price)}€
                                    </div>
                                </button>
                            ))}
                            <Button
                                variant="ghost"
                                className="w-full mt-2 text-xs h-8"
                                onClick={handleSearch}
                            >
                                Voir tous les résultats
                            </Button>
                        </div>
                    ) : (
                        <div className="p-4 text-center text-sm text-muted-foreground">
                            Aucun produit trouvé pour "{query}"
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
