import { useMemo } from 'react';
import { cn } from '@/lib/utils';

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

    // Helper to extract tech/type from title for the side label
    const getTechCode = () => {
        const title = product.title.toUpperCase();
        const speed = product.specs?.speed;
        const media = product.specs?.media;

        // Règles métier pour Multimode (SR)
        if (media === 'Multimode' || title.includes('SR') || title.includes('SX')) {
            if (speed === '1G') return 'SX';
            if (speed === '40G' || speed === '100G') return 'SR4';
            return 'SR';
        }

        if (title.includes('BXD')) return 'BXD';
        if (title.includes('BXU')) return 'BXU';
        if (title.includes('LR')) return 'LR';
        if (title.includes('ER')) return 'ER';
        if (title.includes('ZR')) return 'ZR';
        if (title.includes('LX')) return 'LX';
        if (title.includes('EX')) return 'EX';
        if (title.includes('ZX')) return 'ZX';
        if (title.includes('T')) return 'T'; // Copper

        return (product.specs?.tech || 'SFP').replace('VAONIX', '');
    };

    const techCode = getTechCode();

    // Helper to format SKU from Handle (more reliable than title)
    const renderStyledSKU = () => {
        const speed = product.specs?.speed;
        const media = product.specs?.media;
        const isMM = media === 'Multimode';

        // Use handle to get the Dashed string (e.g. sfp-10g-sr)
        let sku = product.handle.toUpperCase()
            .replace('VAONIX-', '')
            .replace(/BASE/gi, '')
            .replace(/SINGLEMODE/gi, '')
            .replace(/MULTIMODE/gi, 'SR');

        // Application des règles SX / SR4
        if (isMM) {
            if (speed === '1G') sku = sku.replace(/\bSR\b/g, 'SX');
            else if (speed === '40G' || speed === '100G') sku = sku.replace(/\bSR\b/g, 'SR4');

            // Supprimer la longueur d'onde pour MM sur l'étiquette
            const wavelength = product.specs?.wavelength;
            if (wavelength) {
                const wave = wavelength.replace(/NM/gi, '').trim();
                const waveRegex = new RegExp(`-?${wave}(NM)?-?`, 'gi');
                sku = sku.replace(waveRegex, '-');
            }
        }

        // Nettoyage final
        sku = sku
            .replace(/--+/g, '-')
            .replace(/^-+|-+$/g, '');

        // Fallback to title part if handle is generic/empty (rare)
        if (!sku || sku === 'MAIN' || sku === 'PRODUCT-VX') {
            sku = product.title.toUpperCase()
                .split(' ')[0]
                .replace('VAONIX-', '')
                .replace(/BASE/g, '')
                .replace(/NM/g, '')
                .replace(/SINGLEMODE/g, '')
                .replace(/MULTIMODE/g, 'SR');

            if (isMM) {
                if (speed === '1G') sku = sku.replace(/\bSR\b/g, 'SX');
                else if (speed === '40G' || speed === '100G') sku = sku.replace(/\bSR\b/g, 'SR4');
            }
        }

        // Ensure proper suffix -VX
        if (!sku.endsWith('-VX')) {
            sku = `${sku}-VX`;
        }

        // Regex to separate the Form Factor prefix (SFP, SFP+, QSFP28...)
        const match = sku.match(/^(SFP\+|SFP|QSFP\+|QSFP28|QSFP|XFP)(-)(.+)$/i);

        if (match) {
            return (
                <>
                    <span style={{ fontSize: '0.4em', fontWeight: '800', marginRight: '0.1em', opacity: 0.9 }}>
                        {match[1]}
                    </span>
                    {match[3]}
                </>
            );
        }

        return sku;
    };

    // Render the realistic label content
    const renderLabelContent = () => (
        <div style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#ffffff',
            display: 'flex',
            flexDirection: 'row',
            overflow: 'hidden',
        }}>
            {/* Left Colored Band - Tech Code (BXD, SR, etc.) */}
            <div style={{
                width: '12%',
                height: '100%',
                backgroundColor: '#2e1065', // Dark purple
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                writingMode: 'vertical-rl',
                transform: 'rotate(180deg)',
                fontSize: '8cqw',  // DOUBED/TRIPLED (was 3.5cqw)
                fontWeight: '800',
                padding: '2px',
                textAlign: 'center',
                letterSpacing: '0.05em'
            }}>
                {techCode}
            </div>

            {/* Main Content */}
            <div style={{
                flex: 1,
                padding: '1% 2%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center', // Center vertically
                alignItems: 'center',
                textAlign: 'center'
            }}>
                {/* Header: SKU */}
                <div style={{
                    fontSize: '7cqw', // Increased slightly but allowed to wrap
                    fontWeight: '900',
                    color: '#000',
                    lineHeight: '1.0', // Tight line height for multiline
                    letterSpacing: '-0.02em',
                    display: 'flex',
                    flexWrap: 'wrap', // Allow wrapping
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 'auto',
                    marginBottom: 'auto',
                    width: '100%',
                    wordBreak: 'break-word', // Ensure long words break if needed
                    padding: '0 2%'
                }}>
                    {renderStyledSKU()}
                </div>


                {/* Footer: Regulatory */}
                <div style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    marginTop: 'auto', // Push to bottom
                    marginBottom: '1%',
                    fontSize: '3.5cqw', // INCREASED (was 2.2cqw)
                    fontWeight: '700',
                    color: '#000'
                }}>
                    <span>Laser class 1</span>
                    <div className="flex gap-[0.2em] items-center">
                        <span>CE</span>
                        <span>RoHS</span>
                    </div>
                </div>
            </div>

            {/* Right Brand Vertical */}
            <div style={{
                width: '15%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1%',
                borderLeft: '2px solid #f3f4f6'
            }}>
                <div style={{
                    writingMode: 'vertical-rl',
                    transform: 'rotate(180deg)',
                    fontSize: '5.5cqw',
                    fontWeight: '900',
                    color: '#2e1065', // Brand purple
                    letterSpacing: '0.1em',
                    whiteSpace: 'nowrap'
                }}>
                    VAONIX
                </div>
            </div>
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
                    top: '30.8%',
                    left: '47%',
                    width: '32%',
                    height: '10%',
                    transform: 'rotate(-32deg) skewX(12deg)',
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
