function handleConverterId(binaryId: Buffer | undefined): string {
  const hex = binaryId?.toString("hex");
  const uuid = `${hex?.slice(0, 8)}-${hex?.slice(8, 4)}-${hex?.slice(
    12,
    4
  )}-${hex?.slice(16, 4)}-${hex?.slice(20)}`;
  return uuid;
}
function handleValidateEmail(email: string) {
  const emailRegex: RegExp =
    /^(?=[a-zA-Z0-9._%+-]{1,256}@)(?!@)(?!.*@.*@)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return emailRegex.test(email);
}
function handleValidateEmailCode(code: string | null) {
  const codeRegex = /^[0-9]{6}$/;

  if (!code) {
    return { isValid: false, message: "O código não pode estar vazio." };
  }

  if (!codeRegex.test(code)) {
    return {
      isValid: false,
      message: "O código deve ter exatamente 6 dígitos numéricos.",
    };
  }

  return { isValid: true, message: "Código válido." };
}
function handleIsNumber(input: string): string {
  return input.replace(/\D/g, "");
}

export {
  handleConverterId,
  handleValidateEmail,
  handleValidateEmailCode,
  handleIsNumber,
};
