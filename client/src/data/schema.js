export const schemas = {
    sales: [
        // { name: "sales_id", type: "string" },
        { name: "product_name", type: "string", required: true },
        { name: "brand", type: "string", required: true },
        { name: "model", type: "string", required: true },
        { name: "price", type: "number", required: true },
        { name: "image_url", type: "string", required: true },
        { name: "description", type: "string", required: true },
    ],
    services: [
        // { name: "service_id", type: "string"},
        { name: "product_name", type: "string", required: true },
        { name: "brand", type: "string", required: true },
        { name: "category", type: "string", required: true },
        { name: "price", type: "number", required: true },
        { name: "image_url", type: "string", required: true },
        { name: "description", type: "string", required: true },
        // { name: "last_updated", type: "date", required: false }
    ],
    accessories: [
        // { name: "accessory_id", type: "string" },
        { name: "product_name", type: "string", required: true },
        { name: "brand", type: "string", required: true },
        { name: "category", type: "string", required: true },
        // { name: "compatibility", type: "string", required: true },
        { name: "price", type: "number", required: true },
        { name: "image_url", type: "string", required: true },
        { name: "description", type: "string", required: true },
    ]
}