import { useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { doRequest, errorStyling, ErrorHelpText, MiscErrors } = useRequest({
    url: '/api/users/signup',
    method: 'post',
    body: { email, password },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    doRequest()
      .then(() => Router.push('/'))
      .catch(console.error);
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Sign up</h1>
      <div className="form-group">
        <label>Email Address</label>
        <div className="input-group">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            {...errorStyling('email')}
          />
          <ErrorHelpText fieldName="email" />
        </div>
      </div>
      <div className="form-group">
        <label>Password</label>
        <div className="input-group">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            {...errorStyling('password')}
          />
          <ErrorHelpText fieldName="password" />
        </div>
      </div>
      <MiscErrors />
      <button className="btn btn-primary">Sign Up</button>
    </form>
  );
}
