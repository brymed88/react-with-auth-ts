import React, { useState, useEffect, ReactElement, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { VerifyJWTUtil } from '../../../utils/VerifyJWTUtil';
import { VerifyLocalAuth } from '../../../utils/LocalAuthUtil';

import SpinnerComponent from '../spinner/SpinnerComponent';

const PrivateRouteComponent = ({
  children,
}: {
  children: ReactNode;
}): ReactElement => {
  const [isAuth, setIsAuth] = useState(Boolean);

  //Verify JWT token on page load and set useState based on response
  useEffect(() => {
    const localAuth = VerifyLocalAuth();

    const isSessionValid = async () => {
      //Check for local token first before api call
      if (localAuth.status === 'valid') {
        const serverAuth = await VerifyJWTUtil();

        if (serverAuth.status === 'success') {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      } else {
        setIsAuth(false);
      }
    };
    isSessionValid();
  }, []);

  if (isAuth === true) {
    return <section className='dashboard'>{children}</section>;
  } else if (isAuth === false) {
    return <Navigate to='/login' />;
  } else {
    return <SpinnerComponent type='full' size='60px' />;
  }
};

export default PrivateRouteComponent;
