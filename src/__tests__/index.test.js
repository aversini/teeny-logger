const Logger = require("../index");

let mockInfo, mockLog, spyInfo, spyLog;

describe("when testing with logging side-effects", () => {
  beforeEach(() => {
    mockInfo = jest.fn();
    mockLog = jest.fn();
    spyInfo = jest.spyOn(console, "info").mockImplementation(mockInfo);
    spyLog = jest.spyOn(console, "log").mockImplementation(mockLog);
  });
  afterEach(() => {
    spyInfo.mockRestore();
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
    log.info("Hello World");
    expect(mockInfo).toHaveBeenCalledWith("Hello World");
  });
});
