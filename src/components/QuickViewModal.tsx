import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DynamicProductImage } from '@/components/DynamicProductImage';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import { UnifiedProduct } from '@/lib/productMapper';
import { Link } from 'react-router-dom';
import { ShoppingCart, ExternalLink, Check } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface QuickViewModalProps {
    product: UnifiedProduct | null;
    isOpen: boolean;
    onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, isOpen, onClose }) => {
    const { addToCart, openCart } = useCart();
    const [isAdding, setIsAdding] = React.useState(false);
    const [added, setAdded] = React.useState(false);

    if (!product) return null;

    const handleAddToCart = async () => {
        // Redirection si produit complexe (Câble, CWDM, DWDM ou multi-compatibilité)
        // Mais on permet l'ajout direct s'il a un variant par défaut (cas simple)
        if ((product.isCable || product.isCWDM || product.isDWDM || product.compatibility?.length > 1) &&
            !product.defaultVariantId) {
            onClose();
            window.location.href = `/produit/${product.handle}`;
            return;
        }

        setIsAdding(true);
        try {
            await addToCart(product.defaultVariantId || product.id, 1, {
                id: product.id,
                title: product.title,
                price: product.price,
                handle: product.handle,
                isShopify: product.isShopify,
                image: product.images[0]
            });
            setAdded(true);
            setTimeout(() => setAdded(false), 2000);
        } catch (e) {
            console.error(e);
            toast({
                title: "Erreur",
                description: "Impossible d'ajouter au panier",
                variant: "destructive"
            });
        } finally {
            setIsAdding(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden gap-0">
                <div className="grid md:grid-cols-2 h-full">
                    {/* Image Section */}
                    <div className="bg-muted/10 p-6 flex items-center justify-center border-r">
                        <div className="relative w-full aspect-square max-w-[300px]">
                            <DynamicProductImage
                                product={{
                                    title: product.title,
                                    handle: product.handle,
                                    specs: {
                                        formFactor: product.form_factor,
                                        speed: product.speed,
                                        distance: product.range,
                                        media: product.fiber,
                                        wavelength: product.wavelength
                                    }
                                }}
                            />
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 flex flex-col h-full">
                        <DialogHeader className="mb-4">
                            <div className="flex items-start justify-between">
                                <div>
                                    <Badge variant="outline" className="mb-2">{(product as any).vendor || 'Vaonix'}</Badge>
                                    <DialogTitle className="text-xl font-bold leading-tight mb-2">
                                        {product.title}
                                    </DialogTitle>
                                    <DialogDescription className="text-base font-medium text-foreground">
                                        {formatPrice(product.price)}
                                    </DialogDescription>
                                </div>
                            </div>
                        </DialogHeader>

                        <div className="flex-1 space-y-4">
                            <div className="text-sm text-muted-foreground">
                                <p className="line-clamp-3">{product.description}</p>
                            </div>

                            {/* Specs Preview */}
                            <div className="grid grid-cols-2 gap-2 text-xs">
                                {product.application && (
                                    <div className="bg-muted/50 p-2 rounded">
                                        <span className="font-semibold block">Technologie</span>
                                        {product.application}
                                    </div>
                                )}
                                {product.speed && (
                                    <div className="bg-muted/50 p-2 rounded">
                                        <span className="font-semibold block">Débit</span>
                                        {product.speed}
                                    </div>
                                )}
                                {product.range && (
                                    <div className="bg-muted/50 p-2 rounded">
                                        <span className="font-semibold block">Distance</span>
                                        {product.range}
                                    </div>
                                )}
                                {product.form_factor && (
                                    <div className="bg-muted/50 p-2 rounded">
                                        <span className="font-semibold block">Format</span>
                                        {product.form_factor}
                                    </div>
                                )}
                                {product.wavelength && (
                                    <div className="bg-muted/50 p-2 rounded">
                                        <span className="font-semibold block">Longueur d'onde</span>
                                        {product.wavelength}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="mt-6 flex gap-3">
                            <Button
                                className="flex-1 bg-primary hover:bg-primary/90"
                                onClick={handleAddToCart}
                                disabled={isAdding}
                            >
                                {added ? (
                                    <>
                                        <Check className="w-4 h-4 mr-2" />
                                        Ajouté !
                                    </>
                                ) : (
                                    <>
                                        {isAdding ? (
                                            "Ajout..."
                                        ) : (
                                            <>
                                                <ShoppingCart className="w-4 h-4 mr-2" />
                                                Ajouter au panier
                                            </>
                                        )}
                                    </>
                                )}
                            </Button>
                            <Button variant="outline" className="flex-1" asChild>
                                <Link to={`/produit/${product.handle}`} onClick={onClose}>
                                    Voir la fiche
                                    <ExternalLink className="w-4 h-4 ml-2" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
