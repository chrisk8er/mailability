import { useAppSelector } from '../hooks/use-app-selector';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import templateList from '../store/template-list';

export default function Home() {
	const dispatch = useDispatch();
	const list = useAppSelector('templateList');

	useEffect(() => {
		dispatch(templateList.actions.fetch(undefined));
	}, [dispatch]);

	return (
		<>
			{list.map((item) => (
				<div key={item.template_id}>
					<div>{item.title}</div>
				</div>
			))}
		</>
	);
}
