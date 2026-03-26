import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProductForm } from '@/components/product/ProductForm';

// Mock dependencies safely
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

const mockAddItem = jest.fn();
jest.mock('@/components/cart/CartContext', () => ({
  useCart: () => ({
    addItem: mockAddItem,
  }),
}));

const mockAddToast = jest.fn();
jest.mock('@/components/shared/Toast', () => ({
  useToast: () => ({
    addToast: mockAddToast,
  }),
}));

describe('ProductForm validation and interaction suite', () => {
  const defaultProduct = {
    id: 'p1',
    name: 'Generic Accessory',
    basePrice: 10.0,
    requiresText: false,
    isMemorial: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders simple product with Add to Cart button synchronously', () => {
    render(<ProductForm product={defaultProduct} />);
    expect(screen.getByText('$10.00')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument();
  });

  it('submits simple product payload via mock context correctly', async () => {
    const user = userEvent.setup();
    render(<ProductForm product={defaultProduct} />);
    
    const addToCartBtn = screen.getByRole('button', { name: /add to cart/i });
    await user.click(addToCartBtn);

    expect(mockAddItem).toHaveBeenCalledWith({
      product: defaultProduct,
      variant: undefined,
      quantity: 1,
      personalization: {}
    });
    expect(mockAddToast).toHaveBeenCalledWith("Added to cart successfully!", "success");
    expect(screen.getByText('Added to Cart!')).toBeInTheDocument();
  });

  it('validates and passes required custom text inputs perfectly for dynamic templates', async () => {
    const user = userEvent.setup();
    const customProduct = { ...defaultProduct, requiresText: true };
    render(<ProductForm product={customProduct} />);
    
    // Required input for Pet's Name renders
    const nameInput = screen.getByLabelText(/pet's name/i);
    expect(nameInput).toBeRequired();

    // Type input
    await user.type(nameInput, 'Bella');
    const addToCartBtn = screen.getByRole('button', { name: /add to cart/i });
    
    await user.click(addToCartBtn);
    
    expect(mockAddItem).toHaveBeenCalledWith(expect.objectContaining({
      personalization: expect.objectContaining({
        petName: 'Bella'
      })
    }));
  });
});
