import Head from '../../pages/front/parts/Head';
import Foot from '../../pages/front/parts/Foot';
import { Outlet } from 'react-router-dom';

import '../../normalize.min.css';
import './index.min.css';
import React, { ReactElement, ReactNode } from 'react';

const FrontLayout = ({ children }: { children?: ReactNode }): ReactElement => {
  return (
    <section>
      <Head />
      <main className='page-container'>
        <Outlet />
        {children}
      </main>
      <Foot />
    </section>
  );
};

export default FrontLayout;
