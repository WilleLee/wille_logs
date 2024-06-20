export class TestManager {
  private results = new Map<string, "IDLE" | "SUCCESS" | "FAIL">();
  private cases: string[];
  private title: string;

  constructor(cases: string[], title: string) {
    this.cases = cases;
    this.cases.forEach((testCase) => {
      this.results.set(testCase, "IDLE");
    });
    this.title = title;
  }

  private size() {
    return this.results.size;
  }
  public success(testCase: string) {
    this.results.set(testCase, "SUCCESS");
  }
  public fail(testCase: string) {
    this.results.set(testCase, "FAIL");
  }
  logResults() {
    let successCount = 0;
    this.results.forEach((v, k) => {
      console.log(
        `${v === "SUCCESS" ? "✅" : v === "FAIL" ? "❌" : "🛠️"} ${k}`,
      );
      if (v === "SUCCESS") {
        successCount++;
      }
    });
    if (successCount === this.size()) {
      console.log(`🥳 ALL TESTS PASSED ON \<${this.title}\>`);
    }
  }
}
