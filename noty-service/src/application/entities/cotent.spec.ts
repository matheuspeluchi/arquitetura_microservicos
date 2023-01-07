import { Content } from './content';

describe('Notification content', () => {
  it(' should be able to create a notification content', () => {
    const content = new Content('Uma frase com masi de 5 caracteres');

    expect(content).toBeTruthy();
  });

  it(' should not be able to create a notification content with les than 5 characters', () => {
    expect(() => new Content('test')).toThrow();
  });

  it(' should not be able to create a notification content with more than 240 characters', () => {
    expect(() => new Content('test'.repeat(240))).toThrow();
  });
});
