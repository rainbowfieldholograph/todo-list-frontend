import { useAction, useAtom } from '@reatom/npm-react';
import { Button } from '~/shared/view';
import { removeAccount } from '../../model';

export const RemoveAccountButton = () => {
	const handleRemoveAccount = useAction(removeAccount);
	const [loading] = useAtom((ctx) => ctx.spy(removeAccount.pendingAtom) > 0);

	return (
		<Button onClick={handleRemoveAccount} disabled={loading}>
			Remove my account
		</Button>
	);
};
