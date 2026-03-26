import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CheckoutPage from '@/app/checkout/page';

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

jest.mock('@/components/cart/CartContext', () => ({
  useCart: () => ({
    items: [
      {
        cartId: 'item1',
        product: { name: 'Test Collar', basePrice: 20 },
        quantity: 2,
      }
    ],
    cartTotal: 40.0,
    user: { name: 'John Doe', email: 'john@example.com' },
    isMounted: true,
  }),
}));

import { toast } from 'sonner';

jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  }
}));

describe('Checkout logical pipeline suite', () => {
  const originalFetch = global.fetch;
  const originalLocation = window.location;

  beforeAll(() => {
    delete window.location;
    window.location = { href: '' };
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    global.fetch = originalFetch;
    window.location = originalLocation;
  });

  it('renders pre-filled shipping data from CartContext seamlessly', () => {
    render(<CheckoutPage />);
    expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument();
    expect(screen.getByDisplayValue('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('Test Collar x 2')).toBeInTheDocument();
    expect(screen.getByText('Pay $40.00')).toBeInTheDocument();
  });

  it('simulates form sumbission and mock checkout API interception securely', async () => {
    const user = userEvent.setup();
    
    // Polyfill native fetch API 
    global.fetch = jest.fn(() => 
      Promise.resolve({
        json: () => Promise.resolve({ url: "https://success.pawlio.com" })
      })
    );
    
    render(<CheckoutPage />);
    
    // Fill out explicit shipping requirements (Address, City, Zip)
    await user.type(screen.getByLabelText('Address', { exact: true }), '123 Fake Street');
    await user.type(screen.getByLabelText('City', { exact: true }), 'Springfield');
    await user.type(screen.getByLabelText('Postal Code', { exact: true }), '12345');
    
    const submitBtn = screen.getByRole('button', { name: /Pay \$40.00/i });
    await user.click(submitBtn);
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/checkout/mock', expect.any(Object));
      expect(toast.success).toHaveBeenCalledWith("Payment successful! Your order has been placed.");
    });
  });
});
