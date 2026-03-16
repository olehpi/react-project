import Preloader from "../components/common/Preloader/Preloader";
import { Suspense } from "react";

export const withSuspense = (Component: React.ComponentType) => {
    return (props: any) => {
        return <Suspense fallback={<Preloader />} >
            <Component {...props} />
        </Suspense>
    };
}