import { TestBed } from "@angular/core/testing";

import { SideNavService } from "./side-nav.service";

describe("SideNavService", () => {
  let service: SideNavService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SideNavService);
  });

  it("toggle value is false", () => {
    expect(service.sideNavOpen).toBeFalse();
  });

  it("toggle value is true", () => {
    service.toggleSideNav();
    expect(service.sideNavOpen).toBeTrue();
  });
});
