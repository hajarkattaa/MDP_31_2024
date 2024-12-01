import { render } from '@testing-library/react';
import FileDropzone from './FileDropzone';
import { describe, expect, test, jest } from '@jest/globals';

describe('FileDropzone Component', () => {
  test('renders correctly', () => {
    const { getByText } = render(<FileDropzone onDrop={jest.fn()} files={[]} />);
    expect(getByText(/Drag n drop some files here/)).toBeInTheDocument();
  });
});
