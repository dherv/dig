import { render } from '@testing-library/react';
import { MovieGroup } from './MovieGroup';

describe("MovieGroup component", () => {
  const baseProps = { data: [] };
  beforeEach(() => render(<MovieGroup {...baseProps} />));

  describe("props and state", () => {
    it("should", () => {});
  });

  describe("integration", () => {
    it("should", () => {});
  });
});
