import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NetworkName } from './NetworkName';

describe("NetworkName component", () => {
  const baseProps = {}
  beforeEach(() =>
    render(
      <NetworkName {...baseProps}/>
    )
  );

  describe("props and state", () => {
    it("should", () => {});
  });

  describe("integration", () => {
    it("should", () => {});
  });
});
