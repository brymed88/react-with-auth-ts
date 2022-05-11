import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { VerifyCode } from '../../../utils/AuthUtil';
import SpinnerComponent from '../../common/spinner/SpinnerComponent';

interface Props {
  workflow: (prev: string, target: string) => void;
  email: string;
  prevPage: string;
}

const VerifyComponent: React.FC<Props> = ({ workflow, email, prevPage }) => {
  // This type will be used later in the form.
  type FormData = {
    code: number;
    email: string;
  };
  //De-structure useForm import variables
  const {
    register,
    handleSubmit,
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

    if (data) {
      //Add user email from context to data object before validation
      data.email = `${email}`;

      const ProcessForm = async () => {
        //Call util function for api call to process code verification
        const response = await VerifyCode(data);

        //Successful login, redirect user to dashboard
        if (response.status === 'success') {
          //Disable loading spinner as action is now complete
          setLoading(false);

          switch (prevPage) {
            //if signup workflow
            case 'signup':
              workflow('verify', 'success');
              break;
            //if pass reset workflow
            case 'reset':
              workflow('verify', 'success');
              break;
            default:
          }
        } else {
          //Set form error for unsuccessful login
          setSubmitError(true);

          //Disable loading spinner as action is now complete
          setLoading(false);
        }
      };
      ProcessForm();
    }
  };

  return (
    <section className='verify'>
      <form onSubmit={handleSubmit(FormSubmit)}>
        {loading === true && <SpinnerComponent type='full' size='100px' />}

        {submitError === true && (
          <span className='loginError'>
            {/*Check if password mismatch error is set, if not then display generic error*/}
            Verification unsuccessful, please try again!
          </span>
        )}
        <h2>Verification Sent!</h2>
        <p>Please enter the six-digit code that was sent to your email.</p>
        <div className='inputs'>
          <input
            {...register('code', {
              required: true,
              pattern: /^[0-9]{6}$/,
            })}
            placeholder='Authorization Code'
          />

          {/* errors will return when field validation fails  */}
          {errors.code && <span>Please enter a 6 digit numeric code!</span>}
        </div>

        <input type='submit' value='Verify' />
      </form>
    </section>
  );
};
export default VerifyComponent;
