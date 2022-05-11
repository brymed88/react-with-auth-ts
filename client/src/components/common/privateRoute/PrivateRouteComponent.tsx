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
  const [load, setLoad] = useState(true);

  //Verify JWT token on page load and set useState based on response
  useEffect(() => {
    const localAuth = VerifyLocalAuth();
    const isSessionValid = async () => {
      //Check for local token first before api call
      if (localAuth.status === 'valid') {
        const serverAuth = await VerifyJWTUtil();

        if (serverAuth.status === 'success') {
          setLoad(false);
          setIsAuth(true);
        } else {
          setLoad(false);
          setIsAuth(false);
        }
      } else {
        setLoad(false);
        setIsAuth(false);
      }
    };
    isSessionValid();
  }, []);

  if (load === true) {
    return <SpinnerComponent type='full' size='60px' />;
  } else {
    if (isAuth === true) {
      return <section className='dashboard'>{children}</section>;
    } else if (isAuth === false) {
      return <Navigate to='/login' />;
    }
  }
  //default return for typescript
  return <SpinnerComponent type='full' size='60px' />;
};

export default PrivateRouteComponent;
