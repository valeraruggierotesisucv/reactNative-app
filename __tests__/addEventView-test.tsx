import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { AuthProvider } from '../src/contexts/AuthContext';
import { AddEventView } from '../src/views/AddEventView';
import { NavigationContainer } from '@react-navigation/native';

test('AddEventView renders without crashing', () => {
  render(
    <NavigationContainer>
      <AuthProvider>
        <AddEventView />
      </AuthProvider>
    </NavigationContainer>
  );
});

test('submit button is disabled initially', () => {
  render(
    <NavigationContainer>
      <AuthProvider>
        <AddEventView />
      </AuthProvider>
    </NavigationContainer>
  );
  const button = screen.getByTestId('publish-button');
  expect(button).toBeEnabled();
});