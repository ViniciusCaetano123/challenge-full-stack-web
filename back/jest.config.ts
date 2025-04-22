import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // Opcional: configura diretórios de testes
  testMatch: ['**/*.test.ts']
};

export default config;
