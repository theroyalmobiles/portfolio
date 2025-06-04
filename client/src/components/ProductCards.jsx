import React from 'react';
import Actions from "./Actions";


const ProductCardSkeleton = () => (
    <div className="bg-white rounded-lg shadow-md p-4 w-100 border border-gray-200">
        <div className="w-full h-52 rounded-lg bg-gray-200 animate-pulse"></div>
        <div className="mt-4">
            <div className="h-6 bg-gray-200 rounded-md w-3/4 animate-pulse"></div>
            <div className="mt-3">
                <div className="h-4 bg-gray-200 rounded-md w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded-md w-5/6 mt-2 animate-pulse"></div>
            </div>
            <div className="mt-2 h-6 bg-gray-200 rounded-md w-1/4 animate-pulse"></div>
            <div className="mt-4 flex gap-2">
                <div className="h-8 bg-gray-200 rounded-md w-1/2 animate-pulse"></div>
                <div className="h-8 bg-gray-200 rounded-md w-1/2 animate-pulse"></div>
            </div>
        </div>
    </div>
);

const ProductCardsSkeleton = ({ count = 6 }) => {
    return (
        <div className="w-full flex flex-wrap gap-6 justify-center">
            {Array(count).fill().map((_, index) => (
                <ProductCardSkeleton key={index} />
            ))}
        </div>
    );
};


const handleImageError = (event) => {
    if (!event.target.dataset.error) {
        event.target.dataset.error = "true";
        event.target.src = "/imgs/default-img.png";
    }
};

const ProductCard = ({ item, cname }) => (
    <div className="bg-white rounded-lg shadow-md p-4 w-100 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
        <img
            src={item.image_url || "/imgs/default-img.png"}
            alt={item.product_name}
            className="w-full h-52 object-cover rounded-lg"
            onError={handleImageError}
        />
        <div className="mt-4">
            <h3 className="text-lg font-bold text-gray-900">{item.product_name}</h3>
            <p className="text-sm text-gray-500 mt-1">
                {item?.description?.length > 20 ? item?.description?.slice(0, 70) + "..." : item.description}
            </p>
            <p className="mt-2 text-lg font-bold text-green-600">₹{item.price}</p>
            <div className="mt-4">
                <Actions id={item._id} cname={cname} pname={item.product_name} />
            </div>
        </div>
    </div>
);


const ProductCards = ({ data, cname, isLoading = false }) => {
    if (isLoading) {
        return <ProductCardsSkeleton />;
    }

    return (
        <div className="w-full flex flex-wrap gap-6 justify-center">
            {data && data.length > 0 ? (
                data.map((item, i) => (
                    <ProductCard key={item._id || i} item={item} cname={cname} />
                ))
            ) : (
                <ProductCardsSkeleton />
            )}
        </div>
    );
};

export default ProductCards;
export { ProductCardsSkeleton };
