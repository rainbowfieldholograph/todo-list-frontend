import { useCallback, useLayoutEffect, useRef } from 'react';
import type { AnyFunction } from '~/shared/types';

export const useEvent = <T extends AnyFunction>(fn: T) => {
	const fnRef = useRef(fn);

	useLayoutEffect(() => {
		fnRef.current = fn;
	}, [fn]);

	const eventCallback = useCallback(
		(...args: Parameters<T>) => fnRef.current.apply(null, args),
		[fnRef],
	);

	return eventCallback;
};
