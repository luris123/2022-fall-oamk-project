import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Navigationbar from './navigationbar';

//test kirjaudu
test('renders login', () => {
    render(<Navigationbar />);
    const loginElement = screen.getByText(/Kirjaudu/i);
    expect(loginElement).toBeInTheDocument();
    });
    