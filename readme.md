## GoIT Node.js Pets Support

### Команди:

- `npm start` &mdash; старт сервера в режимі production
- `npm run start:dev` &mdash; старт сервера в режимі розробки (development)
- `npm run lint` &mdash; запустити виконання перевірки коду з eslint, необхідно виконувати перед кожним PR та виправляти всі помилки лінтера
- `npm lint:fix` &mdash; та ж перевірка лінтера, але з автоматичними виправленнями простих помилок

### Файл ENV:

PORT=3001
REFRESH_JWT_SECRET =iPp-K1)(3zbf:FK
ACCESS_JWT_SECRET=d)LYb7{RHJO[oT?
MONGO_URL=mongodb+srv://admin:jQGTdoY5FnUU7oc9@cluster0.0nfzmbk.mongodb.net/petsSupport?retryWrites=true&w=majority
CLOUD_NAME=dsrjlhmr8
API_KEY=479195967513525
API_SECRET= bOX5WgXeFP4kUFLN4jaNqsUEAH8
http://localhost:3001/api/api-docs/
https://petssupportback-production.up.railway.app/api/api-docs

для Макса
const { HttpError } = require("../../helpers");
const { Notice } = require("../../models/noticesSchema");
const queryList = ["sell", "lost", "goodhands"];

const getNoticeByCategory = async (req, res) => {
const { category = "", page = 1, limit = 8 } = req.query;
const skip = (page - 1) \* limit;

if (category === "") {
const result = await Notice.find({})
.sort({ updatedAt: -1 })
.skip(skip)
.limit(limit);
res.status(200).json(result);
} else if (!queryList.includes(category)) {
throw HttpError(
400,
`Bad Request:Your request must include something from this list: ${queryList.join(
        ","
      )}`
);
} else {
const result = await Notice.find({ category })
.sort({ updatedAt: -1 })
.skip(skip)
.limit(limit);
res.status(200).json(result);
}
};

module.exports = getNoticeByCategory;
