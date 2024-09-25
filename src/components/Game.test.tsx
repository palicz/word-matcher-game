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
    render(<Game words={mockWords} />);
    
    mockWords.forEach(word => {
      expect(screen.getByText(word.hungarian)).toBeInTheDocument();
      expect(screen.getByText(word.english)).toBeInTheDocument();
    });
  });

  // Test if words are shuffled on initial render
  test('shuffles words on initial render', () => {
    const { container } = render(<Game words={mockWords} />);
    
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
    render(<Game words={mockWords} />);
    
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
  test('checks for correct match', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    render(<Game words={mockWords} />);
    
    const hungarianWord = screen.getByText('alma');
    const englishWord = screen.getByText('apple');

    // Select matching words
    fireEvent.click(hungarianWord);
    fireEvent.click(englishWord);

    // Check if correct match is logged
    expect(consoleSpy).toHaveBeenCalledWith('Match found!');
    consoleSpy.mockRestore();
  });

  // Test incorrect word matching
  test('checks for incorrect match', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    render(<Game words={mockWords} />);
    
    const hungarianWord = screen.getByText('alma');
    const englishWord = screen.getByText('dog');

    // Select non-matching words
    fireEvent.click(hungarianWord);
    fireEvent.click(englishWord);

    // Check if incorrect match is logged
    expect(consoleSpy).toHaveBeenCalledWith('No match');
    consoleSpy.mockRestore();
  });

  // Test word deselection after checking match
  test('deselects words after checking match', async () => {
    render(<Game words={mockWords} />);
    
    const hungarianWord = screen.getByText('alma');
    const englishWord = screen.getByText('apple');

    // Select matching words
    fireEvent.click(hungarianWord);
    fireEvent.click(englishWord);

    // Wait for and check deselection
    await waitFor(() => {
      expect(hungarianWord).not.toHaveClass('selected');
      expect(englishWord).not.toHaveClass('selected');
    });
  });
});
