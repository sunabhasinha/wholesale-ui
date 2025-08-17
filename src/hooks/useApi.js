'use client';

import React from 'react';

import { useState, useCallback } from 'react';

// Generic hook for API calls with loading and error states
export const useApi = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const execute = useCallback(async (apiCall) => {
		try {
			setLoading(true);
			setError(null);
			const result = await apiCall();
			return result;
		} catch (err) {
			setError(err.message || 'An error occurred');
			throw err;
		} finally {
			setLoading(false);
		}
	}, []);

	const clearError = useCallback(() => {
		setError(null);
	}, []);

	return { execute, loading, error, clearError };
};

// Hook for fetching data with loading state
export const useFetch = (fetchFunction, dependencies = []) => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const refetch = useCallback(async () => {
		try {
			setLoading(true);
			setError(null);
			const result = await fetchFunction();
			setData(result);
		} catch (err) {
			setError(err.message || 'An error occurred');
		} finally {
			setLoading(false);
		}
	}, dependencies);

	// Initial fetch
	React.useEffect(() => {
		refetch();
	}, [refetch]);

	return { data, loading, error, refetch };
};
