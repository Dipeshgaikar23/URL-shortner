import { login } from "../store/slice/authSlice";
import { redirect } from "@tanstack/react-router";
import { getCurrentUser } from "../apis/user.api";

export const checkAuth = async ({ context }) => {
    try {
        const { queryClient, store } = context
        const user = await queryClient.ensureQueryData({
            queryKey: ['currentUser'],
            queryFn: getCurrentUser,
            retry: false
        })
        if(!user) return false;

        store.dispatch(login(user))
        const {isAuthentiacated} = store.getState().auth
        if(!isAuthentiacated) return false
        return true
    } catch (error) {
        return redirect({ to: '/auth' })
    }
}