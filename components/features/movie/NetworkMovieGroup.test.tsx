import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NetworkMovieGroup } from './NetworkMovieGroup';

describe("NetworkMovieGroup component", () => {
  const baseProps = {}
  beforeEach(() =>
    render(
      <NetworkMovieGroup {...baseProps}/>
    )
  );

  describe("props and state", () => {
    it("should", () => {});
  });

  describe("integration", () => {
    it("should", () => {});
  });
});
