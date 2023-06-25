/* eslint-disable functional/no-conditional-statements */
/* eslint-disable functional/no-expression-statements */
import { useContext } from 'react';

import authContext from '../context';

const useAuth = () => useContext(authContext);

export default useAuth;
