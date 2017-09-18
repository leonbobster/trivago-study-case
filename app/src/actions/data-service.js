export function get(url, successHandler, loadingHandler, errorHandler) {
    return dispatch => {
        dispatch(loadingHandler(true));
        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(loadingHandler(false));
                return response.json();
            })
            .then(items => dispatch(successHandler(items)))
            .catch(() => dispatch(errorHandler(true)));
    };
};