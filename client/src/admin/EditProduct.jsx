import { useEffect, useState } from "react"
import { useParams, useSearchParams, useNavigate } from "react-router-dom"
import { schemas } from "../data/schema"
import { prt } from "../utils/prt"
import ImageInput from "./ImageInput"
import InvalidType from "./InvalidType"

export default function EditProduct() {
    const navigate = useNavigate()
    const { id } = useParams()  // Extract the id from the URL path
    const [params] = useSearchParams()
    const category = params.get("category")  // Extract category from query params
    const schema = schemas[category]

    const [form, setForm] = useState({})
    const [loading, setLoading] = useState(false)
    const [fetched, setFetched] = useState(false)
    const [notification, setNotification] = useState({ show: false, message: "", type: "" })

    useEffect(() => {
        console.log("Category:", category, "ID:", id)
        const fetchData = async () => {
            try {
                const res = await fetch(`${prt}/api/${category}/${id}`)
                if (res.ok) {
                    const data = await res.json()
                    setForm(data)
                    setFetched(true)
                } else {
                    setNotification({ show: true, message: "Failed to fetch data", type: "error" })
                }
            } catch {
                setNotification({ show: true, message: "Failed to fetch data", type: "error" })
            }

        }
        if (category && id) fetchData()
    }, [category, id])

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await fetch(`${prt}/api/${category}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            })

            setNotification({
                show: true,
                message: res.ok ? "Product updated successfully!" : "Failed to update product",
                type: res.ok ? "success" : "error"
            })
        } catch {
            setNotification({ show: true, message: "Something went wrong", type: "error" })
        } finally {
            setLoading(false)
            setTimeout(() => setNotification({ show: false, message: "", type: "" }), 3000)
        }
    }

    if (!schema) return <InvalidType type={category} />
    if (!fetched) return <div className="text-center mt-24 text-lg text-gray-500">Loading product details...</div>

    return (
        <div className="bg-white rounded-lg shadow-lg max-w-4xl mx-auto mt-24">
            <div className="bg-gradient-to-r from-yellow-500 to-orange-600 p-6 rounded-t-lg">
                <h1 className="text-2xl font-bold text-white">Edit {category.charAt(0).toUpperCase() + category.slice(1)}</h1>
                <p className="text-yellow-100 mt-1">Update the product details below</p>
            </div>

            {notification.show && (
                <div className={`px-6 py-3 ${notification.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {notification.message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {schema.map((field) => (
                        <div key={field.name} className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                {field.name.charAt(0).toUpperCase() + field.name.slice(1)}
                                {field.required && <span className="text-red-500 ml-1">*</span>}
                            </label>
                            {field.name === "image_url" ? (
                                <ImageInput name={field.name} value={form[field.name] || ""} onChange={handleChange} />
                            ) : field.type === "textarea" ? (
                                <textarea
                                    name={field.name}
                                    required={field.required}
                                    value={form[field.name] || ""}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                                    rows={3}
                                ></textarea>
                            ) : (
                                <input
                                    type={field.type === "number" ? "number" : field.type === "date" ? "date" : "text"}
                                    name={field.name}
                                    required={field.required}
                                    value={form[field.name] || ""}
                                    onChange={handleChange}
                                    placeholder={`Enter ${field.name}`}
                                    className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                                />
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-8 flex justify-end space-x-3">
                    <button
                        type="button"
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        onClick={() => setForm({})}
                    >
                        Clear
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        onClick={() => navigate(-1)}
                        className={`px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 ${loading ? "opacity-75 cursor-not-allowed" : ""}`}
                    >
                        {loading ? "Updating..." : "Update"}
                    </button>
                </div>
            </form>
        </div>
    )
}
