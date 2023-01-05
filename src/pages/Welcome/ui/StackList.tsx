import { FC } from 'react';
import { StackItem } from './StackItem';
import styles from './StackList.module.css';

export const StackList: FC = () => {
	return (
		<div className={styles.wrapper}>
			<StackItem
				title="Frontend stack:"
				items={['Vite', 'React', 'TypeScript', 'Recoil']}
			/>
			<StackItem
				title="Backend stack:"
				items={[
					'NodeJS',
					'Fastify',
					'Rest API',
					'MongoDB with Mongoose',
					'JWT',
				]}
			/>
		</div>
	);
};
