import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { prt } from '../utils/prt';
import GlobalLoader from '../pages/Loader';

// Reusable table component
const Table = ({ headers, children }) => {
    return (
        <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        {headers.map((header, index) => (
                            <th
                                key={index}
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {children}
                </tbody>
            </table>
        </div>
    );
};

// Reusable table row component
const TableRow = ({ user }) => {
    return (
        <tr className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {user.fullName}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {user.email}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.isAdmin === 'true' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                    {user.isAdmin === 'true' ? 'Admin' : 'Member'}
                </span>
            </td>
        </tr>
    );
};

const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const tableHeaders = ['Full Name', 'Email', 'Role'];

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${prt}/api/auth/allusers`);
                setUsers(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch users');
                setLoading(false);
                console.error(err);
            }
        };

        fetchUsers();
    }, []);

    if (loading) {
        return (
            <GlobalLoader/>
        );
    }

    if (error) {
        return (
            <div className="text-center py-10">
                <p className="text-red-500 text-lg">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <br /><br /><br /><br /><br />
            <h1 className="text-2xl font-bold mb-6">All Users</h1>

            {users.length === 0 ? (
                <div className="text-center py-10">
                    <p className="text-gray-500">No users found</p>
                </div>
            ) : (
                <Table headers={tableHeaders}>
                    {users.map((user) => (
                        <TableRow key={user._id} user={user} />
                    ))}
                </Table>
            )}
        </div>
    );
};

export default AllUsers;