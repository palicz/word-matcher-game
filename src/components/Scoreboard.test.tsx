import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Scoreboard from './Scoreboard';

const mockScores = [
    { playerName: 'Alice', score: 30 },
    { playerName: 'Bob', score: 50 },
    { playerName: 'Charlie', score: 40 },
];

describe('Scoreboard Component', () => {
    const onCloseMock = jest.fn();

    beforeEach(() => {
        onCloseMock.mockClear(); // Clear mock calls before each test
    });

    test('renders without crashing', () => {
        render(<Scoreboard scores={mockScores} onClose={onCloseMock} />);
        expect(screen.getByText(/Scoreboard/i)).toBeInTheDocument();
    });

    test('displays the correct title', () => {
        render(<Scoreboard scores={mockScores} onClose={onCloseMock} />);
        expect(screen.getByText(/Scoreboard/i)).toBeInTheDocument();
    });

    test('renders the close button', () => {
        render(<Scoreboard scores={mockScores} onClose={onCloseMock} />);
        const closeButton = screen.getByText(/Close/i);
        expect(closeButton).toBeInTheDocument();
    });

    test('sorts scores in descending order', () => {
        render(<Scoreboard scores={mockScores} onClose={onCloseMock} />);
        const rows = screen.getAllByRole('row') as HTMLTableRowElement[]; // Cast to HTMLTableRowElement
        expect(rows[2].cells[1].textContent).toBe('Bob'); // Highest score
        expect(rows[3].cells[1].textContent).toBe('Charlie'); // Second highest
        expect(rows[4].cells[1].textContent).toBe('Alice'); // Lowest
    });

    test('displays player names and scores correctly', () => {
        render(<Scoreboard scores={mockScores} onClose={onCloseMock} />);
        expect(screen.getByText(/Alice/i)).toBeInTheDocument();
        expect(screen.getByText(/Bob/i)).toBeInTheDocument();
        expect(screen.getByText(/Charlie/i)).toBeInTheDocument();
        expect(screen.getByText(/30/i)).toBeInTheDocument();
        expect(screen.getByText(/50/i)).toBeInTheDocument();
        expect(screen.getByText(/40/i)).toBeInTheDocument();
    });



    test('calls onClose when close button is clicked', () => {
        render(<Scoreboard scores={mockScores} onClose={onCloseMock} />);
        const closeButton = screen.getByText(/Close/i);
        fireEvent.click(closeButton);
        expect(onCloseMock).toHaveBeenCalledTimes(1); // Ensure the mock function is called once
    });
});
