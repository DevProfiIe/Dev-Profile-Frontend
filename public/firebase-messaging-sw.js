/*eslint no-undef: "off"*/

self.addEventListener('install', function (e) {
  console.log('fcm sw install..');
  self.skipWaiting();
});

self.addEventListener('activate', function (e) {
  console.log('fcm sw activate..');
});

self.addEventListener('push', function (e) {
  console.log(e);

  console.log('push: ', e.data.json());
  if (!e.data.json()) return;

  // const resultData = e.data.json().notification;

  // const notificationTitle = resultData.data.title;
  // const notificationOptions = {
  //   body: resultData.data.body,
  //   icon: '',
  // };
  // console.log('push: ', { resultData, notificationTitle, notificationOptions });

  self.registration.showNotification('Dev-Profile', { body: '알림' });
});

self.addEventListener('notificationclick', function (event) {
  console.log('notification click');
  const url = '/';
  event.notification.close();
  event.waitUntil(clients.openWindow(url));
});
