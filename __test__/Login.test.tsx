import { fireEvent, render } from '@testing-library/react-native';
import Test from '../src/screens/Test';
import AuthProvider, { AuthContext } from '../src/context/Auth';
import Login from '../src/screens/Login';

const mockAuthContext = { auth: false, setAuth: jest.fn() };

const renderLoginScreen = () =>
  render(
    <AuthContext.Provider value={mockAuthContext}>
      <Login />
    </AuthContext.Provider>
  );

describe('Login Screen', () => {
  it('Render screen', () => {
    const { getByPlaceholderText, getByText, getByTestId } =
      renderLoginScreen();

    expect(getByPlaceholderText('Please Enter Email')).toBeTruthy();
    expect(getByPlaceholderText('Please Enter Password')).toBeTruthy();
    expect(getByText('Login')).toBeTruthy();
    expect(getByTestId('logo')).toBeTruthy();
  });

  it('render and match snapshot', () => {
    const tree = renderLoginScreen().toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Use shoud able to enter email and password', () => {
    const { getByPlaceholderText } = renderLoginScreen();

    const emailInput = getByPlaceholderText('Please Enter Email');
    const passwordInput = getByPlaceholderText('Please Enter Password');

    fireEvent.changeText(emailInput, 'nayan@gmail.com');
    fireEvent.changeText(passwordInput, 'nayan@gmail.com');

    expect(emailInput.props.value).toBe('nayan@gmail.com');
    expect(passwordInput.props.value).toBe('nayan@gmail.com');
  });

  it('calls setAuth when login button is pressed', () => {
    const { getByText } = renderLoginScreen();

    const loginButton = getByText('Login');

    fireEvent.press(loginButton);

    expect(mockAuthContext.setAuth).toHaveBeenCalledTimes(1);
    expect(mockAuthContext.setAuth).toHaveBeenCalledWith(true);
  });
});
