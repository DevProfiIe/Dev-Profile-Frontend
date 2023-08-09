self.addEventListener('install', (e) => {
  console.log('[Service Worker], installed');
});

self.addEventListener('activate', (e) => {
  console.log('[Service Worker], activate', e);
});

self.addEventListener('fetch', (e) => {
  console.log('[Service Worker] fetched resource ' + e.request.url);
});

async function subscribePushManager(
  serviceWorkerRegistration: ServiceWorkerRegistration,
): PushSubscription {
  return await serviceWorkerRegistration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey:
      'MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAET08L-czBDbeYaChi_th4pIst3MLGDHsmrSMTttloAXPA-C7n9yOmRdh93re2aoo_vqvDpyP5vxTNWyjPrfaCbA..',
  });
}
