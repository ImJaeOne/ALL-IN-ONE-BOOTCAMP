const express = require('express');
const cors = require('cors');
const app = express();
const models = require('./models');
const port = 3004;

app.use(express.json());
app.use(cors());

app.get('/products', (req, res) => {
    models.Product.findAll()
        .then((result) => {
            res.send({ products: result });
        })
        .catch((error) => {
            console.error(error);
            res.send('상품 정보를 불러오지 못했습니다.');
        });
});

app.post('/products', (req, res) => {
    const body = req.body;
    const { name, price, seller, description } = body;
    if (!name || !price || !seller || !description) {
        res.send('모든 필드를 입력해주세요.');
    }
    models.Product.create({
        name,
        price,
        seller,
        description,
    })
        .then((result) => {
            console.log('상품 생성 결과 : ', result);
            res.send(result);
        })
        .catch((error) => {
            console.error(error);
            res.send('상품 업로드에 문제가 발생했습니다.');
        });
});

app.get('/products/:id', (req, res) => {
    const params = req.params;
    const { id } = params;
    models.Product.findOne({
        where: {
            id: id,
        },
    })
        .then((result) => {
            console.log(result);
            res.send({ product: result });
        })
        .catch((error) => {
            console.log(error);
            res.send('상품 조회에 오류가 발생하였습니다.');
        });
});

app.listen(port, () => {
    console.log('그랩의 쇼핑몰 서버가 돌아가고 있습니다.');
    models.sequelize
        .sync()
        .then(() => {
            console.log('DB 연결 성공');
        })
        .catch((err) => {
            console.error(err);
            console.log('DB 연결 실패');
            process.exit();
        });
});