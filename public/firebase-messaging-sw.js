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

  self.registration.showNotification('Dev-Profile', { body: receiveData.body });
});

self.addEventListener('notificationclick', function (event) {
  console.log('notification click');
  const url = '/';
  event.notification.close();
  event.waitUntil(clients.openWindow(url));
});
