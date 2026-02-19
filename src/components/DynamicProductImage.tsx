import React, { useMemo, useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { getPerspectiveTransform, Point } from '@/utils/matrix3d';





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
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const updateSize = () => {
            if (containerRef.current) {
                const { width, height } = containerRef.current.getBoundingClientRect();
                setContainerSize({ width, height });
            }
        };
        updateSize();
        const observer = new ResizeObserver(updateSize);
        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);





    // Render the realistic label content
    const renderLabelContent = () => {
        const { wavelength, speed, distance } = product.specs || {};
        const titleLower = product.title.toLowerCase();

        // Extract application type (BX-U, LR, SR, DWDM etc.)
        let application = "SFP";
        if (titleLower.includes('bx-u')) application = "BX-U";
        else if (titleLower.includes('bx-d')) application = "BX-D";
        else if (titleLower.includes('dwdm')) application = "DWDM";
        else if (titleLower.includes('cwdm')) application = "CWDM";
        else if (titleLower.includes('lr4')) application = "LR4";
        else if (titleLower.includes('sr4')) application = "SR4";
        else if (titleLower.includes('er4')) application = "ER4";
        else if (titleLower.includes('zr4')) application = "ZR4";
        else if (titleLower.includes('lr')) application = "LR";
        else if (titleLower.includes('re')) application = "RE";
        else if (titleLower.includes('sr')) application = "SR";
        else if (titleLower.includes('dac')) application = "DAC";
        else if (titleLower.includes('aoc')) application = "AOC";

        return (
            <div style={{
                width: '300px',
                height: '100px',
                backgroundColor: '#ffffff',
                display: 'flex',
                fontFamily: 'Arial, sans-serif',
                fontSize: '12px',
                color: '#000',
                overflow: 'hidden'
            }}>
                {/* Left Sidebar (Purple) */}
                <div style={{
                    width: '15%',
                    backgroundColor: '#5D2B7B',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    writingMode: 'vertical-rl',
                    transform: 'rotate(180deg)'
                }}>
                    {application}
                </div>

                {/* Main Content Area */}
                <div style={{
                    width: '73%',
                    padding: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                }}>
                    <div>
                        <div style={{ fontWeight: 'bold', fontSize: '13px', marginBottom: '2px', lineHeight: '1.2' }}>{product.title}</div>
                        <div style={{ fontSize: '12px' }}>
                            {wavelength && `${wavelength} - `}
                            {speed && `${speed} - `}
                            {distance}
                        </div>
                        <div style={{ fontSize: '11px', marginTop: '2px' }}>S/N : xxxx</div>
                    </div>

                    {/* Bottom compliance markers */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '9px',
                        fontWeight: 'bold',
                        borderTop: '1px solid #eee',
                        paddingTop: '4px'
                    }}>
                        <span>Laser class 1</span>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <span>CE</span>
                            <span>RoHS</span>
                        </div>
                    </div>
                </div>

                {/* Right Branding Sidebar */}
                <div style={{
                    width: '12%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderLeft: '1px solid #eee',
                    padding: '4px'
                }}>
                    <img
                        src="/images/vaonix-logo-transparent.png"
                        alt="Vaonix"
                        style={{
                            width: '100%',
                            height: 'auto',
                            transform: 'rotate(90deg)',
                            opacity: 0.8,
                            filter: 'brightness(0.7)'
                        }}
                    />
                </div>
            </div>
        );
    };

    const renderLogoOnly = () => (
        <div style={{
            width: '300px',
            height: '100px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'transparent'
        }}>
            <img
                src="/images/vaonix-logo-transparent.png"
                alt="Vaonix"
                style={{
                    width: '80%',
                    height: 'auto',
                    objectFit: 'contain',
                    opacity: 0.9,
                    filter: 'brightness(0.8) contrast(1.2)' // To make it pop on white labels
                }}
            />
        </div>
    );

    // Determine base image based on form factor
    const config = useMemo(() => {
        const titleLower = product.title.toLowerCase();
        const isCable = titleLower.includes('cable') || titleLower.includes('dac') || titleLower.includes('aoc');
        const isQSFPDD = titleLower.includes('qsfp-dd') || titleLower.includes('qsfp56-dd');
        const isQSFP = (titleLower.includes('qsfp') && !isQSFPDD) || titleLower.includes('40g') || titleLower.includes('100g');

        if (isCable) {
            const labels = isQSFP || isQSFPDD ? [
                // QSFP DAC Labels
                {
                    corners: [
                        { x: 17.5, y: 67.8 },
                        { x: 33.3, y: 62.7 },
                        { x: 36.5, y: 69.7 },
                        { x: 19.9, y: 75.0 }
                    ],
                    renderContent: renderLogoOnly
                },
                {
                    corners: [
                        { x: 67.9, y: 61.6 },
                        { x: 83.1, y: 65.4 },
                        { x: 80.4, y: 71.6 },
                        { x: 65.3, y: 67.8 }
                    ],
                    renderContent: renderLogoOnly
                }
            ] : [
                // SFP DAC Labels
                {
                    corners: [
                        { x: 42.0, y: 64.1 },
                        { x: 52.5, y: 69.7 },
                        { x: 49.4, y: 72.6 },
                        { x: 38.3, y: 67.4 }
                    ],
                    renderContent: renderLogoOnly
                },
                {
                    corners: [
                        { x: 81.3, y: 40.0 },
                        { x: 89.2, y: 46.6 },
                        { x: 84.9, y: 48.7 },
                        { x: 77.3, y: 42.2 }
                    ],
                    renderContent: renderLogoOnly
                }
            ];

            return {
                image: isQSFP || isQSFPDD ? '/images/products/dac-qsfp-full-base.png' : '/images/products/dac-sfp-full-base.png',
                labels
            };
        } else if (isQSFPDD || isQSFP) {
            // QSFP / QSFP-DD / QSFP28
            return {
                image: '/images/products/qsfp-base-purple.png',
                corners: [
                    { x: 46.1, y: 37.8 },
                    { x: 70.5, y: 19.3 },
                    { x: 83.0, y: 26.8 },
                    { x: 59.0, y: 45.0 }
                ],
                renderContent: renderLabelContent
            };
        } else {
            // Default to SFP
            return {
                image: '/images/products/sfp-base.png',
                corners: [
                    { x: 46.0, y: 39.8 },
                    { x: 75.8, y: 21.5 },
                    { x: 85.5, y: 28.0 },
                    { x: 55.7, y: 47.0 }
                ],
                renderContent: renderLabelContent
            };
        }
    }, [product.title, renderLabelContent, renderLogoOnly]);

    // Calculate matrices for all labels
    const activeLabels = useMemo(() => {
        if (containerSize.width === 0) return [];

        // @ts-ignore
        const labelsConfigs = config.labels || (config.corners ? [{ corners: config.corners, renderContent: config.renderContent }] : []);

        return labelsConfigs.map((label: any) => {
            const src: [Point, Point, Point, Point] = [
                { x: 0, y: 0 },
                { x: 300, y: 0 },
                { x: 300, y: 100 },
                { x: 0, y: 100 }
            ];
            const dst: [Point, Point, Point, Point] = label.corners.map((p: any) => ({
                x: (p.x / 100) * containerSize.width,
                y: (p.y / 100) * containerSize.height
            })) as [Point, Point, Point, Point];

            const matrix = getPerspectiveTransform(src, dst);

            return {
                style: {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '300px',
                    height: '100px',
                    transformOrigin: '0 0',
                    transform: matrix,
                    pointerEvents: 'none',
                    zIndex: 20
                },
                content: label.renderContent || renderLabelContent
            };
        });
    }, [config, containerSize, renderLabelContent]);

    return (
        <div
            ref={containerRef}
            className={cn("relative w-full aspect-square bg-white rounded-xl overflow-hidden group", className)}
        >
            {/* Base Image */}
            <img
                src={config.image}
                alt={product.title}
                loading={priority ? "eager" : "lazy"}
                decoding={priority ? "sync" : "async"}
                fetchPriority={priority ? "high" : "auto"}
                className="w-full h-full object-contain relative z-10"
            />
            {/* Label Overlays */}
            {showLabel && activeLabels.map((label: any, idx: number) => (
                <div
                    key={idx}
                    className="absolute z-20 pointer-events-none"
                    style={label.style as React.CSSProperties}
                >
                    {label.content()}
                </div>
            ))}
        </div>
    );
}
