import { AxiosError } from 'axios';
import { number, object, parse, string } from 'valibot';

const ErrorSchema = object({
	statusCode: number(),
	error: string(),
	message: string(),
});

const unknownError = { message: 'unknown error' } as const;

export const errorMapper = (error: unknown) => {
	if (error instanceof AxiosError) {
		try {
			return parse(ErrorSchema, error.response?.data);
		} catch (error) {
			return unknownError;
		}
	}

	return unknownError;
};
