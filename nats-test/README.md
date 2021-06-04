# NATS Streaming Server Test

This is simply an environment to test and play with NATS Streaming Server

## Running

To run a publisher, run `npm run publish`

To run a listener, run `npm run listen`

## Troubleshooting

If you run either a publisher or listener and get an error about not connecting,
simply run the following:

```
kubectl port-forward <name-of-the-nats-depl-pod> 4222:4222
```
