import LoginComponent from './LoginComponent';
import SignupComponent from './SignupComponent';
import ResetComponent from './ResetComponent';
import PassResetComponent from './PassResetComponent';
import VerifyComponent from './VerifyComponent';
import SuccessComponent from './SuccessComponent';
import './AccountComponent.min.css';
import { useState } from 'react';

const AccountComponent = () => {
  const [userEmail, setUserEmail] = useState('');
  const [page, setPage] = useState('login');
  const [prevPage, setPrevPage] = useState('');

  const UpdateWorkflow = (prev: string, target: string) => {
    setPrevPage(prev);
    setPage(target);
  };

  const SetEmail = (email: string) => {
    setUserEmail(email);
  };

  //Get Form Context
  //const { page } = UseFormContext();

  let typeForm;

  switch (page) {
    case 'login':
      typeForm = <LoginComponent workflow={UpdateWorkflow} />;
      break;
    case 'signup':
      typeForm = (
        <SignupComponent workflow={UpdateWorkflow} updateEmail={SetEmail} />
      );

      break;
    case 'verify':
      typeForm = (
        <VerifyComponent
          workflow={UpdateWorkflow}
          prevPage={prevPage}
          email={userEmail}
        />
      );
      break;
    case 'reset':
      typeForm = (
        <ResetComponent workflow={UpdateWorkflow} updateEmail={SetEmail} />
      );
      break;
    case 'passreset':
      typeForm = (
        <PassResetComponent workflow={UpdateWorkflow} email={userEmail} />
      );
      break;
    case 'success':
      typeForm = (
        <SuccessComponent workflow={UpdateWorkflow} prevPage={prevPage} />
      );
      break;
    default:
  }
  return (
    <section className='account_component'>
      <div className='account_container'>
        {/*Only show tabs if the formtype is login or signup, else show back button*/}
        {page === 'login' || page === 'signup' ? (
          <div className='tabs'>
            <label
              className={page !== 'login' ? 'label_not_selected' : ''}
              onClick={() => {
                UpdateWorkflow('signup', 'login');
              }}
              id='login'>
              Login
            </label>

            <label
              className={page !== 'signup' ? 'label_not_selected' : ''}
              onClick={() => {
                UpdateWorkflow('login', 'signup');
              }}
              id='signup'>
              Signup
            </label>
          </div>
        ) : (
          page === 'reset' && (
            <img
              className='back_btn'
              src='./back.svg'
              alt='back to the login'
              onClick={() => {
                UpdateWorkflow('reset', 'login');
              }}
            />
          )
        )}
        {typeForm}
      </div>
    </section>
  );
};
export default AccountComponent;
