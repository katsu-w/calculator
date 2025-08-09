import './styles/main.scss'
import { useState } from 'react';
import { BUTTONS } from '../constants/constants.ts';

export function App() {
	const [firstOperand, setFirstOperand] = useState('');
	const [secondOperand, setSecondOperand] = useState('');
	const [operator, setOperator] = useState('');
	const [error, setError] = useState('');
	const [isResult, setIsResult] = useState(false);
	
	function setDisplay(key: string) {
		if (!operator) {
			setIsResult(false);
			setFirstOperand(val => val + key);
			setError('');
			return;
		} else {
			setSecondOperand(val => val + key);
			setError('');
			return;
		}
	}
	
	function equals() {
		switch (operator) {
			case '/':
				setFirstOperand(String(+firstOperand / +secondOperand));
				break;
			case '*':
				setFirstOperand(String(+firstOperand * +secondOperand));
				break;
			case '-':
				setFirstOperand(String(+firstOperand - +secondOperand));
				break;
			case '+':
				setFirstOperand(String(+firstOperand + +secondOperand));
				break;
		}
		
		setOperator('');
		setSecondOperand('');
		setIsResult(true);
	}
	
	function handleClick(key: string) {
		setIsResult(false);
		switch (key) {
			case '/':
			case '*':
			case '-':
			case '+':
				if (firstOperand) {
					setOperator(key);
				} else {
					setError('Сначала добавьте операнд')
				}
				break;
				
			case 'C':
				setFirstOperand('');
				setSecondOperand('');
				setOperator('');
				break;
			
			case '=':
				if (secondOperand) {
					equals();
					break;
				} else if (operator) {
					setError('Использован неверный формат');
					break;
				}
				break;
				
			
			default:
				setDisplay(key);
				break;
		}
	}

  return (
    <>
			<div className="calculator">
				<div className="calculator__error">
					<span>{error}</span>
				</div>
				<div className="calculator__display">
					<p className={`calculator__text${isResult ? ' result' : ''}`}>
						{firstOperand + ' ' + operator + ' ' + secondOperand}
					</p>
				</div>
				<div className="calculator__buttons">
					{
						BUTTONS.map((name) => {
							return (
								<button
									className="button"
									onClick={() => handleClick(name)}
									type="button"
									key={name}
								>
									{name}
								</button>
							);
						})
					}
				</div>
			</div>
    </>
  )
}
