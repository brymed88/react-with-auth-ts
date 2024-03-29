import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Signup } from '../../../utils/AuthUtil';
import SpinnerComponent from '../../common/spinner/SpinnerComponent';

interface Props {
  workflow: (prev: string, target: string) => void;
  updateEmail: (email: string) => void;
}

const SignupComponent: React.FC<Props> = ({ workflow, updateEmail }) => {
  // This type will be used later in the form.
  type FormData = {
    email: string;
    password: string;
    vpassword: string;
  };

  //De-structure useForm import variables
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>();

  //Setup state variables for form functionality
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const FormSubmit = (data: FormData) => {
    //Reset submit status in case of past failure
    setSubmitError(false);

    //Set Loading spinner to true while form is processing
    setLoading(true);

    if (data.vpassword === data.password) {
      const ProcessForm = async () => {
        //Call util function to process api call for signup
        const response = await Signup(data);

        //Successful login, redirect user to dashboard
        if (response.status === 'success') {
          //Add user email to context
          updateEmail(data.email);

          //Disable loading spinner as action is now complete
          setLoading(false);

          //Call back for parent function to proceed to email code verification
          workflow('signup', 'verify');
        } else {
          //Set form error for unsuccessful login
          setSubmitError(true);

          //Disable loading spinner as action is now complete
          setLoading(false);
        }
      };
      ProcessForm();
    } else {
      //Set React-Hook-form error for verify password not matching
      setError('vpassword', {
        type: 'manual',
        message: 'Passwords must match!',
      });

      //Disable loading spinner as action is now complete
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(FormSubmit)}>
      {loading === true && <SpinnerComponent type='full' size='100px' />}

      {submitError === true && (
        <span className='loginError'>
          {/*Check if password mismatch error is set, if not then display generic error*/}
          Signup Failed, please try again!
        </span>
      )}

      <div className='inputs'>
        <input
          {...register('email', {
            required: true,
            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          })}
          placeholder='Email'
        />

        {/* errors will return when field validation fails  */}
        {errors.email && (
          <span>This field is required - ex. email@email.com</span>
        )}
      </div>

      <div className='inputs'>
        <input
          {...register('password', { required: true })}
          placeholder='Password'
        />
        {/* errors will return when field validation fails  */}
        {errors.password && <span>This field is required</span>}
      </div>

      {/* Add the Verify password field conditionally if form type is signup */}
      <div className='inputs'>
        <input
          {...register('vpassword', { required: true })}
          placeholder='Verify Password'
        />
        {errors.vpassword && (
          <span>
            {/*Check if password mismatch error is set, if not then display generic error*/}
            {errors.vpassword.message
              ? errors.vpassword.message
              : 'This field is required'}
          </span>
        )}
      </div>

      <input type='submit' value='Signup' />
      <div className='signup_disclaimer'>
        By creating this account, you agree to our{' '}
        <Link to='/privacy'>Privacy Policy</Link>
      </div>
    </form>
  );
};
export default SignupComponent;
