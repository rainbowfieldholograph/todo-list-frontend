import { StackItem } from './stack-item';
import styles from './stack-list.module.css';

export const StackList = () => {
	return (
		<div className={styles.wrapper}>
			<StackItem
				title="Frontend stack:"
				items={['Vite', 'React', 'TypeScript', 'Reatom']}
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
