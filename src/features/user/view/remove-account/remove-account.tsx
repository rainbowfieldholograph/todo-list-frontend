import { useAction, useAtom } from '@reatom/npm-react';
import { Button } from '~/shared/view';
import { removeAccount } from '../../model';

export const RemoveAccount = () => {
	const handleRemove = useAction(removeAccount);
	const [loading] = useAtom((ctx) => ctx.spy(removeAccount.pendingAtom) > 0);

	return (
		<Button onClick={handleRemove} disabled={loading}>
			Remove my account
		</Button>
	);
};
