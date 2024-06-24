import { ping } from 'tcp-ping';

describe('Health', () => {
  test('Reservations', async () => {
    const res = await fetch('http://reservations:3002/health');
    expect(res.ok).toBeTruthy();
  });

  test('Auth', async () => {
    const res = await fetch('http://auth:3001/health');
    expect(res.ok).toBeTruthy();
  });

  test('Payments', (done) => {
    ping({ address: 'payments', port: 4003 }, (err) => {
      if (err) fail();
      else done();
    });
  });
});
