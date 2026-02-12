import { DynamicProductImage } from '@/components/DynamicProductImage';

const ImageCapture = () => {
    const products = [
        {
            id: 'sfp',
            title: 'SFP Module',
            handle: 'sfp-module',
            specs: { formFactor: 'SFP' }
        },
        {
            id: 'sfp28',
            title: 'SFP28 Module',
            handle: 'sfp28-module',
            specs: { formFactor: 'SFP28' }
        },
        {
            id: 'qsfp28',
            title: 'QSFP28 Module',
            handle: 'qsfp28-module',
            specs: { formFactor: 'QSFP28' }
        },
        {
            id: 'qsfp-dd',
            title: 'QSFP-DD Module',
            handle: 'qsfp-dd-module',
            specs: { formFactor: 'QSFP-DD' }
        },
        {
            id: 'osfp',
            title: 'OSFP Module',
            handle: 'osfp-module',
            specs: { formFactor: 'OSFP' }
        }
    ];

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold mb-8 text-center">Product Image Capture</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {products.map((product) => (
                    <div key={product.id} className="bg-white p-4 rounded-lg shadow-lg">
                        <h2 className="text-lg font-semibold mb-4 text-center">{product.title}</h2>
                        <div id={`capture-${product.id}`} className="w-full aspect-square">
                            <DynamicProductImage
                                product={product}
                                className="w-full h-full"
                                showLabel={true}
                                priority={true}
                            />
                        </div>
                        <p className="text-xs text-gray-500 mt-2 text-center">ID: capture-{product.id}</p>
                    </div>
                ))}
            </div>
            <div className="mt-8 text-center text-sm text-gray-600">
                <p>Right-click on each image and "Save image as..." to download</p>
                <p>Or use browser DevTools to capture screenshots of each element</p>
            </div>
        </div>
    );
};

export default ImageCapture;
