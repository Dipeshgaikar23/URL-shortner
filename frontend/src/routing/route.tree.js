import { createRootRoute } from "@tanstack/react-router"
import App from "../App"
import { homepageRoute } from "./homepage.route"
import { authRoute } from "./auth.route"
import { dashboardRoute } from "./dashboard.route"

export const rootRoute = createRootRoute({
  component: App
})

const routeTree = rootRoute.addChildren([
    homepageRoute, authRoute, dashboardRoute
])

export default routeTree