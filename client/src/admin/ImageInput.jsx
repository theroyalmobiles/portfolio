import { useState, useRef } from 'react';

export default function ImageInput({ name, value, onChange, className = "" }) {
    const [dragActive, setDragActive] = useState(false);
    const [imagePreview, setImagePreview] = useState(value || null);
    const [inputMethod, setInputMethod] = useState('upload'); // 'upload', 'select', or 'url'
    const fileInputRef = useRef(null);

    // Handle drag events
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    // Handle dropped files
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFiles(e.dataTransfer.files[0]);
        }
    };

    // Handle file input change
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            handleFiles(e.target.files[0]);
        }
    };

    // Process the file that was dropped or selected
    const handleFiles = (file) => {
        // Create file reader to convert file to data URL
        const reader = new FileReader();
        reader.onload = (e) => {
            const dataUrl = e.target.result;
            setImagePreview(dataUrl);

            // Simulate onChange event with the data URL value
            onChange({
                target: {
                    name: name,
                    value: dataUrl,
                    type: 'text'
                }
            });
        };
        reader.readAsDataURL(file);

        setInputMethod('upload');
    };

    // Handle dropdown selection
    const handleSelectChange = (e) => {
        if (e.target.value) {
            setImagePreview(e.target.value);
            setInputMethod('select');
            onChange(e);
        }
    };

    // Handle custom URL input
    const handleUrlChange = (e) => {
        setInputMethod('url');
        if (e.target.value) {
            setImagePreview(e.target.value);
        } else {
            setImagePreview(null);
        }
        onChange(e);
    };

    // Select input method
    const changeInputMethod = (method) => {
        setInputMethod(method);
        if (method !== 'upload' || !imagePreview?.startsWith('data:')) {
            setImagePreview(null);

            // Clear the field value when switching methods
            onChange({
                target: {
                    name: name,
                    value: '',
                    type: 'text'
                }
            });
        }
    };

    // Open file dialog when clicking on the upload area
    const onButtonClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div className={`w-full space-y-4 ${className}`}>
            {/* Tabs for switching between input methods */}
            <div className="flex border-b">
                <button
                    type="button"
                    onClick={() => changeInputMethod('upload')}
                    className={`py-2 px-4 font-medium ${inputMethod === 'upload'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Upload Image
                </button>
                <button
                    type="button"
                    onClick={() => changeInputMethod('url')}
                    className={`py-2 px-4 font-medium ${inputMethod === 'url'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Image URL
                </button>
            </div>

            {/* Upload area with drag and drop */}
            {inputMethod === 'upload' && (
                <div
                    className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                        }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={onButtonClick}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                    <div className="space-y-2">
                        <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                        >
                            <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <div className="text-sm text-gray-600">
                            <span className="font-medium text-blue-600">Click to upload</span> or drag and drop
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                </div>
            )}

            {/* Custom URL input */}
            {inputMethod === 'url' && (
                <input
                    type="url"
                    name={name}
                    value={value || ""}
                    onChange={handleUrlChange}
                    placeholder="Enter image URL"
                    className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            )}

            {/* Image preview */}
            {imagePreview && (
                <div className="mt-4">
                    <div className="text-sm font-medium text-gray-700 mb-2">Image Preview:</div>
                    <div className="border rounded-md p-2 relative">
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="max-h-48 rounded mx-auto"
                            onError={(e) => {
                                e.target.src = "/api/placeholder/400/320";
                                e.target.alt = "Failed to load image";
                            }}
                        />
                        <button
                            type="button"
                            onClick={() => {
                                setImagePreview(null);
                                onChange({
                                    target: {
                                        name: name,
                                        value: '',
                                        type: 'text'
                                    }
                                });
                            }}
                            className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                        >
                            <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}