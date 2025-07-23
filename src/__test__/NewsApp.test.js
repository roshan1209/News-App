import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';
import NewsList from '../components/NewsList';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import HomePage from '../pages/index';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

beforeEach(() => {
    fetch.resetMocks();
    fetchMock.resetMocks();
    useRouter.mockReturnValue({ push: jest.fn() });
});

describe('News App Components', () => {
    test('renders headlines on homepage', async () => {
        fetchMock.mockResponseOnce(
            JSON.stringify({
                articles: [
                    { title: 'Headline 1', url: 'https://example.com/1' },
                    { title: 'Headline 2', url: 'https://example.com/2' },
                ],
            })
        );

        render(<HomePage />);

        await waitFor(() => {
            expect(screen.getByText('Headline 1')).toBeInTheDocument();
            expect(screen.getByText('Headline 2')).toBeInTheDocument();
        });
    });

    test('search redirects on submit', () => {
        const push = jest.fn();
        useRouter.mockReturnValue({ push });

        render(<SearchBar />);
        fireEvent.change(screen.getByPlaceholderText('Search news...'), {
            target: { value: 'technology' },
        });
        fireEvent.submit(screen.getByRole('textbox'));

        expect(push).toHaveBeenCalledWith('/search?q=technology');
    });

    test('category navigation renders and selects category', () => {
        const onCategoryChange = jest.fn();
        render(<CategoryFilter onCategoryChange={onCategoryChange} />);

        const businessBtn = screen.getByText('Business');
        fireEvent.click(businessBtn);

        expect(onCategoryChange).toHaveBeenCalledWith('business');
    });

    test('shows loading and error states', async () => {
        fetchMock.mockRejectOnce(new Error('Failed to fetch'));

        render(<NewsList endpoint="/api/news/headlines" />);

        expect(screen.getByText(/loading/i)).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText(/failed to fetch/i)).toBeInTheDocument();
        });
    });

    test('infinite scroll pagination loads more articles', async () => {
        fetchMock.mockResponses(
            [
                JSON.stringify({
                    articles: Array.from({ length: 10 }, (_, i) => ({
                        title: `Article ${i + 1}`,
                        url: `https://example.com/${i + 1}`,
                    })),
                }),
                { status: 200 },
            ],
            [
                JSON.stringify({
                    articles: Array.from({ length: 5 }, (_, i) => ({
                        title: `Article ${i + 11}`,
                        url: `https://example.com/${i + 11}`,
                    })),
                }),
                { status: 200 },
            ]
        );

        render(<NewsList endpoint="/api/news/headlines" />);

        await waitFor(() => {
            expect(screen.getByText('Article 1')).toBeInTheDocument();
        });

        // Simulate scroll
        fireEvent.scroll(window, { target: { scrollY: 1000 } });

        await waitFor(() => {
            expect(screen.getByText('Article 15')).toBeInTheDocument();
        });
    });
});
