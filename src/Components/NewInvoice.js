import React, { useState } from 'react';
import styled from 'styled-components';

// Styled components for the grid
const GridContainer = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr; // Left side is wider than the right side
    gap: 20px; // Space between left and right columns
    margin: 20px; // Add some margin around the grid
`;

const LeftColumn = styled.div`
    display: flex;
    flex-direction: column;
`;

const RightColumn = styled.div`
    display: flex;
    flex-direction: column;
`;

const GridItem = styled.div`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #f9f9f9;
`;

const Title = styled.h2`
    text-align: center;
`;

const SubmitButton = styled.button`
    padding: 10px;
    background-color: #0078d4;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #005a9e;
    }
`;

const DataGridContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 10px;
`;

const DataGridRow = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid #eee;
`;

const ActionButton = styled.button`
    padding: 5px 10px;
    background-color: #e74c3c;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #c0392b;
    }
`;

const SearchInput = styled.input`
    width: 100%;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;

    &:focus {
        border-color: #0078d4; // Highlight border on focus
        outline: none;
    }
`;

const AvailableItemsContainer = styled.div`
    margin-top: 20px;
`;

const ItemDiv = styled.div`
    padding: 10px;
    border: 1px solid #ddd;
    margin: 5px 0;
    border-radius: 4px;
    background-color: #f0f0f0;
    cursor: pointer;

    &:hover {
        background-color: #e0e0e0; // Highlight on hover
    }
`;

const NewInvoice = () => {
    const [invoiceData, setInvoiceData] = useState({
        customerType: '',
        customerName: '',
        date: '',
        discount: 0,
        posAmount: '',
        cashAmount: '',
        transferAmount: '',
    });

    const [items, setItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');

    // Item list with prices based on customer type
    const itemList = [
        { id: 1, name: 'Item 1', priceIndividual: 10, priceBusiness: 12 },
        { id: 2, name: 'Item 2', priceIndividual: 15, priceBusiness: 18 },
        { id: 3, name: 'Item 3', priceIndividual: 20, priceBusiness: 25 },
        { id: 4, name: 'Item 4', priceIndividual: 25, priceBusiness: 30 },
        { id: 5, name: 'Item 5', priceIndividual: 30, priceBusiness: 36 },
    ];

    const customerTypes = ['Individual', 'Business'];

    const handleInvoiceChange = (e) => {
        const { name, value } = e.target;
        setInvoiceData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleRemoveItem = (index) => {
        setItems((prevItems) => prevItems.filter((_, i) => i !== index));
    };

    const handleQtyChange = (e, index) => {
        const { value } = e.target;
        const newItems = [...items];
        newItems[index].qty = parseInt(value, 10) || 0;
        setItems(newItems);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!invoiceData.customerType || !invoiceData.customerName || !invoiceData.date || items.length === 0) {
            setError('Please fill in all fields and add at least one item.');
            return;
        }

        const newInvoice = {
            customerType: invoiceData.customerType,
            customerName: invoiceData.customerName,
            date: invoiceData.date,
            discount: invoiceData.discount,
            posAmount: invoiceData.posAmount,
            cashAmount: invoiceData.cashAmount,
            transferAmount: invoiceData.transferAmount,
            items: items,
        };
        console.log('New Invoice Data to be sent to database:', newInvoice);
        setError(''); // Clear error on successful submission
        // Here you would add the logic to send newInvoice to your database
    };

    const totalAmount = items.reduce((total, item) => total + ((invoiceData.customerType === 'Business' ? item.priceBusiness : item.priceIndividual) * item.qty), 0);
    const discountAmount = (totalAmount * invoiceData.discount) / 100;
    const finalAmount = totalAmount - discountAmount;

    // Total of payment methods
    const totalPayment = parseFloat(invoiceData.posAmount || 0) + parseFloat(invoiceData.cashAmount || 0) + parseFloat(invoiceData.transferAmount || 0);

    const filteredItems = itemList.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelectItem = (item) => {
        const existingItem = items.find(i => i.item === item.name);
        if (!existingItem) {
            const newItem = {
                id: item.id,
                item: item.name,
                priceIndividual: item.priceIndividual,
                priceBusiness: item.priceBusiness,
                qty: 1, // Default quantity set to 1
            };
            setItems((prevItems) => [...prevItems, newItem]);
        }
        setSearchTerm(''); // Clear search term
    };

    return (
        <GridContainer>
            <LeftColumn>
                <Title>Create New Invoice</Title>
                {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}
                
                {/* Customer Type Selection */}
                <GridItem>
                    <label>
                        Customer Type:
                        <select
                            name="customerType"
                            value={invoiceData.customerType}
                            onChange={handleInvoiceChange}
                            required
                        >
                            <option value="">Select Customer Type</option>
                            {customerTypes.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </label>
                </GridItem>

                <GridItem>
                    <input
                        type="text"
                        name="customerName"
                        value={invoiceData.customerName}
                        onChange={handleInvoiceChange}
                        placeholder="Customer Name"
                        required
                    />
                </GridItem>
                <GridItem>
                    <label>
                        Date:
                        <input
                            type="date"
                            name="date"
                            value={invoiceData.date}
                            onChange={handleInvoiceChange}
                            required
                        />
                    </label>
                </GridItem>

                {/* Discount Field */}
                <GridItem>
                    <label>
                        Discount (%):
                        <input
                            type="number"
                            name="discount"
                            value={invoiceData.discount}
                            onChange={handleInvoiceChange}
                            min="0"
                            max="100"
                        />
                    </label>
                </GridItem>

                {/* Payment Method Amount Fields */}
                <GridItem>
                    <label>
                        Amount for POS:
                        <input
                            type="number"
                            name="posAmount"
                            value={invoiceData.posAmount}
                            onChange={handleInvoiceChange}
                        />
                    </label>
                </GridItem>

                <GridItem>
                    <label>
                        Amount for Cash:
                        <input
                            type="number"
                            name="cashAmount"
                            value={invoiceData.cashAmount}
                            onChange={handleInvoiceChange}
                        />
                    </label>
                </GridItem>

                <GridItem>
                    <label>
                        Amount for Direct Transfer:
                        <input
                            type="number"
                            name="transferAmount"
                            value={invoiceData.transferAmount}
                            onChange={handleInvoiceChange}
                        />
                    </label>
                </GridItem>

                {/* Total of Payment Methods */}
                <GridItem>
                    <strong>Total Amount for Payments: ${totalPayment.toFixed(2)}</strong>
                </GridItem>

                {/* Item Entry as Data Grid */}
                <DataGridContainer>
                    <DataGridRow>
                        <div><strong>Item</strong></div>
                        <div><strong>Price</strong></div>
                        <div><strong>Qty</strong></div>
                        <div><strong>Subtotal</strong></div>
                        <div><strong>Action</strong></div>
                    </DataGridRow>
                    {items.map((item, index) => (
                        <DataGridRow key={index}>
                            <div>{item.item}</div>
                            <div>${(invoiceData.customerType === 'Business' ? item.priceBusiness : item.priceIndividual).toFixed(2)}</div>
                            <div>
                                <input
                                    type="number"
                                    value={item.qty}
                                    onChange={(e) => handleQtyChange(e, index)}
                                    min="0"
                                    placeholder="Qty"
                                />
                            </div>
                            <div>${((invoiceData.customerType === 'Business' ? item.priceBusiness : item.priceIndividual) * item.qty).toFixed(2)}</div>
                            <div>
                                <ActionButton onClick={() => handleRemoveItem(index)}>Remove</ActionButton>
                            </div>
                        </DataGridRow>
                    ))}
                </DataGridContainer>

                {/* Totals */}
                <GridItem><strong>Total Amount: ${totalAmount.toFixed(2)}</strong></GridItem>
                <GridItem><strong>Discount Amount: -${discountAmount.toFixed(2)}</strong></GridItem>
                <GridItem><strong>Final Amount: ${finalAmount.toFixed(2)}</strong></GridItem>

                <SubmitButton onClick={handleSubmit}>
                    Create Invoice
                </SubmitButton>
            </LeftColumn>

            <RightColumn>
                <SearchInput
                    type="text"
                    name="searchItem"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search Item"
                />
                {searchTerm && filteredItems.length > 0 && (
                    <div>
                        <strong>Search Results:</strong>
                        <ul>
                            {filteredItems.map(item => (
                                <li key={item.id} onClick={() => handleSelectItem(item)}>
                                    {item.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                <AvailableItemsContainer>
                    <h3>Available Items</h3>
                    {itemList.map(item => (
                        <ItemDiv key={item.id} onClick={() => handleSelectItem(item)}>
                            {item.name} - ${invoiceData.customerType === 'Business' ? item.priceBusiness : item.priceIndividual}
                        </ItemDiv>
                    ))}
                </AvailableItemsContainer>
            </RightColumn>
        </GridContainer>
    );
};

export default NewInvoice;
