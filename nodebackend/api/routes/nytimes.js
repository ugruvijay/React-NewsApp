const express = require('express');
const router = express.Router();
const async  = require('express-async-await')
const fetch = require('node-fetch')

router.get('/', async function(req, res, next) {
	function getHomepageData() {
		return fetch('https://api.nytimes.com/svc/topstories/v2/home.json?api-key=9xX4GcQ9DeeK7l4gCvgoAdMVFpJYhwtG')
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
			return fetch('https://api.nytimes.com/svc/topstories/v2/sports.json?api-key=9xX4GcQ9DeeK7l4gCvgoAdMVFpJYhwtG')
		}
		else if(category == "politics"){
			return fetch('https://api.nytimes.com/svc/topstories/v2/politics.json?api-key=9xX4GcQ9DeeK7l4gCvgoAdMVFpJYhwtG')
		}
		else if(category == "technology"){
			return fetch('https://api.nytimes.com/svc/topstories/v2/technology.json?api-key=9xX4GcQ9DeeK7l4gCvgoAdMVFpJYhwtG')
		}
		else if(category == "business"){
			return fetch('https://api.nytimes.com/svc/topstories/v2/business.json?api-key=9xX4GcQ9DeeK7l4gCvgoAdMVFpJYhwtG')
		}
		else if(category == "world"){
			return fetch('https://api.nytimes.com/svc/topstories/v2/world.json?api-key=9xX4GcQ9DeeK7l4gCvgoAdMVFpJYhwtG')
		}
		else if(category == "search"){
			const query = req.query.q;
			console.log(query)
			return fetch('https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + query + '&api-key=9xX4GcQ9DeeK7l4gCvgoAdMVFpJYhwtG')
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
