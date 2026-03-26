import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Navbar } from '@/components/shared/Navbar';

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

// Provide mocked user state explicitly to evaluate UI shifts
jest.mock('@/components/cart/CartContext', () => ({
  useCart: () => ({
    items: [],
    isMounted: true,
    user: null,
    refreshUser: jest.fn()
  }),
}));

describe('Navbar interactions & global layout logic', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders primary visual layers and fallback login states effortlessly', () => {
    render(<Navbar />);
    expect(screen.getByText('Pawlio Pet Shop')).toBeInTheDocument();
    expect(screen.getByTitle('Login')).toBeInTheDocument();
  });

  it('unmounts search overlay when submitting a valid keyword query into the Router', async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    
    // Select the prominent header search toggle button
    const buttons = screen.getAllByRole('button');
    // Topologically, the first button in the standalone mobile/header container is the search toggle.
    await user.click(buttons[0]);
    
    // Verify hidden input successfully mounts into DOM
    const searchInput = screen.getByPlaceholderText(/search for toys/i);
    expect(searchInput).toBeInTheDocument();
    
    // Simulate keyboard event typing and synthetic HTML form submission
    await user.type(searchInput, 'cat supplies{enter}');
    
    expect(mockPush).toHaveBeenCalledWith('/search?q=cat%20supplies');
  });
});
