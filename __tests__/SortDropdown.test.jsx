import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SortDropdown from '@/components/product/SortDropdown';

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('SortDropdown interaction suite', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders default option parameters flawlessly', () => {
    render(<SortDropdown sortFilter="newest" categoryFilter="accessories" />);
    expect(screen.getByLabelText(/sort by/i)).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toHaveValue('newest');
  });

  it('triggers the underlying Next.js router correctly when UI parameters shift', async () => {
    const user = userEvent.setup();
    render(<SortDropdown sortFilter="newest" categoryFilter="accessories" />);
    
    const select = screen.getByRole('combobox');
    await user.selectOptions(select, 'price-asc');
    
    expect(mockPush).toHaveBeenCalledWith('/products?category=accessories&sort=price-asc');
  });
});
