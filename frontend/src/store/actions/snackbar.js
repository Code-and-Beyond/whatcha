export const SET_ALERT = "SET_ALERT";

export const setAlert = (alertType, text, show = true) => {
    return {
        type: SET_ALERT,
        alertType,
        show,
        text
    }
};
