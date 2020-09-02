const express = require('express');
const router = express.Router();
const async  = require('express-async-await')
const fetch = require('node-fetch')
const googleTrends = require('google-trends-api');

router.get('/', async function(req, res, next) {
	function getHomepageData() {
		return fetch('https://content.guardianapis.com/search?order-by=newest&show-fields=starRating,headline,thumbnail,short-url&api-key=30e76b29-0dd8-4797-b589-9f220012a24a')
	}

	const processData = async () => {
		const fetchData = await getHomepageData();
		const responseData = await fetchData.json();
		console.log(responseData);
		res.status(200).send(responseData);
	}

	processData();
	res.end
});

router.get('/:category', async function(req, res, next) {
	const category = req.params.category;

	function getData() {
		if(category == "sports"){
			return fetch('https://content.guardianapis.com/sport?api-key=30e76b29-0dd8-4797-b589-9f220012a24a&show-blocks=all')
		}
		else if(category == "politics"){
			return fetch('https://content.guardianapis.com/politics?api-key=30e76b29-0dd8-4797-b589-9f220012a24a&show-blocks=all')
		}
		else if(category == "technology"){
			return fetch('https://content.guardianapis.com/technology?api-key=30e76b29-0dd8-4797-b589-9f220012a24a&show-blocks=all')
		}
		else if(category == "business"){
			return fetch('https://content.guardianapis.com/business?api-key=30e76b29-0dd8-4797-b589-9f220012a24a&show-blocks=all')
		}
		else if(category == "world"){
			return fetch('https://content.guardianapis.com/world?api-key=30e76b29-0dd8-4797-b589-9f220012a24a&show-blocks=all')
		}
		else if(category == "science"){
			return fetch('https://content.guardianapis.com/science?api-key=30e76b29-0dd8-4797-b589-9f220012a24a&show-blocks=all')
		}
		else if(category == "search"){
			const query = req.query.q;
			console.log(query)
			return fetch('https://content.guardianapis.com/search?q=' + query + '&api-key=30e76b29-0dd8-4797-b589-9f220012a24a&show-blocks=all')
		}
		

	}

	const processData = async () => {
		const fetchData = await getData();
		const responseData = await fetchData.json();
		console.log(responseData);
		res.status(200).send(responseData);
	}

	processData();
	res.end
});


module.exports = router
