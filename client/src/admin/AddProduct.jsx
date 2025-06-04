import { useSearchParams } from "react-router-dom"
import ProductForm from "./ProductForm"
import { schemas } from "../data/schema"
import InvalidType from './InvalidType';

export default function AddProduct() {
    const [params] = useSearchParams()
    const category = params.get("category")
    const schema = schemas[category]

    if (!schema) return <InvalidType type={category}/>

    return (
        <div className="p-6">
            <ProductForm schema={schema} type={category} />
        </div>
    )
}
