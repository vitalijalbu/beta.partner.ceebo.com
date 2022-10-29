// import jwtDecode from 'jwt-decode';

const initialUser = () => {
  const token = window.localStorage.getItem('auth_token');

  return { authorized: !!token, loading: !!token };
};

export default initialUser;
