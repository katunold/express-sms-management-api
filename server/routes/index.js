import router from 'express-promise-router';
import { routes } from "./user.routes";

export const appRoutes = () => {
    const route = router();

    routes(route);

    return route;
};
