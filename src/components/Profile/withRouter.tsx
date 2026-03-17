import { useParams, useNavigate, useLocation } from "react-router-dom";

type WithRouterProps = {
  router: {
    params: ReturnType<typeof useParams>
    navigate: ReturnType<typeof useNavigate>
    location: ReturnType<typeof useLocation>
  }
}

export function withRouter<P extends object>(Component: React.ComponentType<P & WithRouterProps>) {
  return function ComponentWithRouterProp(props: P) {
    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    return <Component {...props} router={{ params, navigate, location }} />;
  };
}

