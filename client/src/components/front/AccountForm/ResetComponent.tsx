import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { GenerateCode } from '../../../utils/AuthUtil';
import SpinnerComponent from '../../common/spinner/SpinnerComponent';

interface Props {
  workflow: (prev: string, target: string) => void;
  updateEmail: (email: string) => void;
}

const ResetComponent: React.FC<Props> = ({ workflow, updateEmail }) => {
  // This type will be used later in the form.
  type User = {
    email: string;
  };

  //De-structure useForm import variables
  const {
    register,
    handleSubmit,
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

    if (data) {
      const ProcessForm = async () => {
        //Call util function to process api call and generate one-time code
        const response = await GenerateCode(data);

        //Successful login, redirect user to dashboard
        if (response.status === 'success') {
          //Add user email to context
          updateEmail(data.email);
          //Disable loading spinner as action is now complete
          setLoading(false);

          //If the pass reset code has been sent to user and api returns successfull. Navigate to verify page.
          workflow('reset', 'verify');
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
    <form onSubmit={handleSubmit(FormSubmit)}>
      <h2>Password Reset</h2>

      {loading === true && <SpinnerComponent type='full' size='100px' />}

      {submitError === true && (
        <span className='loginError'>
          {/*Check if password mismatch error is set, if not then display generic error*/}
          Verification unsuccessful, please try again!
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

      <input type='submit' value='Send' />
    </form>
  );
};
export default ResetComponent;
