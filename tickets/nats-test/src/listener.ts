import nats, { Message } from 'node-nats-streaming';
import { randomBytes } from 'crypto';

console.clear();

const client = nats.connect('docker-desktop', randomBytes(4).toString('hex'), {
  url: 'http://localhost:4222',
});

client.on('connect', () => {
  console.log('Listener connected to NATS');

  const options = client.subscriptionOptions().setManualAckMode(true);
  const subscription = client.subscribe(
    'ticket:created',
    'listenerQueueGroup',
    options
  );

  subscription.on('message', (msg: Message) => {
    const data = msg.getData();
    const subject = msg.getSubject();
    const num = msg.getSequence();
    console.log(num, 'Message received on', subject, data);
    msg.ack();
  });
});
