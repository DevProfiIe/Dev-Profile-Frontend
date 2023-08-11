/*eslint no-undef: "off"*/

self.addEventListener('install', function (e) {
  console.log('fcm sw install..');
  self.skipWaiting();
});

self.addEventListener('activate', function (e) {
  console.log('fcm sw activate..');
});

self.addEventListener('push', function (e) {
  const receiveData = e.data.json();
  if (!e.data.json()) return;

  setTimeout(() => {
    self.registration.showNotification('Dev-Profile', { body: receiveData.data.body });
  }, 17000);
});

self.addEventListener('notificationclick', function (event) {
  console.log('notification click');
  const url = '/mypage';
  event.notification.close();
  event.waitUntil(clients.openWindow(url));
});
