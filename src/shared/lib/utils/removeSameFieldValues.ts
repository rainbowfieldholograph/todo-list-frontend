// will compare two objects and omit same values in same fields
export function removeSameFieldValues(
	main: object,
	secondary: object,
): object | undefined {
	const result = new Map();

	for (const key in main) {
		const typedKey = key as keyof typeof main;

		if (
			Object.hasOwn(secondary, typedKey) &&
			!Object.is(secondary[typedKey], main[typedKey])
		) {
			result.set(typedKey, secondary[typedKey]);
		}
	}

	if (result.size === 0) return;

	const resultObject = Object.fromEntries(result);
	return resultObject;
}
