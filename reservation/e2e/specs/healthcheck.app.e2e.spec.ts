describe('Health', () => {
  test('Reservations', async () => {
    try {
      const res = await fetch('http://reservations:3002');
      console.log(res.json(), 'jjjjjjjjjjs');

      expect(res.ok).toBeTruthy();
    } catch (error) {
      console.log(error, 'eeeeeeeee');
    }
  });
});
