import { TestBed, getTestBed } from "@angular/core/testing";

import { UsersService } from "./users.service";
import {
  HttpTestingController,
  HttpClientTestingModule
} from "@angular/common/http/testing";

describe("UsersService", () => {
  let injector: TestBed;
  let service: UsersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsersService]
    });
    service = TestBed.inject(UsersService);
    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("fetchUsers() should be called once to fetch data", () => {
    const req = httpMock.expectOne("assets/mocks/users.json");
    expect(req.request.method).toBe("GET");
  });
});
