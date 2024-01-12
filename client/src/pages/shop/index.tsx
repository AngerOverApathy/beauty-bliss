import { useGetProducts } from "../../hooks/useGetProducts";

export const ShopPage = () => {
    const { products } = useGetProducts();
    return (
        <div className='shop'>
            <div className='products'>
                {products.map((product) => (
                    <div>
                        {product.productName}
                        {product.price}
                    </div>
                ))}
            </div>
        </div>
    );
};
