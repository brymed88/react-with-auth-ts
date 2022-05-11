interface Props {
  workflow: (prev: string, target: string) => void;
  prevPage: string;
}

const SuccessComponent: React.FC<Props> = ({ workflow, prevPage }) => {
  let message;

  switch (prevPage) {
    case 'verify':
      message = 'Verification successful!';
      break;
    case 'passreset':
      message = 'Password reset successful!';
      break;
    default:
  }

  return (
    <section className='success_enroll'>
      <h2>{message}</h2>
      <input
        type='submit'
        onClick={() => {
          workflow('success', 'login');
        }}
        value='Please Login'
      />
    </section>
  );
};

export default SuccessComponent;
