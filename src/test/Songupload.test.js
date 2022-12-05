import { render, screen } from '@testing-library/react';
import SongUpload from '../pages/SongUpload';

test('render inputfields', () => {
    render(<SongUpload />);
    const title = screen.getByLabelText(/Song Name/i);
    const artist = screen.getByLabelText(/Artist Name/i);
    const file = screen.getByLabelText(/Choose File/i);
    expect(title).toBeInTheDocument();
    expect(artist).toBeInTheDocument();
    expect(file).toBeInTheDocument();
});

test('render upload state', () => {
    render(<SongUpload />);
    const uploadState = screen.getByText(/0% done/i);
    expect(uploadState).toBeInTheDocument();
});

test('render button',() => {
    render(<SongUpload />);
    const button = screen.getByRole('button', { name: /Upload/i });
    expect(button).toBeInTheDocument();
});