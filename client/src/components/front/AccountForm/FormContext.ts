import { createContext } from 'react';

interface UserContextInterface {
  email: string;
  prevPage: string;
  page: string;
}
const defaultState = {
  email: 'test@gmail.com',
  prevPage: 'login',
  page: 'login',
};
const AccountCTX = createContext<UserContextInterface>(defaultState);

/*export function UseFormContext() {
  let context = useContext(UserCTX);
  if (context === null) {
    throw Error('null');
  }
  return context;
}
*/
export default AccountCTX;
