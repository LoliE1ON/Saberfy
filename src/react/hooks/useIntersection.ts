import { useState, useEffect } from "react";

export const useIntersection = (element: any): boolean => {
	const [isVisible, setState] = useState(false);
	const handler = (a: any[], b: any) => {
		for (const item of a) {
			setState(item.isIntersecting);
		}
	};

	useEffect(() => {
		const observer = new IntersectionObserver(handler);
		element && observer.observe(element);
		return () => element && observer.unobserve(element);
	}, [element]);

	return isVisible;
};
