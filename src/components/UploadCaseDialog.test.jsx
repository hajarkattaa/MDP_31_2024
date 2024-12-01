import { render, fireEvent, screen } from '@testing-library/react';
import UploadCaseDialog from './UploadCaseDialog';
import { describe, test, expect, jest } from '@jest/globals';

describe('UploadCaseDialog Component', () => {
  const mockHandleClose = jest.fn();

  test('renders dialog correctly', () => {
    render(<UploadCaseDialog open={true} handleClose={mockHandleClose} />);
    expect(screen.getByText(/Patient Info/)).toBeInTheDocument();
  });

  test('handles input changes', () => {
    render(<UploadCaseDialog open={true} handleClose={mockHandleClose} />);
    const firstNameInput = screen.getByLabelText(/First Name/);

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    expect(firstNameInput.value).toBe('John');
  });

  test('calls handleClose on Cancel button click', () => {
    render(<UploadCaseDialog open={true} handleClose={mockHandleClose} />);
    fireEvent.click(screen.getByText(/Cancel/));
    expect(mockHandleClose).toHaveBeenCalled();
  });

  test('disables Submit button if form is invalid', () => {
    render(<UploadCaseDialog open={true} handleClose={mockHandleClose} />);
    const submitButton = screen.getByText(/Submit/);
    expect(submitButton).toBeDisabled();
  });
});
