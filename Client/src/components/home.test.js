import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Home from './home'

test('renders content', () => {
    render(<Home />)
    
    expect(screen.getByText('Web-ohjelmoinnin sovellusprojekti')).toBeInTheDocument()
    })
    