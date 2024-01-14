import { IProduct } from '../../models/interfaces'

interface Props {
        product: IProduct;
    }

export const Product = (props: Props) => {
    const { _id, productName, description, price, stockQuantity, imageURL } = 
        props.product;
    
    return (
        <div className='product'><img src={imageURL} />
        </div>
    );
}