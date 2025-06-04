import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const EditItem = ({ cname }) => {
    const { id } = useParams(); // Extract the item ID from the URL
    const history = useHistory();

    // State to store item data
    const [itemData, setItemData] = useState({
        pname: "",
        cname: "",
        // Add any other fields for your item
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch the item data when the component mounts
    useEffect(() => {
        const fetchItemData = async () => {
            try {
                const response = await axios.get(`/${prt}/api/${cname}/${id}`);
                setItemData(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load item data');
                setLoading(false);
            }
        };
        fetchItemData();
    }, [id, cname]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setItemData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/${prt}/api/${cname}/${id}`, itemData);
            alert('Item updated successfully');
            history.push(`/${cname}`);
        } catch (err) {
            alert('Failed to update item');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="w-full max-w-lg mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">Edit Item</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="pname" className="block text-sm font-semibold mb-2">
                        Product Name
                    </label>
                    <input
                        type="text"
                        id="pname"
                        name="pname"
                        value={itemData.pname}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="cname" className="block text-sm font-semibold mb-2">
                        Category Name
                    </label>
                    <input
                        type="text"
                        id="cname"
                        name="cname"
                        value={itemData.cname}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                {/* Add more fields as needed */}
                <div className="flex justify-between items-center">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                        Save Changes
                    </button>
                    <button
                        type="button"
                        onClick={() => history.push(`/${cname}`)}
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditItem;
