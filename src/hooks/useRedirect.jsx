import { useNavigate } from 'react-router-dom';

const useRedirect = () => {
  const navigate = useNavigate();

  const redirectToAnotherPage = (route) => {
    navigate(route);
  };

  return redirectToAnotherPage;
};

export default useRedirect;