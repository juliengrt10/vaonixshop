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
                    fontWeight: 'bold',
                    fontSize: '14px',
                    writingMode: 'vertical-rl',
                    color: '#5D2B7B',
                    borderLeft: '1px solid #eee'
                }}>
                    VAONIX
                </div>
            </div>
        );
    };

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
            return {
                image: '/images/products/qsfp-base-purple.png',
                // QSFP label positioning - FINAL CORNERS
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
                // SFP label positioning - FINAL CORNERS
                corners: [
                    { x: 46.0, y: 39.8 },
                    { x: 75.8, y: 21.5 },
                    { x: 85.5, y: 28.0 },
                    { x: 55.7, y: 47.0 }
                ],
                renderContent: renderLabelContent
            };
        }
    }, [product.title]);

    // Calculate matrix at runtime based on current container size
    const activeLabelStyle = useMemo(() => {
        // @ts-ignore - corners is a dynamic property
        if (!config.corners || containerSize.width === 0) {
            return {};
        }

        const src: [Point, Point, Point, Point] = [
            { x: 0, y: 0 },
            { x: 300, y: 0 },
            { x: 300, y: 100 },
            { x: 0, y: 100 }
        ];
        // @ts-ignore
        const dst: [Point, Point, Point, Point] = config.corners.map((p: any) => ({
            x: (p.x / 100) * containerSize.width,
            y: (p.y / 100) * containerSize.height
        })) as [Point, Point, Point, Point];

        const matrix = getPerspectiveTransform(src, dst);

        return {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '300px',
            height: '100px',
            transformOrigin: '0 0',
            transform: matrix,
            pointerEvents: 'none',
            zIndex: 20
        };
    }, [config, containerSize]);



    // ... existing config useMemo ...

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
            {/* Label Overlay */}
            {activeLabelStyle && showLabel && (
                <div
                    className="absolute z-20 pointer-events-none"
                    style={activeLabelStyle as React.CSSProperties}
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
