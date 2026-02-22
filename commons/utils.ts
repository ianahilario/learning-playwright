export function getEnv(variableName: string) {
  const value = process.env[variableName];
  if (!value) {
    throw new Error(
      `${variableName} is not defined in the environment variables.`
    );
  }

  if (value.trim() === '') {
    throw new Error(`${variableName} environment variable cannot be empty.`);
  }
  return value;
}
