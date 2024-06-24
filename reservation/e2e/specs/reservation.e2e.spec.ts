describe('Reservations', () => {
  let jwt: string;

  beforeAll(async () => {
    const user = {
      email: 'mmdali@gmaill.com',
      password: '1234Z22z!',
    };

    // Create User
    await fetch('http://auth:3001/users', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: { 'Content-Type': 'application/json' },
    });

    // Get JWT auth
    const response = await fetch('http://auth:3001/auth/login', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: { 'Content-Type': 'application/json' },
    });

    jwt = await response.text();
  });
  test('Create', async () => {
    const response = await fetch('http://reservations:3002/reservations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authentication: jwt },
      body: JSON.stringify({
        startDate: '02-06-2024',
        endDate: '02-06-2024',
        placeId: '12323232',
        invoiceId: '12323232',
        charge: {
          amount: 5,
          card: {
            cvc: '413',
            exp_month: 11,
            exp_year: 2027,
            number: '4242 4242 4242 4242',
          },
        },
      }),
    });

    expect(response.ok).toBeTruthy();
  });
});
