import { fireEvent, render } from '@testing-library/react-native';
import Home from '../../src/screens/Home';
import { debug } from '@testing-library/react-native/build/helpers/debug';

describe('Home Screen', () => {
  it('snapshot testing', () => {
    const tree = render(<Home />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should open model when click on +', () => {
    const { getByText, getByPlaceholderText } = render(<Home />);

    const addButton = getByText('+');
    fireEvent.press(addButton);
    const addTaskText = getByPlaceholderText('Enter Task');

    expect(addTaskText).toBeTruthy();
  });

  it('able to add task ', () => {
    const { getByText, getByPlaceholderText } = render(<Home />);
    const addButton = getByText('+');
    fireEvent.press(addButton);
    const addTaskInput = getByPlaceholderText('Enter Task');
    const submitTask = getByText('Add Task');
    expect(addTaskInput).toBeTruthy();
    fireEvent.changeText(addTaskInput, 'New Task');
    fireEvent.press(submitTask);
    expect(getByText('New Task')).toBeTruthy();
  });

  it('should able to edit task', () => {
    const { getByText, getByPlaceholderText, debug, getByTestId } = render(
      <Home />
    );
    const addButton = getByText('+');
    fireEvent.press(addButton);
    fireEvent.changeText(getByPlaceholderText('Enter Task'), 'New Task');
    fireEvent.press(getByText('Add Task'));

    expect(getByText('New Task')).toBeTruthy();
    fireEvent.press(getByText('New Task'));

    // Change text in the input
    fireEvent.changeText(getByTestId('taskInput'), 'Edited Task');

    /*  await waitFor(() => {
      expect(getByTestId('taskInput').props.value).toBe('Edited Task');
    }); */

    debug();

    //fireEvent.press(getByText('Edit Task'));

    //expect(getByText('Edited Task')).toBeTruthy();
  });

  it('outside click should close the model', () => {
    const { getByText, getByTestId, queryByPlaceholderText } = render(<Home />);
    const addButton = getByText('+');
    fireEvent.press(addButton);
    const background = getByTestId('modalBackground');
    fireEvent.press(background);
    expect(queryByPlaceholderText('Enter Task')).toBeNull();
  });
});
