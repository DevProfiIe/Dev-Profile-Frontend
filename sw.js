self.addEventListener('install', (e: ExtendableE) => {
  console.log('[Service Worker], installed');
});

self.addEventListener('activate', (e) => {
  console.log('[Service Worker], activate', e);
});

self.addEventListener('fetch', (e) => {
  console.log('[Service Worker] fetched resource ' + e.request.url);
});

// async function subscribePushManager(
//   serviceWorkerRegistration: ServiceWorkerRegistration,
// ): PushSubscription {
//   return await serviceWorkerRegistration.pushManager.subscribe({
//     userVisibleOnly: true,
//     applicationServerKey:
//       'MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAET08L-czBDbeYaChi_th4pIst3MLGDHsmrSMTttloAXPA-C7n9yOmRdh93re2aoo_vqvDpyP5vxTNWyjPrfaCbA..',
//   });
// }

// self.addEventListener('push', function (event) {
//   const options = {
//     body: event.data.text(),
//     icon: 'images/icon.png',
//     badge: 'images/badge.png',
//   };
//   event.waitUntil(self.registration.showNotification('Push Notification', options));
// });

// //  웹페이지 서비스워커등록
// if ('serviceWorker' in navigator && 'PushManager' in window) {
//   navigator.serviceWorker
//     .register('service-worker.js')
//     .then(function (swReg) {
//       console.log('Service Worker is registered', swReg);
//       swRegistration = swReg;
//     })
//     .catch(function (error) {
//       console.error('Service Worker Error', error);
//     });
// }
// //  사용자에게 푸시알림 허용할것인지 물어보기
// Notification.requestPermission(function (status) {
//   console.log('Notification permission status:', status);
// });

// //  VAPID 키 구독하기
// function subscribeUserToPush() {
//   const publicKey = 'YOUR_PUBLIC_VAPID_KEY_FROM_BACKEND';
//   swRegistration.pushManager
//     .subscribe({
//       userVisibleOnly: true,
//       applicationServerKey: publicKey,
//     })
//     .then(function (subscription) {
//       console.log('User is subscribed:', subscription);
//       // 백엔드로 구독 정보 전송
//       updateSubscriptionOnServer(subscription);
//     })
//     .catch(function (err) {
//       console.log('Failed to subscribe the user: ', err);
//     });
// }

// //  구독 정보 서버에 업데이트
// function updateSubscriptionOnServer(subscription) {
//   // TODO: 서버에 사용자의 구독 정보를 보내고 저장합니다.
//   const userName = 'YOUR_USERNAME'; // 예를 들어 로그인된 사용자 이름
//   fetch('/subscribe', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       userName: userName,
//       subscription: subscription,
//     }),
//   });
// }

// //  푸시 알림 발송 요청하기
// function sendNotification() {
//   const userName = 'YOUR_USERNAME';
//   const payload = 'Hello, this is a notification';
//   fetch('/send', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       userName: userName,
//       payload: payload,
//     }),
//   });
// }
