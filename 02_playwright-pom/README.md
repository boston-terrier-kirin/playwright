# 起動方法

- npx playwright test
- npx playwright test --headed
- npx playwright test --headed --browser=firefox
- npx playwright test --headed --browser=all
- npx playwright test tests/example.spec.ts --headed
- npx playwright test --config=playwright.config.ts
- npx playwright test --config=playwright.config.ts --project=Chromium
- npx playwright test --config=playwright.config.ts --project=Chromium --reporter=list
- npx playwright test --config=playwright.config.ts --project=Chromium --reporter=line
- npx playwright test --config=playwright.config.ts --project=Chromium --reporter=dot
- npx playwright test --config=playwright.config.ts --project=Chromium --reporter=junit
- npx playwright test --config=playwright.config.ts --project=Chromium --reporter=html

# codegen

- npx playwright codegen http://localhost:8090/sharetasks/
