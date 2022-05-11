import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { PassReset } from '../../../utils/AuthUtil';
import SpinnerComponent from '../../common/spinner/SpinnerComponent';

interface Props {
  workflow: (prev: string, target: string) => void;
  email: string;
}

const PassResetComponent: React.FC<Props> = ({ workflow, email }) => {
  // This type will be used later in the form.
  type User = {
    password: string;
    verifypassword: string;
  };
  //De-structure useForm import variables
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<User>();

  //Setup state variables for form functionality
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const FormSubmit = (data: User) => {
    //Reset submit status in case of past failure
    setSubmitError(false);

    //Set Loading spinner to true while form is processing
    setLoading(true);

    if (data.verifypassword === data.password) {
      const ProcessForm = async () => {
        //Build value object to send to api
        const values = { email: `${email}`, password: data.password };

        //Call util function to process api call for pass reset
        const response = await PassReset(values);

        //Successful login, redirect user to dashboard
        if (response.status === 'success') {
          //Disable loading spinner as action is now complete
          setLoading(false);

          //Set the context pages
          workflow('passreset', 'success');
        } else {
          //Disable loading spinner as action is now complete
          setLoading(false);

          //Set form error for unsuccessful login
          setSubmitError(true);
        }
      };
      ProcessForm();
    } else {
      //Disable loading spinner as action is now complete
      setLoading(false);

      //Set React-Hook-form error for verify password not matching
      setError('verifypassword', {
        type: 'manual',
        message: 'Passwords must match!',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(FormSubmit)}>
      {loading === true && <SpinnerComponent type='full' size='100px' />}
      <h2>Please enter a new password</h2>
      {submitError === true && (
        <span className='loginError'>
          {/*Check if password mismatch error is set, if not then display generic error*/}
          Password reset failed, please try again!
        </span>
      )}

      <div className='inputs'>
        <input
          {...register('password', { required: true })}
          placeholder='Password'
        />
        {/* errors will return when field validation fails  */}
        {errors.password && <span>Field required</span>}
      </div>

      {/* Add the Verify password field conditionally if form type is pass reset */}
      <div className='inputs'>
        <input
          {...register('verifypassword', { required: true })}
          placeholder='Verify Password'
        />
        {errors.verifypassword && (
          <span>
            {/*Check if password mismatch error is set, if not then display generic error*/}
            {errors.verifypassword.message
              ? errors.verifypassword.message
              : 'Field Required'}
          </span>
        )}
      </div>

      <input type='submit' value='Confirm' />
    </form>
  );
};

export default PassResetComponent;
