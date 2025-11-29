// Nama cache. Ubah versi (misalnya v1.1) setiap kali Anda mengubah aset yang dicache.
const CACHE_NAME = 'craftinova-cache-v1';

// Daftar aset penting yang harus dicache segera
const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    '/favicon.ico',
    '/logo192.png',
    '/logo512.png',
    // Anda harus menambahkan file statis lain dari folder public di sini
    // Contoh: '/assets/data/initial_crafts.json'
];

/**
 * Event Listener: 'install'
 * Membuka cache dan menambahkan semua aset statis di `urlsToCache`.
 */
self.addEventListener('install', (event) => {
    console.log('Service Worker: Instalasi dimulai.');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Service Worker: Cache aset statis.');
                return cache.addAll(urlsToCache);
            })
            .catch(err => {
                console.error('Service Worker: Gagal meng-cache aset:', err);
            })
    );
    self.skipWaiting(); // Memaksa service worker baru untuk aktif segera
});

/**
 * Event Listener: 'activate'
 * Membersihkan cache lama.
 */
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    // Hapus cache yang namanya berbeda dengan CACHE_NAME saat ini
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        console.log('Service Worker: Menghapus cache lama:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    return self.clients.claim();
});


/**
 * Event Listener: 'fetch'
 * Menerapkan strategi Cache-First untuk aset (jika ada di cache, segera kembalikan).
 */
self.addEventListener('fetch', (event) => {
    // Hanya tangani permintaan GET
    if (event.request.method !== 'GET') return;
    
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // 1. Jika respons ditemukan di cache, kembalikan itu
                if (response) {
                    return response;
                }

                // 2. Jika tidak, lakukan permintaan jaringan normal
                return fetch(event.request)
                    .then((response) => {
                        // Cek respons yang valid
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Kloning respons untuk disimpan ke cache dan digunakan
                        const responseToCache = response.clone();

                        // Simpan respons jaringan baru ke cache
                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    })
                    .catch(error => {
                        // Tangani kegagalan jaringan di sini (misalnya, jika pengguna benar-benar offline)
                        console.error('Service Worker: Gagal mengambil aset:', error);
                        // Anda dapat mengembalikan respons fallback (misalnya halaman offline kustom)
                    });
            })
    );
});