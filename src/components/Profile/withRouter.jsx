import { useParams, useNavigate, useLocation } from "react-router-dom";

export function withRouter(Component) {
  return function ComponentWithRouterProp(props) {
    return (
      <Component
        {...props}
        match={{ params: useParams() }}
        navigate={useNavigate()}
        location={useLocation()}
      />
    );
  };
}
