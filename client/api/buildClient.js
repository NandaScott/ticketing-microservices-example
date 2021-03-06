import axios from 'axios';

export default function buildClient({ req }) {
  if (typeof window === 'undefined') {
    // We are on the server
    // servicename.namespacename.svc.cluster.local
    return axios.create({
      baseURL:
        'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
      headers: req.headers,
    });
  } else {
    // We must be on the browser
    return axios.create({
      baseURL: '/',
    });
  }
}
