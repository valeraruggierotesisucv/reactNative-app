import { fireEvent, render, screen } from '@testing-library/react-native';

import { Input, InputVariant } from '../src/components/Input/Input';

describe('Input Component', () => {
  test('renders input with label', () => {
    render(<Input label="Test Label" />);
    const labelElement = screen.getByText(/Test Label/);
    expect(labelElement).toBeTruthy();
  });
  
  test('displays arrow icon when variant is ARROW', () => {
    render(<Input label="Test Arrow" variant={InputVariant.ARROW} />);
    const labelElement = screen.getByText(/Test Arrow/);
    expect(labelElement).toBeTruthy();
    
    const iconText = screen.getByText('keyboard-arrow-right');
    expect(iconText).toBeTruthy();
  });
  
  test('calls onPress when the input container is clicked', () => {
    const mockOnPress = jest.fn();
  
    render(
      <Input 
        label="Click Test" 
        onPress={mockOnPress}
        testID="input-container" 
      />
    ); 
  
    // Usar el testID para encontrar el componente
    const touchable = screen.getByTestId('input-container');
    fireEvent.press(touchable);
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
  
  test('calls onChangeValue when the input text changes', () => {
    const mockOnChangeValue = jest.fn(); 
  
    render(
      <Input
        label="Test"
        placeholder="Enter text"
        onChangeValue={mockOnChangeValue}
        value=""
        testID="change-test"
      />
    ); 
  
    const inputElement = screen.getByPlaceholderText('Enter text'); 
    fireEvent.changeText(inputElement, 'new text');
  
    expect(mockOnChangeValue).toHaveBeenCalledTimes(1);
    expect(mockOnChangeValue).toHaveBeenCalledWith('new text');
  });


  test('Custom input renders correctly', () => {
    const tree = render(<Input label="Custom Input" />);
    expect(tree).toMatchSnapshot();
  });
});