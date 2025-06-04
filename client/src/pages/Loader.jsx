import React from 'react';

const GlobalLoader = ({ size = 'medium', color = 'blue', type = 'pulse' }) => {
    // Size classes mapping
    const sizeClasses = {
        small: {
            container: 'h-16 w-16',
            circle: 'h-4 w-4',
            bar: 'h-1 w-8',
            dots: 'h-2 w-2',
            cubes: 'h-3 w-3',
        },
        medium: {
            container: 'h-24 w-24',
            circle: 'h-6 w-6',
            bar: 'h-2 w-12',
            dots: 'h-3 w-3',
            cubes: 'h-4 w-4',
        },
        large: {
            container: 'h-32 w-32',
            circle: 'h-8 w-8',
            bar: 'h-3 w-16',
            dots: 'h-4 w-4',
            cubes: 'h-6 w-6',
        }
    };

    // Color classes mapping
    const colorClasses = {
        blue: 'bg-blue-500',
        red: 'bg-red-500',
        green: 'bg-green-500',
        purple: 'bg-purple-500',
        pink: 'bg-pink-500',
        gradient: 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500',
    };

    // Return the appropriate loader based on type
    const renderLoader = () => {
        switch (type) {
            case 'pulse':
                return (
                    <div className="flex items-center justify-center">
                        <div className={`${sizeClasses[size].container} flex items-center justify-center`}>
                            <div className={`${sizeClasses[size].circle} ${colorClasses[color]} rounded-full animate-ping opacity-75`}></div>
                        </div>
                    </div>
                );

            case 'ripple':
                return (
                    <div className="flex items-center justify-center">
                        <div className={`${sizeClasses[size].container} relative`}>
                            <div className={`absolute inset-0 ${colorClasses[color]} rounded-full animate-ping opacity-25`}></div>
                            <div className={`absolute inset-0 ${colorClasses[color]} rounded-full animate-ping opacity-50 animation-delay-300`} style={{ animationDelay: '300ms' }}></div>
                            <div className={`absolute inset-0 ${colorClasses[color]} rounded-full animate-ping opacity-75 animation-delay-600`} style={{ animationDelay: '600ms' }}></div>
                        </div>
                    </div>
                );

            case 'spinner':
                return (
                    <div className="flex items-center justify-center">
                        <div className={`${sizeClasses[size].container} flex items-center justify-center`}>
                            <div className={`${sizeClasses[size].circle} ${colorClasses[color]} rounded-full animate-spin border-4 border-t-transparent`}></div>
                        </div>
                    </div>
                );

            case 'dots':
                return (
                    <div className="flex items-center justify-center space-x-2">
                        <div className={`${sizeClasses[size].dots} ${colorClasses[color]} rounded-full animate-bounce`}></div>
                        <div className={`${sizeClasses[size].dots} ${colorClasses[color]} rounded-full animate-bounce`} style={{ animationDelay: '150ms' }}></div>
                        <div className={`${sizeClasses[size].dots} ${colorClasses[color]} rounded-full animate-bounce`} style={{ animationDelay: '300ms' }}></div>
                    </div>
                );

            case 'bars':
                return (
                    <div className="flex items-end justify-center space-x-1">
                        <div className={`${sizeClasses[size].bar} ${colorClasses[color]} animate-bounce`}></div>
                        <div className={`${sizeClasses[size].bar} ${colorClasses[color]} animate-bounce`} style={{ animationDelay: '150ms' }}></div>
                        <div className={`${sizeClasses[size].bar} ${colorClasses[color]} animate-bounce`} style={{ animationDelay: '300ms' }}></div>
                        <div className={`${sizeClasses[size].bar} ${colorClasses[color]} animate-bounce`} style={{ animationDelay: '450ms' }}></div>
                        <div className={`${sizeClasses[size].bar} ${colorClasses[color]} animate-bounce`} style={{ animationDelay: '600ms' }}></div>
                    </div>
                );

            case 'infinity':
                return (
                    <div className="flex items-center justify-center">
                        <div className={`${sizeClasses[size].container} relative`}>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className={`h-full w-1/2 ${colorClasses[color]} rounded-full animate-spin-slow origin-right`}></div>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center rotate-180">
                                <div className={`h-full w-1/2 ${colorClasses[color]} rounded-full animate-spin-slow origin-right`} style={{ animationDelay: '500ms' }}></div>
                            </div>
                        </div>
                    </div>
                );

            case 'orbit':
                return (
                    <div className="flex items-center justify-center">
                        <div className={`${sizeClasses[size].container} relative`}>
                            <div className={`h-full w-full rounded-full border-4 border-gray-200 dark:border-gray-700 opacity-30`}></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="h-full w-full animate-spin-slow">
                                    <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 ${sizeClasses[size].circle} ${colorClasses[color]} rounded-full shadow-glow`}></div>
                                </div>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="h-3/4 w-3/4 animate-spin-reverse">
                                    <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 ${sizeClasses[size].circle} ${color === 'gradient' ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-pink-500'} rounded-full shadow-glow`}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'cubes':
                return (
                    <div className="grid grid-cols-3 gap-1">
                        {[...Array(9)].map((_, index) => (
                            <div
                                key={index}
                                className={`${sizeClasses[size].cubes} ${colorClasses[color]} opacity-0 animate-scale-in`}
                                style={{ animationDelay: `${index * 100}ms` }}
                            ></div>
                        ))}
                    </div>
                );

            case 'wave':
                return (
                    <div className="flex items-end space-x-1">
                        {[...Array(5)].map((_, index) => (
                            <div
                                key={index}
                                className={`${sizeClasses[size].bar} ${colorClasses[color]} animate-wave`}
                                style={{
                                    animationDelay: `${index * 100}ms`,
                                    height: `${1 + index}rem`
                                }}
                            ></div>
                        ))}
                        {[...Array(4)].map((_, index) => (
                            <div
                                key={index + 5}
                                className={`${sizeClasses[size].bar} ${colorClasses[color]} animate-wave`}
                                style={{
                                    animationDelay: `${(index + 5) * 100}ms`,
                                    height: `${5 - index}rem`
                                }}
                            ></div>
                        ))}
                    </div>
                );

            case 'circle-dots':
                return (
                    <div className="relative">
                        <div className={`${sizeClasses[size].container}`}>
                            {[...Array(8)].map((_, index) => {
                                const angle = (index * 45) * (Math.PI / 180);
                                const radius = parseInt(sizeClasses[size].container.match(/\d+/)[0]) / 2.5;
                                const x = Math.cos(angle) * radius;
                                const y = Math.sin(angle) * radius;
                                return (
                                    <div
                                        key={index}
                                        className={`absolute ${sizeClasses[size].dots} ${colorClasses[color]} rounded-full animate-pulse`}
                                        style={{
                                            left: `calc(50% + ${x}px)`,
                                            top: `calc(50% + ${y}px)`,
                                            transform: 'translate(-50%, -50%)',
                                            animationDelay: `${index * 125}ms`
                                        }}
                                    ></div>
                                );
                            })}
                        </div>
                    </div>
                );

            default:
                return (
                    <div className="flex items-center justify-center">
                        <div className={`${sizeClasses[size].container} flex items-center justify-center`}>
                            <div className={`${sizeClasses[size].circle} ${colorClasses[color]} rounded-full animate-pulse`}></div>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="flex flex-col items-center justify-center">
            {renderLoader()}
        </div>
    );
};


export default GlobalLoader;