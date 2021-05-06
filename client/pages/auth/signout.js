import Router from 'next/router';
import { useEffect } from 'react';
import useRequest from '../../hooks/use-request';

export default function SignOut() {
  const { doRequest } = useRequest({
    url: '/api/users/signout',
    method: 'POST',
    body: {},
  });

  useEffect(() => {
    doRequest()
      .then(() => Router.push('/'))
      .catch(console.error);
  });

  return <div>Signing you out...</div>;
}
