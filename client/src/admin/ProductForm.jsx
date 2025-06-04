import { useState } from "react"
import { prt } from "../utils/prt"
import ImageInput from "./ImageInput" // Import the reusable component

export default function ProductForm({ schema, type }) {
    const [form, setForm] = useState({})
    const [loading, setLoading] = useState(false)
    const [notification, setNotification] = useState({ show: false, message: "", type: "" })

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        // Generate a random id for the product
        const productId = Math.floor(Math.random() * (10000 - 100 + 1)) + 100
        const updatedForm = { ...form, [`${type}_id`]: productId }

        try {
            const res = await fetch(`${prt}/api/${type}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedForm)
            })

            if (res.ok) {
                setNotification({
                    show: true,
                    message: "Product added successfully!",
                    type: "success"
                })
                setForm({})
            } else {
                setNotification({
                    show: true,
                    message: "Failed to add product",
                    type: "error"
                })
            }
        } catch (error) {
            setNotification({
                show: true,
                message: "Something went wrong",
                type: "error"
            })
        } finally {
            setLoading(false)
            setTimeout(() => {
                setNotification({ show: false, message: "", type: "" })
            }, 3000)
        }
    }

    return (
        <div className="bg-white rounded-lg shadow-lg max-w-4xl mx-auto mt-24">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 rounded-t-lg">
                <h1 className="text-2xl font-bold text-white">Add New {type.charAt(0).toUpperCase() + type.slice(1)}</h1>
                <p className="text-blue-100 mt-1">Fill in the details below</p>
            </div>

            {/* Notification */}
            {notification.show && (
                <div className={`px-6 py-3 ${notification.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {notification.message}
                </div>
            )}

            {/* Form fields */}
            <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {schema.map((field) => (
                        <div key={field.name} className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                {field.name.charAt(0).toUpperCase() + field.name.slice(1)}
                                {field.required && <span className="text-red-500 ml-1">*</span>}
                            </label>

                            {field.name === "image_url" ? (
                                // Using our reusable ImageInput component
                                <ImageInput 
                                    name={field.name}
                                    value={form[field.name] || ""}
                                    onChange={handleChange}
                                />
                            ) : field.type === "textarea" ? (
                                <textarea
                                    name={field.name}
                                    required={field.required}
                                    value={form[field.name] || ""}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    rows={3}
                                ></textarea>
                            ) : (
                                <input
                                    type={field.type === "number" ? "number" : field.type === "date" ? "date" : "text"}
                                    name={field.name}
                                    required={field.required}
                                    value={form[field.name] || ""}
                                    onChange={handleChange}
                                    placeholder={`Enter ${field.name.toLowerCase()}`}
                                    className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            )}
                        </div>
                    ))}
                </div>

                {/* Form actions */}
                <div className="mt-8 flex justify-end space-x-3">
                    <button
                        type="button"
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onClick={() => setForm({})}
                    >
                        Clear
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${loading ? "opacity-75 cursor-not-allowed" : ""}`}
                        onClick={handleSubmit}
                    >
                        {loading ? "Submitting..." : "Submit"}
                    </button>
                </div>
            </div>
        </div>
    )
}