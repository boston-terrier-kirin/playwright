export const attachScreenshot = async (testInfo, screenshot) => {
  await testInfo.attach('screenshot', {
    body: screenshot,
    contentType: 'image/png',
  });
};
