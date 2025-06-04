const allPath = [
    {
        schema: "Others",
        routes: [
            {
                method: "GET", path: "/info/all", description: "Get all model info"
            },
            {
                method: "GET", path: "/info/all/:name", description: "Get each model info"
            },
        ]
    },
    {
        schema: "Sales",
        routes: [
            { method: "GET", path: "/api/sales", description: "Get all sales records" },
            { method: "GET", path: "/api/sales/:id", description: "Get a specific sale by ID" },
            {
                method: "POST",
                path: "/api/sales",
                description: "Add a new sale",
                items: {
                    required: ["sales_id", "product_name", "brand", "model", "price", "description", "image_url"],
                    optional: [],
                    correct_model: ["sales_id", "product_name", "brand", "model", "price", "description", "image_url"]
                }
            },
            {
                method: "PUT",
                path: "/api/sales/:id",
                description: "Update a sale",
                items: {
                    required: ["id"],
                    optional: ["product_name", "brand", "model", "price", "description", "image_url"],
                    correct_model: ["sales_id", "product_name", "brand", "model", "price", "description", "image_url"]
                }
            },
            { method: "DELETE", path: "/api/sales/:id", description: "Delete a sale" }
        ]
    },
    {
        schema: "Services",
        routes: [
            { method: "GET", path: "/api/services", description: "Get all services" },
            { method: "GET", path: "/api/services/:id", description: "Get a specific service by ID" },
            {
                method: "POST",
                path: "/api/services",
                description: "Add a new service",
                items: {
                    required: ["service_id", "product_name", "brand", "category", "price", "description", "image_url"],
                    optional: ["last_updated"],
                    correct_model: ["service_id", "product_name", "brand", "category", "price", "description", "image_url", "last_updated"]
                }
            },
            {
                method: "PUT",
                path: "/api/services/:id",
                description: "Update a service",
                items: {
                    required: ["id"],
                    optional: ["product_name", "brand", "category", "price", "description", "image_url", "last_updated"],
                    correct_model: ["service_id", "product_name", "brand", "category", "price", "description", "image_url", "last_updated"]
                }
            },
            { method: "DELETE", path: "/api/services/:id", description: "Delete a service" }
        ]
    },
    {
        schema: "Accessories",
        routes: [
            { method: "GET", path: "/api/accessories", description: "Get all accessories" },
            { method: "GET", path: "/api/accessories/:id", description: "Get a specific accessory by ID" },
            {
                method: "POST",
                path: "/api/accessories",
                description: "Add a new accessory",
                items: {
                    required: ["accessory_id", "product_name", "brand", "category", "compatibility", "price", "description", "image_url"],
                    optional: [],
                    correct_model: ["accessory_id", "product_name", "brand", "category", "compatibility", "price", "description", "image_url"]
                }
            },
            {
                method: "PUT",
                path: "/api/accessories/:id",
                description: "Update an accessory",
                items: {
                    required: ["id"],
                    optional: ["product_name", "brand", "category", "compatibility", "price", "description", "image_url"],
                    correct_model: ["accessory_id", "product_name", "brand", "category", "compatibility", "price", "description", "image_url"]
                }
            },
            { method: "DELETE", path: "/api/accessories/:id", description: "Delete an accessory" }
        ]
    }
];

const allModel = [
    {
        schema: "Sales",
        fields: [
            { name: "sales_id", type: "string", required: true },
            { name: "product_name", type: "string", required: true },
            { name: "brand", type: "string", required: true },
            { name: "model", type: "string", required: true },
            { name: "price", type: "number", required: true },
            { name: "description", type: "string", required: true },
            { name: "image_url", type: "string", required: true }
        ]
    },
    {
        schema: "Services",
        fields: [
            { name: "service_id", type: "string", required: true },
            { name: "product_name", type: "string", required: true },
            { name: "brand", type: "string", required: true },
            { name: "category", type: "string", required: true },
            { name: "price", type: "number", required: true },
            { name: "description", type: "string", required: true },
            { name: "image_url", type: "string", required: true },
            { name: "last_updated", type: "date", required: false }
        ]
    },
    {
        schema: "Accessories",
        fields: [
            { name: "accessory_id", type: "string", required: true },
            { name: "product_name", type: "string", required: true },
            { name: "brand", type: "string", required: true },
            { name: "category", type: "string", required: true },
            { name: "compatibility", type: "string", required: true },
            { name: "price", type: "number", required: true },
            { name: "description", type: "string", required: true },
            { name: "image_url", type: "string", required: true }
        ]
    }
];


module.exports = { allPath, allModel };
