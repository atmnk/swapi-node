export const API_URLS = (key, params) => {
    const routes = {
        LOGIN: `/api/login`,
        GET_ALL_PERSONAS: `/api/people`
	};
	return routes[key];
};

export function getApiUrl(key, { ...params } = {}) {
    return API_URLS(key, params);
}
