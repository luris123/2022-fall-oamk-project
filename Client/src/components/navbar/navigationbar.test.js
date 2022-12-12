import React from 'react';
import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Navigationbar from './navigationbar';
import userEvent from '@testing-library/user-event'
import { MemoryRouter as Router } from 'react-router-dom';


//test rekisteröidy
test('register works', async () => {
    const mockHandler = jest.fn()
    const user = userEvent.setup()

    render(<Router><Navigationbar handleRegister={mockHandler} /></Router>)
    const navDropdown = screen.getByRole('button', { name: /Rekisteröidy/i })
    await user.click(navDropdown);
    expect(screen.getByText(/Luo uusi tili/i)).toBeInTheDocument();
    const newUser = screen.getByPlaceholderText(/käyttäjätunnus/i);
    await user.type(newUser, 'testi123')
    const newPassword = screen.getByPlaceholderText(/salasana/i);
    await user.type(newPassword, 'testi123')
    const registerButton = screen.getByRole('button', { name: /Luo uusi tili/i })
    console.log(registerButton)
    expect(newUser).toHaveValue('testi123')
    await user.click(registerButton);

    expect(screen.getByText(/Rekisteröityminen onnistui!/i)).toBeInTheDocument();

});



//test kirjaudu
test('login button works', async () => {
    const mockHandler = jest.fn()
    const user = userEvent.setup()

    render(<Router><Navigationbar handleLogin={mockHandler} /></Router>
    );
    //click kirjaudu navDropdown and check that login form is visible
    const navDropdown = screen.getByRole('button', { name: /Kirjaudu/i });
    await user.click(navDropdown);
    expect(screen.getByText(/Kirjaudu sisään/i)).toBeInTheDocument();
    //fill login form
    const username = screen.getByPlaceholderText(/käyttäjätunnus/i);
    await user.type(username, 'testi');
    const password = screen.getByPlaceholderText(/salasana/i);
    await user.type(password, 'testi');
    //click login button
    const loginButton = screen.getByRole('button', { name: /Kirjaudu sisään/i})
    await user.click(loginButton);
    console.log(mockHandler.mock)
    
    //check that username and password are empty


    

    });