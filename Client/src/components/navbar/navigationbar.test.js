import React from 'react';
import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Navigationbar from './navigationbar';
import userEvent from '@testing-library/user-event'
import { MemoryRouter as Router } from 'react-router-dom';


//test kirjaudu
test('renders login', () => {
    render(
        <Router>
    <Navigationbar />
    </Router>
    );
    const loginElement = screen.getByText(/Kirjaudu/i);
    expect(loginElement).toBeInTheDocument();
    });

test('login button works', async () => {
    const handleLogin = jest.fn()
    const user = userEvent.setup()

    render(
        <Router>
    <Navigationbar handleLogin={handleLogin} />
    </Router>
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
    const loginButton = screen.getByText(/kirjaudu sisään/i);
    await user.click(loginButton);
    //check that username and password are empty
    expect(username).toHaveValue('');
    expect(password).toHaveValue('');

    

    });

            