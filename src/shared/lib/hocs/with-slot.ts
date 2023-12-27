/* eslint-disable react/display-name */
import React from 'react';

type MapSlot<T extends Record<string, (props: any) => React.ReactNode>> = {
	[K in keyof T]?: T[K] extends (props: infer Props) => React.ReactNode
		? (props: Props & { slot: T[K] }) => React.ReactNode
		: never;
};

export function withSlot<
	Slot extends Record<string, (props: any) => React.ReactNode>,
	Props,
	Ref = any,
>(
	slot: Slot,
	render: (
		props: Props & { slot: Slot },
		ref: React.ForwardedRef<Ref>,
	) => React.ReactNode,
) {
	return React.forwardRef<Ref, Props & { slot?: MapSlot<Slot> }>(
		({ slot: custom = {}, ...props }, ref) => {
			const config = React.useRef({ slot, custom }).current;

			if (config.slot === slot) {
				// @ts-expect-error ...
				config.slot = Object.entries(slot).reduce((acc, [name, slotRender]) => {
					// @ts-expect-error ...
					acc[name] = (props) => {
						// @ts-expect-error ...
						const customRender = config.custom[name];

						return customRender
							? customRender({ ...props, slot: slotRender })
							: slotRender(props);
					};
					return acc;
				}, {});
			}

			config.custom = custom;

			return render({ ...props, slot: config.slot } as any, ref);
		},
	);
}
