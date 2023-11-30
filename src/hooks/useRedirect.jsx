import { useNavigate } from 'react-router-dom';

const useRedirect = () => {
  const navigate = useNavigate();

  const redirectToAnotherPage = () => {
    navigate('/');
  };

  return redirectToAnotherPage;
};

export default useRedirect;