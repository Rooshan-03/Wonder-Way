import { setError, setLoading } from "../Redux/ParentSlice";

export const ValidateLogin = (email, password, dispatch) => {
    dispatch(setLoading());

    if (!email || !password) {
        dispatch(setError("Email and Password are required."));
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        dispatch(setError("Please enter a valid email address."));
        return false;
    }

    if (password.length < 6) {
        dispatch(setError("Password must be at least 6 characters long."));
        return;
    }
    return true
}


    export const ValidateRegistration = (name, email, password, confirmPassword, dispatch) => {
        if (!name || !email || !password) {
            dispatch(setError("All fields are required."));
            return false;
        }
        if (password!=confirmPassword) {
            dispatch(setError("Please Confirm Your Password"));
            return false;
        }
        if (name.trim().length <= 4) {
            dispatch(setError("Name must be more than 4 characters long."));
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            dispatch(setError("Please enter a valid email address."));
            return false;
        }

        if (password.length < 6) {
            dispatch(setError("Password must be at least 6 characters."));
            return false;
        }

        return true;
    };
