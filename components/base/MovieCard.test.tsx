import { render } from '@testing-library/react';
import { MovieCard } from './MovieCard';

describe("MovieCard component", () => {
  const baseProps = { movie: {} };
  beforeEach(() => render(<MovieCard {...baseProps} />));

  describe("props and state", () => {
    it("should", () => {});
  });

  describe("integration", () => {
    it("should", () => {});
  });
});
