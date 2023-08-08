import Client from 'sockjs-client/dist/sockjs.min.js';
import { CompatClient, Stomp } from '@stomp/stompjs';

export const stompClient = Stomp.over(() => {
  const socket = new Client('https://devprofile.store/api/wss/chat');
  return socket;
});

export const getSocket = (): CompatClient => {
  return stompClient;
};
