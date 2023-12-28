import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';

export function ProtectedStudent({ children }) {
  const infoStudent = JSON.parse(localStorage.getItem('info_student'));
  const tokenAdmin = Cookies.get('accessTokenStudent');
  return tokenAdmin && infoStudent ? children : <Navigate to={'/'} replace />;
}
