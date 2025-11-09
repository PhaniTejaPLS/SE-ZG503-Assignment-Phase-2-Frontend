import './cart-root.component.css';
import { useCart } from '../Contexts/CartContext.jsx';
import { useEffect, useState} from 'react';
import { useNavigate } from 'react-router';
import { borrowRequestService } from '../services/borrow-request.service.js';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '../Contexts/AuthContext.jsx';


export const CartComponent = () =>{

    const { user } = useAuth(); 


    const userId = user.id; // Placeholder for user identification
    const reqId = 5;
    const borrowRequestId = 'item-12345'; // Placeholder for borrow request identification
    const { cartItems, removeFromCart, clearCart } = useCart();


    const navigate = useNavigate();
    
    const [userRequest, setUserRequest] = useState({
        id: reqId,
        userId: userId,
        requestDate: new Date(Date.now()),
        approvalDate: null,
        status:'pending',
        items: cartItems.map((item)=> {
            return {
                id:borrowRequestId,
                quantity:0,
                equipmentId: item.id,
            }
        })
        
    });
    
    useEffect(() => {
        // Keep a debug log when cartItems changes
        console.log('cartItems changed', cartItems);

        

        // Sync userRequest.items with cartItems so the form stays in sync
        setUserRequest((prevRequest) => ({
            ...prevRequest,
            items: (cartItems || []).map((item) => ({
                equipmentId: item.id,
                name: item.name,
                tag: item.tag,
                condition: item.condition,
                // Preserve any previously-entered values for this equipment when possible
                quantity: prevRequest.items?.find(i => i.equipmentId === item.id)?.quantity ?? 0,
                returnDate: prevRequest.items?.find(i => i.equipmentId === item.id)?.returnDate ?? null,
                duration: prevRequest.items?.find(i => i.equipmentId === item.id)?.duration ?? 0,
                borrowDate: prevRequest.items?.find(i => i.equipmentId === item.id)?.borrowDate ?? null
            }))
        }));
    }, [cartItems]);


    const validateForm = () => {
        if (!userRequest.items || userRequest.items.length === 0) {
            alert('Please add items to your cart before submitting.');
            return false;
        }

        const missingFields = [];
        
        userRequest.items.forEach((item, index) => {
            const itemName = cartItems.find(c => c.id === item.equipmentId)?.name || `Item ${index + 1}`;
            
            if (!item.borrowDate) {
                missingFields.push(`${itemName}: Borrow Date`);
            }
            if (!item.returnDate) {
                missingFields.push(`${itemName}: Return Date`);
            }
            if (!item.quantity || item.quantity <= 0) {
                missingFields.push(`${itemName}: Quantity Required`);
            }
        });

        if (missingFields.length > 0) {
            alert('Please fill in all required fields:\n\n' + missingFields.join('\n'));
            return false;
        }

        return true;
    };

    async function submitUserRequest() {
        // Validate before submitting
        if (!validateForm()) {
            return;
        }

        console.log('Submitting user request:', userRequest);
            borrowRequestService.submitBorrowRequest(userRequest)
                .then((response) => {
                    clearCart();
                    console.log('Borrow request submitted successfully:', response.data);
                })
                .catch((error) => {
                    console.error('Error submitting borrow request:', error);
                });
        }

        const parseDateFromInput = (yyyyMmDd) => {
        if (!yyyyMmDd) return null;
        const [y, m, d] = yyyyMmDd.split('-').map(Number);
        return new Date(y, m - 1, d); // monthIndex is 0-based
    };

    // Show empty state if cart is empty
    if (!cartItems || cartItems.length === 0) {
        return (
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <div className="text-center py-5">
                            <div className="mb-4">
                                <i className="bi bi-cart-x" style={{ fontSize: '5rem', color: '#6c757d' }}></i>
                            </div>
                            <h2 className="mb-3">Your Cart is Empty</h2>
                            <p className="text-muted mb-4">
                                Looks like you haven't added any items to your cart yet. 
                                Start browsing our equipment inventory to add items to your cart.
                            </p>
                            <button 
                                className="btn btn-primary btn-lg"
                                onClick={() => navigate('/home')}
                            >
                                <i className="bi bi-box-seam me-2"></i>
                                Browse Equipment
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return(
        <>
        <h2>Bill of Materials</h2>

        <div className='cart-instructions'>
            <p>This is your cart. Please review the items below and provide the necessary details before submitting your request.</p>
            <p>User ID: {userId}</p>
        </div>

        <div className="cart-root">

                <table className="table table-dark table-hover">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Tag</th>
                    <th scope="col">Condition</th>
                    <th scope='col'>Borrow Date</th>
                    <th scope="col">Return Date</th>
                    <th scope="col">Quantity Required</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                {
                    cartItems.map((cartItem) => {
                        return (
                            <tr key={cartItem.id}>
                                <td>{cartItem.id}</td>
                                <td>{cartItem.name}</td>
                                <td>{cartItem.tag}</td>
                                <td>{cartItem.condition}</td>
                                <td>
                                    <div className="mb-3 date-input">
                                        <input 
                                            type="date" 
                                            className="form-control" 
                                            id={`requestDate-${cartItem.id}`} 
                                            name="requestDate"
                                            required
                                            onChange={
                                                (e)=>{
                                                    const updatedBorrowDate = e.target.value;
                                                    console.log('Updated Request Date:', updatedBorrowDate);
                                                    setUserRequest((prevRequest) => ({
                                                        ...prevRequest,
                                                        items: (prevRequest.items || []).map((item) =>
                                                            item.equipmentId === cartItem.id
                                                                ? { ...item, borrowDate: parseDateFromInput(updatedBorrowDate) }
                                                                : item
                                                        )
                                                    }));
                                            }}   
                                        />
                                    </div>
                                </td>
                                <td>
                                    <div className="mb-3 date-input">
                                        <input 
                                            type="date" 
                                            className="form-control" 
                                            id={`returnDate-${cartItem.id}`} 
                                            name="returnDate"
                                            required
                                            onChange={
                                                (e)=>{
                                                    const updatedReturnDate = e.target.value;
                                                    setUserRequest((prevRequest) => ({
                                                        ...prevRequest,
                                                        items: (prevRequest.items || []).map((item) =>
                                                            item.equipmentId === cartItem.id
                                                                ? { ...item, returnDate: parseDateFromInput(updatedReturnDate) }
                                                                : item
                                                        )
                                                    }));
                                            }}
                                        />
                                    </div>
                                </td>
                                
                                <td>
                                    <div className="mb-3 qty-input">
                                        <input 
                                            type="number" 
                                            className="form-control" 
                                            id={`quantity-${cartItem.id}`} 
                                            name="quantity"
                                            min="1"
                                            required
                                            onChange={
                                                (e)=>{
                                                    const updatedQuantity = parseInt(e.target.value) || 0;
                                                    setUserRequest((prevRequest) => ({
                                                        ...prevRequest,
                                                        items: (prevRequest.items || []).map((item) =>
                                                            item.equipmentId === cartItem.id
                                                                ? { ...item, quantity: updatedQuantity }
                                                                : item
                                                        )
                                                    }));
                                            }}
                                        />
                                    </div>
                                </td>

                                <td>
                                    <button 
                                        type="button" 
                                        className="btn btn-danger btn-sm"
                                        onClick={removeFromCart.bind(this, cartItem.id)}
                                        >
                                            Remove
                                    </button>
                                </td>
                            </tr>
                        )
                    }) 
                }
            </tbody>

        </table>
                <div className='cart-submit'>
                    <input 
                        className="btn btn-primary" 
                        type="submit" 
                        value="Submit"
                        onClick={async (e)=>{
                            e.preventDefault();
                            if (validateForm()) {
                                await submitUserRequest();
                                navigate('/home');
                            }
                        }}
                    />
                </div>

        </div>
        </>
    )
    
}