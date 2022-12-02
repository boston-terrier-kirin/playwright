export const attachScreenshot = async (testInfo, name, screenshot) => {
  await testInfo.attach(name, {
    body: screenshot,
    contentType: 'image/png',
  });
};
