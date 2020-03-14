import { TestBed, getTestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { InitialisingService } from "./initialising.service";

describe("InitialisingService", () => {
  let injector: TestBed;
  let service: InitialisingService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [InitialisingService]
    });
    injector = getTestBed();
    service = TestBed.inject(InitialisingService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  const dummyData = { test: "test" };

  it("getMailsData() should be called once to fetch data", () => {
    const req = httpMock.expectOne("assets/mocks/initialise-mails.json");
    req.flush(dummyData);
    expect(req.request.method).toBe("GET");
    expect(JSON.parse(localStorage.getItem("test"))).toEqual("test");
  });
});
