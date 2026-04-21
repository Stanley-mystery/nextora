import { useState } from 'react';
import { PASSWORD_RULES } from '@/constants/validation';

function usePasswordStrengthValidator() {
  const [passwordRulesMatches, setPasswordRulesMatches] = useState<Record<string, boolean>>({});

  function regexCheck(value: string) {
    const { lengthPattern, uppercasePattern, lowercasePattern, specialCharPattern, numberPattern } = PASSWORD_RULES;

    return {
      lengthCheck: lengthPattern.test(value),
      uppercaseCheck: uppercasePattern.test(value),
      lowercaseCheck: lowercasePattern.test(value),
      specialCharCheck: specialCharPattern.test(value),
      numberCheck: numberPattern.test(value),
    };
  }

  const passwordRulesCheck = (value: string) => {
    setPasswordRulesMatches(regexCheck(value));
  };

  return {
    passwordRulesMatches,
    passwordRulesCheck,
  };
}

export default usePasswordStrengthValidator;
