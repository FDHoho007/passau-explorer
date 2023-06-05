self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.open('dynamic').then(async function (cache) {
            const response = await cache.match(event.request);
            return (
                response ||
                fetch(event.request).then(function (response_1) {
                    cache.put(event.request, response_1.clone());
                    return response_1;
                })
            );
        }),
    );
});