import { useState, useRef, useCallback } from 'react';
import { QueryClient } from '@tanstack/react-query';

let BASE_URL = 'http://localhost:3000';

export const getClient = (() => {
	let client: QueryClient | null = null;
	return () => {
		if (!client)
			client = new QueryClient({
				defaultOptions: {
					queries: {
						cacheTime: 1000 * 60 * 60 * 24,
						staleTime: 1000 * 60,
						refetchOnWindowFocus: false,
						refetchOnMount: false,
					},
				},
			});
		return client;
	};
})();

export const fetcher = async ({
	method,
	path,
	body,
	params,
}: {
	method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
	path: any;
	body?: { [key: string]: any };
	params?: { [key: string]: any };
}) => {
	try {
		if (path.indexOf('products') !== -1) {
			BASE_URL = 'https://fakestoreapi.com';
		}

		let url = `${BASE_URL}${path}`;
		const fetchOptions: RequestInit = {
			method,
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': BASE_URL,
			},
		};

		if (params) {
			const searchParams = new URLSearchParams(params);
			url += '?' + searchParams.toString();
		}

		if (body) fetchOptions.body = JSON.stringify(body);

		const res = await fetch(url, fetchOptions);
		const json = await res.json();

		console.log('res', res);

		return json;
	} catch (err) {
		console.error(err);
	}
};

export const QueryKeys = {
	PRODUCTS: 'PRODUCTS',
};


// useInfiniteScroll.ts
interface BlogPost {
	id: string;
	title: string;
	description: string;
}

export interface UseInfiniteScroll {
	isLoading: boolean;
	loadMoreCallback: (el: HTMLDivElement) => void;
	hasDynamicPosts: boolean;
	dynamicPosts: BlogPost[];
	isLastPage: boolean;
}

// create a custom hook
export const useInfiniteScroll = (posts: BlogPost[]): UseInfiniteScroll => {
	const [isLoading, setIsLoading] = useState(false);
	const [page, setPage] = useState(1);
	const [hasDynamicPosts, setHasDynamicPosts] = useState(false);
	const [dynamicPosts, setDynamicPosts] = useState<BlogPost[]>(posts);
	const [isLastPage, setIsLastPage] = useState(false);
	const observerRef = useRef<IntersectionObserver>();
	const loadMoreTimeout: NodeJS.Timeout = setTimeout(() => null, 500);
	const loadMoreTimeoutRef = useRef<NodeJS.Timeout>(loadMoreTimeout);

	const handleObserver = useCallback(
		(entries: any[]) => {
		const target = entries[0];
		if (target.isIntersecting) {
			setIsLoading(true);
			clearTimeout(loadMoreTimeoutRef.current);

			// this timeout debounces the intersection events
			loadMoreTimeoutRef.current = setTimeout(() => {
				// should change to reqct-query
				// axios.get(`/api/posts/${page}`).then((resp) => {
				// 	setPage(page + 1);
				// 	const newPosts = resp?.data["posts"];

				// 	if (newPosts?.length) {
				// 	const newDynamicPosts = [...dynamicPosts, ...newPosts];
				// 	setDynamicPosts(newDynamicPosts);
				// 	setIsLastPage(newDynamicPosts?.length === resp?.data["total"]);
				// 	setHasDynamicPosts(true);
				// 	setIsLoading(false);
				// 	}
				// });
			}, 500);
		}
	},
	[loadMoreTimeoutRef, setIsLoading, page, dynamicPosts]
);

const loadMoreCallback = useCallback(
	(el: HTMLDivElement) => {
		if (isLoading) return;
		if (observerRef.current) observerRef.current.disconnect();

		const option: IntersectionObserverInit = {
			root: null,
			rootMargin: "0px",
			threshold: 1.0,
		};
		observerRef.current = new IntersectionObserver(handleObserver, option);

		if (el) observerRef.current.observe(el);
		},
		[handleObserver, isLoading]
	);

	return {
		isLoading,
		loadMoreCallback,
		hasDynamicPosts,
		dynamicPosts,
		isLastPage,
	};
};