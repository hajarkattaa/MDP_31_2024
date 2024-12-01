import { render, screen, fireEvent } from '@testing-library/react';
import CasesTable from './CasesTable';
import { describe, expect, test, jest } from '@jest/globals';

describe('CasesTable Component', () => {
  const mockCases = [
    {
      caseNumber: '1',
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '123456',
      uploadDate: '2024-01-01',
      result: 'Accepted',
    },
    {
      caseNumber: '2',
      firstName: 'Jane',
      lastName: 'Smith',
      phoneNumber: '789012',
      uploadDate: '2024-02-01',
      result: 'Pending',
    },
  ];

  const mockColumns = [
    { id: 'caseNumber', label: 'Case Number' },
    { id: 'firstName', label: 'First Name' },
    { id: 'lastName', label: 'Last Name' },
  ];

  test('renders table with data', () => {
    render(<CasesTable cases={mockCases} columns={mockColumns} onRowClick={jest.fn()} />);
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Jane')).toBeInTheDocument();
  });

  test('calls onRowClick when a row is clicked', () => {
    const mockOnRowClick = jest.fn();
    render(<CasesTable cases={mockCases} columns={mockColumns} onRowClick={mockOnRowClick} />);
    fireEvent.click(screen.getByText('John'));
    expect(mockOnRowClick).toHaveBeenCalledWith(mockCases[0]);
  });
});
