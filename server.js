const app = require('./src/app');

const PORT = 6060;

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
