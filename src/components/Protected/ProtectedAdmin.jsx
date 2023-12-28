import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';

export function ProtectedAdmin({ children }) {
  const infoAdmin = JSON.parse(localStorage.getItem('info_admin'));
  const tokenAdmin = Cookies.get('accessTokenAdmin');
  return tokenAdmin && infoAdmin ? children : <Navigate to={'/'} replace />;
}
