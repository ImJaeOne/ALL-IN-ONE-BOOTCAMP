import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './index.css';

function ProductPage() {
    const { id } = useParams();
    // const params = useParams();
    // console.log('params : ', params);
    // const id = params.id;
    // console.log('a :', id);
    const [product, setProduct] = useState(null);
    useEffect(function () {
        axios
            .get(`http://localhost:3004/products/${id}`)
            .then(function (result) {
                setProduct(result.data.product);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    if (product === null) {
        return <h1>상품 정보를 받고 있습니다...</h1>;
    }
    return (
        <div>
            <div id="image-box">
                <img src={'/' + product.imageUrl} alt="product-img" />
            </div>
            <div id="profile-box">
                <img src="/images/icons/avatar.png" alt="avatar" />
                <span>{product.seller}</span>
            </div>
            <div id="contents-box">
                <div id="name">{product.name}</div>
                <div id="price">{product.price}원</div>
                <div id="createdAt">{product.createdAt}</div>
                <div id="description">{product.description}</div>
            </div>
        </div>
    );
}

export default ProductPage;
