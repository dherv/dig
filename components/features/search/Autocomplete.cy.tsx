import * as SWR from "@/services/swr";
import { SWRConfig } from "swr";
import { mockSearch } from "../../../mocks/data/mockSearch";
import { Search } from "./Search";

describe("Autocomplete component", () => {
  beforeEach(() => {
    cy.viewport(1440, 900);
    cy.intercept("http://localhost:8081/api/shows/search*", (req) => {
      if (req.query.title.toString().toLowerCase() === "star wars") {
        req.reply(mockSearch);
      } else {
        req.reply([]);
      }
    }).as("shows");

    cy.intercept("http://localhost:8081/_next/image*", {
      fixture: "show-poster.jpeg",
    });

    cy.mount(
      <SWRConfig
        value={{
          fetcher: SWR.fetcher,
        }}
      >
        <Search></Search>
      </SWRConfig>
    );
  });

  it("should return the list of corresponding movies", () => {
    cy.findByPlaceholderText("search").type("star wars");
    cy.wait("@shows");
    cy.findByText("Star Wars: Andor").should("exist");
  });

  it("should return an empty list when no corresponding match", () => {
    cy.findByPlaceholderText("search").type("unknown movie");
    cy.wait("@shows");
    cy.findByText("unknown movie").should("not.exist");
  });

  // TODO: write mobile test - first try cypress components
  // it.todo("should return the list of corresponding movies - mobile");
  // it.todo("should return an empty list when no corresponding match - mobile");
});
