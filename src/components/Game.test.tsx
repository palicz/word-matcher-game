{/**

  React Testing Library:
  https://testing-library.com/docs/react-testing-library/intro/
  (Undorító dokumentáció, mivel komolyabb projektekben használják, ezért nem érdemes részletesen belemenni... túl bonyolult)

  Jest:
  https://jestjs.io/docs/getting-started

  */}

{/**

  Tests:
  - both columns render with the correct words
  - words are shuffled on initial render
  - words are selected and deselected on click
  - correct word matching is logged
  - incorrect word matching is logged
  - word deselection after checking match
  - correct word matching and score increase
  - incorrect word matching and score decrease
  - multiple matches and score accumulation

   */}

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Game from './Game';

// Mock data for testing
const mockWords = [
  { hungarian: 'alma', english: 'apple' },
  { hungarian: 'kutya', english: 'dog' },
  { hungarian: 'macska', english: 'cat' },
];

describe('Game Component', () => {
  // Test if both columns render with the correct words
  test('renders both columns with words', () => {
    render(<Game words={mockWords} onFinish={() => {}} playerName="TestPlayer" />);
    
    mockWords.forEach(word => {
      expect(screen.getByText(word.hungarian)).toBeInTheDocument();
      expect(screen.getByText(word.english)).toBeInTheDocument();
    });
  });

  // Test if words are shuffled on initial render
  test('shuffles words on initial render', () => {
    const { container } = render(<Game words={mockWords} onFinish={() => {}} playerName="TestPlayer" />);
    
    const hungarianWords = container.querySelectorAll('.column:first-child .word');
    const englishWords = container.querySelectorAll('.column:last-child .word');

    // Check if the correct number of words are rendered
    expect(hungarianWords.length).toBe(mockWords.length);
    expect(englishWords.length).toBe(mockWords.length);

    // Check if words are not in the same order as mockWords
    const isHungarianShuffled = Array.from(hungarianWords).some((word, index) => word.textContent !== mockWords[index].hungarian);
    const isEnglishShuffled = Array.from(englishWords).some((word, index) => word.textContent !== mockWords[index].english);

    // At least one column should be shuffled
    expect(isHungarianShuffled || isEnglishShuffled).toBe(true);
  });

  // Test word selection and deselection functionality
  test('selects and deselects words on click', () => {
    render(<Game words={mockWords} onFinish={() => {}} playerName="TestPlayer" />);
    
    const hungarianWord = screen.getByText('alma');
    const englishWord = screen.getByText('apple');

    // Test Hungarian word selection
    fireEvent.click(hungarianWord);
    expect(hungarianWord).toHaveClass('selected');

    // Test Hungarian word deselection
    fireEvent.click(hungarianWord);
    expect(hungarianWord).not.toHaveClass('selected');

    // Test English word selection
    fireEvent.click(englishWord);
    expect(englishWord).toHaveClass('selected');

    // Test English word deselection
    fireEvent.click(englishWord);
    expect(englishWord).not.toHaveClass('selected');
  });

  // Test correct word matching
  test('checks for correct match', async () => {
    const { container } = render(<Game words={mockWords} onFinish={() => {}} playerName="TestPlayer" />);
    
    const hungarianWord = screen.getByText('alma');
    const englishWord = screen.getByText('apple');

    // Select matching words
    fireEvent.click(hungarianWord);
    fireEvent.click(englishWord);

    // Wait for and check if the words are marked as matched
    await waitFor(() => {
      expect(hungarianWord).toHaveClass('matched');
      expect(englishWord).toHaveClass('matched');
    }, { timeout: 2000 });

    // Check if the score is updated
    const scoreElement = container.querySelector('.player-score');
    expect(scoreElement).toHaveTextContent("TestPlayer's score: 1");
  });

  // Test incorrect word matching
  test('checks for incorrect match', async () => {
    const { container } = render(<Game words={mockWords} onFinish={() => {}} playerName="TestPlayer" />);
    
    const hungarianWord = screen.getByText('alma');
    const englishWord = screen.getByText('dog');

    // Select non-matching words
    fireEvent.click(hungarianWord);
    fireEvent.click(englishWord);

    // Wait for and check if the words are marked as incorrect
    await waitFor(() => {
      expect(hungarianWord).toHaveClass('incorrect');
      expect(englishWord).toHaveClass('incorrect');
    }, { timeout: 2000 });

    // Check if the score remains at 0 (minimum score)
    const scoreElement = container.querySelector('.player-score');
    expect(scoreElement).toHaveTextContent("TestPlayer's score: 0");
  });

  // Test word deselection after checking match
  test('deselects words after checking match', async () => {
    render(<Game words={mockWords} onFinish={() => {}} playerName="TestPlayer" />);
    
    const hungarianWord = screen.getByText('alma');
    const englishWord = screen.getByText('dog');

    // Select non-matching words
    fireEvent.click(hungarianWord);
    fireEvent.click(englishWord);

    // Wait for and check deselection
    await waitFor(() => {
      expect(hungarianWord).not.toHaveClass('selected');
      expect(englishWord).not.toHaveClass('selected');
    }, { timeout: 2000 });
  });

  // Test correct word matching and score increase
  test('checks for correct match and increases score', async () => {
    const { container } = render(<Game words={mockWords} onFinish={() => {}} playerName="TestPlayer" />);
    
    const hungarianWord = screen.getByText('alma');
    const englishWord = screen.getByText('apple');

    // Select matching words
    fireEvent.click(hungarianWord);
    fireEvent.click(englishWord);

    // Wait for and check if the words are marked as matched
    await waitFor(() => {
      expect(hungarianWord).toHaveClass('matched');
      expect(englishWord).toHaveClass('matched');
    }, { timeout: 2000 });

    // Check if the score is increased by 1
    const scoreElement = container.querySelector('.player-score');
    expect(scoreElement).toHaveTextContent("TestPlayer's score: 1");
  });

  // Test incorrect word matching and score decrease
  test('checks for incorrect match and score remains at minimum', async () => {
    const { container } = render(<Game words={mockWords} onFinish={() => {}} playerName="TestPlayer" />);
    
    const hungarianWord = screen.getByText('alma');
    const englishWord = screen.getByText('dog');

    // Select non-matching words
    fireEvent.click(hungarianWord);
    fireEvent.click(englishWord);

    // Wait for and check if the words are marked as incorrect
    await waitFor(() => {
      expect(hungarianWord).toHaveClass('incorrect');
      expect(englishWord).toHaveClass('incorrect');
    }, { timeout: 2000 });

    // Check if the score remains at 0 (minimum score)
    const scoreElement = container.querySelector('.player-score');
    expect(scoreElement).toHaveTextContent("TestPlayer's score: 0");
  });

  // Test multiple matches and score accumulation
  test('accumulates score correctly for multiple matches', async () => {
    const { container } = render(<Game words={mockWords} onFinish={() => {}} playerName="TestPlayer" />);
    
    // Match 1: Correct
    fireEvent.click(screen.getByText('alma'));
    fireEvent.click(screen.getByText('apple'));
    
    await waitFor(() => {
      const scoreElement = container.querySelector('.player-score');
      expect(scoreElement).toHaveTextContent("TestPlayer's score: 1");
    }, { timeout: 2000 });

    // Match 2: Incorrect
    fireEvent.click(screen.getByText('kutya'));
    fireEvent.click(screen.getByText('cat'));
    
    await waitFor(() => {
      const scoreElement = container.querySelector('.player-score');
      expect(scoreElement).toHaveTextContent("TestPlayer's score: 0");
    }, { timeout: 2000 });

    // Match 3: Correct
    fireEvent.click(screen.getByText('macska'));
    fireEvent.click(screen.getByText('cat'));
    
    await waitFor(() => {
      const scoreElement = container.querySelector('.player-score');
      expect(scoreElement).toHaveTextContent("TestPlayer's score: 1");
    }, { timeout: 2000 });
  });

  // Test timer starts when the first match is made
test('starts timer on first match', async () => {
  jest.useFakeTimers();  // Use fake timers for testing
  const { container } = render(<Game words={mockWords} onFinish={() => {}} playerName="TestPlayer" />);
  
  // Select the first matching words
  fireEvent.click(screen.getByText('alma'));  // Hungarian
  fireEvent.click(screen.getByText('apple')); // English

  // Fast-forward until all timers have been executed
  jest.advanceTimersByTime(1000); // 1 second
  
  const timerElement = container.querySelector('.timer');
  expect(timerElement).toHaveTextContent('Time: 0:01'); // Expect 1 second elapsed
});

// Test timer increments every second
test('increments timer every second', async () => {
  jest.useFakeTimers();
  const { container } = render(<Game words={mockWords} onFinish={() => {}} playerName="TestPlayer" />);
  
  // Simulate first match to start the timer
  fireEvent.click(screen.getByText('alma'));  // Hungarian
  fireEvent.click(screen.getByText('apple')); // English

  // Fast-forward by 3 seconds
  jest.advanceTimersByTime(3000); // 3 seconds

  const timerElement = container.querySelector('.timer');
  expect(timerElement).toHaveTextContent('Time: 0:03'); // Expect 3 seconds elapsed
});

// Test timer stops when all pairs are matched
test('stops timer when all pairs are matched', async () => {
  jest.useFakeTimers();
  const handleFinish = jest.fn(); // Mock onFinish to check the calls
  const { container } = render(<Game words={mockWords} onFinish={handleFinish} playerName="TestPlayer" />);

  // Simulate matching all words
  fireEvent.click(screen.getByText('alma'));
  fireEvent.click(screen.getByText('apple'));
  fireEvent.click(screen.getByText('kutya'));
  fireEvent.click(screen.getByText('dog'));
  fireEvent.click(screen.getByText('macska'));
  fireEvent.click(screen.getByText('cat'));

  // Fast-forward until all timers have been executed
  jest.runAllTimers(); // Fast-forward to completion

  expect(handleFinish).toHaveBeenCalledWith(expect.any(Number), expect.any(Number)); // Check onFinish called with score and time
  const timerElement = container.querySelector('.timer');
  expect(timerElement).toHaveTextContent(/Time: \d+:\d+/); // Time should be displayed
});

// Test timer resets when the game is restarted
test('resets timer when the game restarts', () => {
  jest.useFakeTimers();
  const { container, rerender } = render(<Game words={mockWords} onFinish={() => {}} playerName="TestPlayer" />);

  // Start the timer
  fireEvent.click(screen.getByText('alma'));
  fireEvent.click(screen.getByText('apple'));

  // Fast-forward by 2 seconds
  jest.advanceTimersByTime(2000);

  // Rerender component (simulating a restart)
  rerender(<Game words={mockWords} onFinish={() => {}} playerName="TestPlayer" />);

  // Timer should reset to 0
  const timerElement = container.querySelector('.timer');
  expect(timerElement).toHaveTextContent('Time: 0:00');
});

// Test if timer stops running when the component unmounts
test('stops timer when component unmounts', () => {
  jest.useFakeTimers();
  const { unmount } = render(<Game words={mockWords} onFinish={() => {}} playerName="TestPlayer" />);

  // Start the timer
  fireEvent.click(screen.getByText('alma'));
  fireEvent.click(screen.getByText('apple'));

  // Fast-forward by 2 seconds
  jest.advanceTimersByTime(2000);

  // Unmount the component
  unmount();

  // Fast-forward by 5 seconds to see if the timer continues running
  jest.advanceTimersByTime(5000);

  // Since the component is unmounted, we can't access the container anymore
  // Instead, we need to ensure the timer has not incremented in state
  expect(setTimeout).not.toHaveBeenCalled(); // Verify that no new timer calls were scheduled
});

});
