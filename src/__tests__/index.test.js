const Logger = require("../index");

let mockLog, spyLog;

describe("when testing with logging side-effects", () => {
  beforeEach(() => {
    mockLog = jest.fn();
    spyLog = jest.spyOn(console, "info").mockImplementation(mockLog);
  });
  afterEach(() => {
    spyLog.mockRestore();
  });

  it("should log a simple message", async () => {
    const log = new Logger();
    log.boring = true;
    log.info("Hello World");
    expect(mockLog).toHaveBeenCalledWith("Hello World");
    log.info();
    expect(mockLog).toHaveBeenCalledWith("");
  });

  it("should log a simple message with a prefix", async () => {
    const log = new Logger();
    log.boring = true;
    log.info("Hello World");
    expect(mockLog).toHaveBeenCalledWith("Hello World");
    log.prefix = "==>";
    log.info("Hello World");
    expect(mockLog).toHaveBeenCalledWith("==> Hello World");
  });

  it("should NOT log a simple message", async () => {
    const log = new Logger();
    log.silent = true;
    log.info("Hello World Again");
    expect(mockLog).not.toHaveBeenCalled();
  });

  it("should respect the constructor options (no colors)", async () => {
    const log = new Logger({ boring: true });
    log.info("Hello World");
    expect(mockLog).toHaveBeenCalledWith("Hello World");
    log.info();
    expect(mockLog).toHaveBeenCalledWith("");
  });

  it("should respect the constructor options (silent)", async () => {
    const log = new Logger({ silent: true });
    log.boring = true;
    log.info("Hello World");
    expect(mockLog).not.toHaveBeenCalled();
    log.silent = false;
    log.info("Hello World Again");
    expect(mockLog).toHaveBeenCalledWith("Hello World Again");
  });

  it("should respect the constructor options (prefix)", async () => {
    const log = new Logger({ prefix: "==>" });
    log.boring = true;
    log.info("Hello World");
    expect(mockLog).toHaveBeenCalledWith("==> Hello World");
    log.prefix = false;
    log.info("Hello World");
    expect(mockLog).toHaveBeenCalledWith("Hello World");
  });
});
