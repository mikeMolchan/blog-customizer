import { useRef, useState, useEffect } from 'react';

// Components
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

// Types and constants
import type { ArticleStateType } from 'src/constants/articleProps';
import { backgroundColors, contentWidthArr, defaultArticleState, fontColors, fontFamilyOptions, fontSizeOptions } from 'src/constants/articleProps';

// Styles
import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

type ArticleParamsFormProps = {
	onChangeState: (state: ArticleStateType) => void;
}

export const ArticleParamsForm = ({onChangeState}: ArticleParamsFormProps) => {
	// close/open with button
	const [isOpen, setIsOpen] = useState(false);

	const toggleOpen = () => {
		setIsOpen(!isOpen);
	}

	// close with click outside
	const sidebarRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
				setIsOpen(false);
			}
		}

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		}
	}, [isOpen]);

	// data flow
	const [formState, setFormState] = useState(defaultArticleState);

	const handleSubmit = (e: React.FormEvent): void => {
		e.preventDefault();
		onChangeState(formState);
	}

	const handleReset = (e: React.FormEvent): void => {
		setFormState(defaultArticleState);
		onChangeState(defaultArticleState);
	}

	return (
		<div ref={sidebarRef}>
			<ArrowButton isOpen={isOpen} onClick={toggleOpen} />
			<aside className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}
					>

					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						title='Шрифт'
						onChange={(option) => setFormState({ ...formState, fontFamilyOption: option })}
					/>

					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(option) => setFormState({ ...formState, fontSizeOption: option })}
						title='Размер шрифта'
					/>

					<Select	
						selected={formState.fontColor}
						options={fontColors}
						title='Цвет шрифта'
						onChange={(option) => setFormState({ ...formState, fontColor: option })}
					/>

					<Separator/>

					<Select	
						selected={formState.backgroundColor}
						options={backgroundColors}
						title='Цвет фона'
						onChange={(option) => setFormState({ ...formState, backgroundColor: option })}
					/>

					<Select	
						selected={formState.contentWidth}
						options={contentWidthArr}
						title='Ширина контента'
						onChange={(option) => setFormState({ ...formState, contentWidth: option })}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
