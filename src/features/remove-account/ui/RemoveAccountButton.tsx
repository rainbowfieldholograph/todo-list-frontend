import { useAction, useAtom } from '@reatom/npm-react';
import { onRemoveAccount } from 'entities/user';
import { Button } from 'shared/ui';

export const RemoveAccountButton = () => {
	const handleRemoveAccount = useAction(onRemoveAccount);
	const [loading] = useAtom((ctx) => ctx.spy(onRemoveAccount.pendingAtom) > 0);

	return (
		<Button onClick={handleRemoveAccount} disabled={loading}>
			Remove my account
		</Button>
	);
};
