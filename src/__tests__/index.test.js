const Logger = require("../index");

let mockInfo, mockLog, spyDate, spyInfo, spyLocaleTime, spyLog;

describe("when testing with logging side-effects", () => {
  beforeEach(() => {
    mockInfo = jest.fn();
    mockLog = jest.fn();
    spyInfo = jest.spyOn(console, "info").mockImplementation(mockInfo);
    spyLog = jest.spyOn(console, "log").mockImplementation(mockLog);
    spyDate = jest
      .spyOn(Date.prototype, "toDateString")
      .mockImplementation(() => "Sat Oct 31 2020");
    spyLocaleTime = jest
      .spyOn(Date.prototype, "toLocaleTimeString")
      .mockImplementation(() => "5:00:00 PM");
  });
  afterEach(() => {
    spyDate.mockRestore();
    spyInfo.mockRestore();
    spyLocaleTime.mockRestore();
    spyLog.mockRestore();
  });

  it("should log a simple message", async () => {
    const log = new Logger();
    log.boring = true;
    log.info("Hello World");
    expect(mockInfo).toHaveBeenCalledWith("Hello World");
    log.info();
    expect(mockInfo).toHaveBeenCalledWith("");
  });

  it("should log a complex message", async () => {
    const log = new Logger();
    log.boring = true;
    log.log({
      toto: 1,
      titi: { tata: 3 },
    });
    expect(mockLog).toHaveBeenCalledWith(
      "{\n  toto: 1,\n  titi: {\n    tata: 3\n  }\n}"
    );
    log.info();
    expect(mockInfo).toHaveBeenCalledWith("");
  });

  it("should log a simple message with a prefix", async () => {
    const log = new Logger();
    log.boring = true;
    log.info("Hello World");
    expect(mockInfo).toHaveBeenCalledWith("Hello World");
    log.prefix = "==>";
    log.info("Hello World");
    expect(mockInfo).toHaveBeenCalledWith("==> Hello World");
  });

  it("should log a simple message with a timestamp", async () => {
    const log = new Logger();
    log.boring = true;
    log.info("Hello World");
    expect(mockInfo).toHaveBeenCalledWith("Hello World");
    log.timestamp = true;
    log.info("Hello World");
    expect(mockInfo).toHaveBeenCalledWith(
      "[ Sat Oct 31 2020 5:00:00 PM ] Hello World"
    );
  });

  it("should log a simple message with a prefix and a timestamp", async () => {
    const log = new Logger();
    log.boring = true;
    log.info("Hello World");
    expect(mockInfo).toHaveBeenCalledWith("Hello World");
    log.timestamp = true;
    log.prefix = "==>";
    log.info("Hello World");
    expect(mockInfo).toHaveBeenCalledWith(
      "==> [ Sat Oct 31 2020 5:00:00 PM ] Hello World"
    );
  });

  it("should NOT log a simple message", async () => {
    const log = new Logger();
    log.silent = true;
    log.info("Hello World Again");
    expect(mockInfo).not.toHaveBeenCalled();
  });

  it("should respect the constructor options (no colors)", async () => {
    const log = new Logger({ boring: true });
    log.info("Hello World");
    expect(mockInfo).toHaveBeenCalledWith("Hello World");
    log.info();
    expect(mockInfo).toHaveBeenCalledWith("");
  });

  it("should respect the constructor options (silent)", async () => {
    const log = new Logger({ silent: true });
    log.boring = true;
    log.info("Hello World");
    expect(mockInfo).not.toHaveBeenCalled();
    log.silent = false;
    log.info("Hello World Again");
    expect(mockInfo).toHaveBeenCalledWith("Hello World Again");
  });

  it("should respect the constructor options (prefix)", async () => {
    const log = new Logger({ prefix: "==>" });
    log.boring = true;
    log.info("Hello World");
    expect(mockInfo).toHaveBeenCalledWith("==> Hello World");
    log.prefix = false;
    log.info("Hello Hell");
    expect(mockInfo).toHaveBeenCalledWith("Hello Hell");
  });

  it("should NOT respect the constructor options if type is invalid (prefix)", async () => {
    const log = new Logger({ prefix: 43 });
    log.boring = true;
    log.info("Hello World");
    expect(mockInfo).toHaveBeenCalledWith("Hello World");
  });

  it("should respect the constructor options (timestamp)", async () => {
    const log = new Logger({ timestamp: true });
    log.boring = true;
    log.info("Hello World");
    expect(mockInfo).toHaveBeenCalledWith(
      "[ Sat Oct 31 2020 5:00:00 PM ] Hello World"
    );
    log.timestamp = false;
    log.info("Hello Hell");
    expect(mockInfo).toHaveBeenCalledWith("Hello Hell");
  });
});
