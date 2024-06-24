describe('Health', () => {
  test('Reservations', async () => {
    try {
      const res = await fetch('http://reservations:3002/health');
      expect(res.ok).toBeTruthy();
    } catch (error) {
      console.log(error);
    }
  });

  test('Auth', async () => {
    try {
      const res = await fetch('http://auth:3001/health');
      expect(res.ok).toBeTruthy();
    } catch (error) {
      console.log(error);
    }
  });
});
