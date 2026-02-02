import { useMemo } from 'react';
import { cn } from '@/lib/utils';
// Force refresh: Label updated to white

interface DynamicProductImageProps {
    product: {
        title: string;
        handle: string;
        specs?: {
            formFactor?: string | null;
            speed?: string | null;
            distance?: string | null;
            wavelength?: string | null;
            media?: string | null;
            tech?: string | null;
        };
    };
    className?: string;
    showLabel?: boolean;
    priority?: boolean;
}


export function DynamicProductImage({ product, className, showLabel = true, priority = false }: DynamicProductImageProps) {
    const { formFactor } = product.specs || {};





    // Render the realistic label content
    const renderLabelContent = () => (
        <div style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '8%',
        }}>
            <img
                src="/images/vaonix-logo.png"
                alt="Vaonix"
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    // Optional: add a slight rotation if the logo needs to align with the module's perspective better,
                    // but usually the container transform handles it.
                }}
            />
        </div>
    );

    // Determine base image based on form factor
    const config = useMemo(() => {
        const titleLower = product.title.toLowerCase();
        const isCable = titleLower.includes('cable') || titleLower.includes('dac') || titleLower.includes('aoc');
        const isQSFPDD = titleLower.includes('qsfp-dd') || titleLower.includes('qsfp56-dd');
        const isQSFP = titleLower.includes('qsfp') && !isQSFPDD;

        if (isCable) {
            // ... existing logic ...
            if (isQSFP || isQSFPDD) {
                return { image: '/images/products/dac-qsfp-full-base.png' };
            } else {
                return { image: '/images/products/dac-sfp-full-base.png' };
            }
        } else if (isQSFPDD || isQSFP) {
            // QSFP / QSFP-DD / QSFP28
            // Uses the new isometric image with purple tab
            return {
                image: '/images/products/qsfp-base-purple.png',
                labelStyle: {
                    top: '38%',
                    left: '48%',
                    width: '28%',
                    height: '12%',
                    transform: 'rotate(-37deg) skewX(20deg)',
                    containerType: 'size',
                    transformOrigin: 'top left',
                },
                renderContent: renderLabelContent
            };
        } else {
            // Default to SFP
            return {
                image: '/images/products/sfp-base.png',
                // SFP label positioning
                labelStyle: {
                    top: '28.2%',
                    left: '47.9%',
                    width: '35.9%',
                    height: '11.5%',
                    transform: 'rotate(-31.1deg) skewX(28.1deg)',
                    containerType: 'size', // Enable container queries
                },
                renderContent: renderLabelContent
            };
        }
    }, [product.title, renderLabelContent]);

    return (
        <div className={cn("relative w-full aspect-square bg-white rounded-xl overflow-hidden", className)}>
            {/* Base Image */}
            <img
                src={config.image}
                alt={product.title}
                loading={priority ? "eager" : "lazy"}
                decoding={priority ? "sync" : "async"}
                fetchPriority={priority ? "high" : "auto"}
                className="w-full h-full object-contain relative z-10"
            />

            {/* Debug Label Overlay */}
            {config.labelStyle && showLabel && (
                <div
                    className="absolute z-20 pointer-events-none"
                    style={config.labelStyle as React.CSSProperties}
                >
                    {/* @ts-ignore - renderContent is a custom property */}
                    {config.renderContent ? config.renderContent() : (
                        <div className="w-full h-full flex items-center justify-center text-[10px] font-bold text-white">
                            LABEL
                        </div>
                    )}
                </div>
            )}

        </div>
    );
}
