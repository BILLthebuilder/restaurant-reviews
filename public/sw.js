/*The following resource have been helpful in completing the project:
*https://developers.google.com/web/fundamentals/primers/service-workers/
*/

//Collecting all the app's assets in an array for caching
const cacheData = [
	'/',
	'/index.html',
	'/restaurant.html',
	'/css/styles.css',
	'/js/dbhelper.js',
	'/js/main.js',
	'/js/restaurant_info.js',
	'/data/restaurants.json',
	'/img/1.jpg',
	'/img/2.jpg',
	'/img/3.jpg',
	'/img/4.jpg',
	'/img/5.jpg',
	'/img/6.jpg',
	'/img/7.jpg',
	'/img/8.jpg',
	'/img/9.jpg',
	'/img/10.jpg'

];

//Checking if the serviceworker is installed and then caching the app's assets from the array above
self.addEventListener('install', e => {
	e.waitUntil(
		caches.open('v1').then(cache => {
			return cache.addAll(cacheData);
		})
	);
});

//add fetch event listener to return or update cached responses
self.addEventListener('fetch', e => {
	e.respondWith(
		caches.match(e.request).then(response => {
			if (response) {
				return response;
			}
			else {
				return fetch(e.request)
					.then(response => {
						const responseClone = response.clone();
						caches.open('v1').then(cache => {
							cache.put(e.request, responseClone);
						})
						return response;
					})
					.catch(function (err) {
						console.error(err);
					});
			}
		})
	);
});
