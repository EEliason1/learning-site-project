export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
      '^.+\\.ts?$': 'ts-jest',
    },
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
    extensionsToTreatAsEsm: ['.ts'],
  };
  