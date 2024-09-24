import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MainMenu from './MainMenu';

describe('MainMenu Component', () => {
    const mockStartGame = jest.fn();
    const mockShowScoreboard = jest.fn();

    beforeEach(() => {
        render(<MainMenu onStartGame={mockStartGame} onShowScoreboard={mockShowScoreboard} />);
    });

    test('renders the MainMenu component with input and buttons', () => {

        expect(screen.getByPlaceholderText(/Enter your name/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Start Game/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Scoreboard/i })).toBeInTheDocument();
    });

    test('allows user to input their name', () => {

        const inputElement = screen.getByPlaceholderText(/Enter your name/i);
        fireEvent.change(inputElement, { target: { value: 'John Doe' } });
        expect(inputElement).toHaveValue('John Doe');
    });

    test('calls onStartGame with player name when Start Game is clicked', () => {

        const inputElement = screen.getByPlaceholderText(/Enter your name/i);
        fireEvent.change(inputElement, { target: { value: 'John Doe' } });

        const startButton = screen.getByRole('button', { name: /Start Game/i });
        fireEvent.click(startButton);


        expect(mockStartGame).toHaveBeenCalledWith('John Doe');
        expect(mockStartGame).toHaveBeenCalledTimes(1);
    });

    test('shows alert if no name is entered when Start Game is clicked', () => {
        const startButton = screen.getByRole('button', { name: /Start Game/i });


        window.alert = jest.fn();

        fireEvent.click(startButton);

        expect(window.alert).toHaveBeenCalledWith("Please enter your name.");
    });

    test('calls onShowScoreboard when Scoreboard button is clicked', () => {
        const scoreboardButton = screen.getByRole('button', { name: /Scoreboard/i });
        fireEvent.click(scoreboardButton);

        expect(mockShowScoreboard).toHaveBeenCalledTimes(1);
    });
});
